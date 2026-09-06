import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Map,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Crosshair,
  ZoomIn,
  ZoomOut,
  Satellite,
  Compass,
  Sprout,
  Droplets,
  AlertTriangle,
  Info,
  ShieldCheck
} from 'lucide-react';
import L from 'leaflet';

// Define Farm Zone GIS Boundaries in fertile agricultural farmland (Wardha Agro Basin: 20.6717° N, 78.5380° E)
const FARM_CENTER: [number, number] = [20.6717, 78.5380];

interface ZoneCircleGeo {
  center: [number, number];
  radius: number; // radius in meters
}

const ZONE_CIRCLES: Record<string, ZoneCircleGeo> = {
  'zone-a-north': {
    center: [20.6730, 78.5380],
    radius: 70 // ~1.0 Acre circular pivot zone
  },
  'zone-b-central': {
    center: [20.6717, 78.5380],
    radius: 64 // ~0.8 Acre central crop circle
  },
  'zone-c-south': {
    center: [20.6704, 78.5380],
    radius: 56 // ~0.6 Acre southern drainage circle
  }
};

export const FarmMapPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { farmZones, farmState, executeAdvisorAction, actionToast, dismissActionToast } = useFarmState();
  const [selectedZoneId, setSelectedZoneId] = useState<string>(farmZones[0]?.zone_id || 'zone-a-north');
  const [mapLayer, setMapLayer] = useState<'google_satellite' | 'esri' | 'streets' | 'ndvi' | 'moisture'>('google_satellite');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circleLayersRef = useRef<Record<string, L.Circle>>({});
  const markerLayersRef = useRef<Record<string, L.Marker>>({});
  const cornerMarkersRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const activeZone = farmZones.find((z) => z.zone_id === selectedZoneId) || farmZones[0];

  const getZoneColors = (status: string, isSelected: boolean) => {
    let color = '#10b981'; // Emerald Healthy
    let fillColor = '#10b981';

    switch (status) {
      case 'Water Stress':
        color = '#ef4444';
        fillColor = '#ef4444';
        break;
      case 'Nutrient Stress':
        color = '#f59e0b';
        fillColor = '#f59e0b';
        break;
      case 'Waterlogging Hazard':
        color = '#3b82f6';
        fillColor = '#3b82f6';
        break;
      case 'Degradation Alert':
        color = '#dc2626';
        fillColor = '#dc2626';
        break;
      default:
        color = '#10b981';
        fillColor = '#10b981';
    }

    return {
      color: isSelected ? '#38bdf8' : color,
      fillColor: fillColor,
      fillOpacity: isSelected ? 0.58 : 0.32,
      weight: isSelected ? 4 : 2.5,
      dashArray: isSelected ? undefined : '5, 5'
    };
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: FARM_CENTER,
        zoom: 17,
        minZoom: 14,
        maxZoom: 20,
        zoomControl: false,
        attributionControl: false
      });

      // Default: Google Satellite Hybrid Tiles (high-resolution agricultural fields)
      const googleTile = L.tileLayer(
        'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['0', '1', '2', '3']
        }
      );
      googleTile.addTo(map);
      tileLayerRef.current = googleTile;

      // Layer group for corner pins
      const corners = L.layerGroup().addTo(map);
      cornerMarkersRef.current = corners;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when layer switcher changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    let options: L.TileLayerOptions = { maxZoom: 20 };

    if (mapLayer === 'google_satellite') {
      url = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    } else if (mapLayer === 'esri') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      options = { maxZoom: 19, subdomains: ['server', 'services'] };
    } else if (mapLayer === 'streets') {
      url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      options = { maxZoom: 19, subdomains: 'abcd' };
    } else if (mapLayer === 'ndvi' || mapLayer === 'moisture') {
      url = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    }

    const newTile = L.tileLayer(url, options);
    newTile.addTo(map);
    tileLayerRef.current = newTile;
  }, [mapLayer]);

  // Render / Update Circular Zones on Map with Interactive Highlighting
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (cornerMarkersRef.current) {
      cornerMarkersRef.current.clearLayers();
    }

    farmZones.forEach((zone) => {
      const geo = ZONE_CIRCLES[zone.zone_id];
      if (!geo) return;

      const isSelected = zone.zone_id === selectedZoneId;
      const style = getZoneColors(zone.status, isSelected);

      // 1. Update or create Circle
      let circle = circleLayersRef.current[zone.zone_id];
      if (!circle) {
        circle = L.circle(geo.center, {
          radius: geo.radius,
          color: style.color,
          fillColor: style.fillColor,
          fillOpacity: style.fillOpacity,
          weight: style.weight,
          dashArray: style.dashArray,
          className: isSelected ? 'selected-zone-circle' : ''
        });

        circle.on('click', () => {
          setSelectedZoneId(zone.zone_id);
        });

        circle.addTo(map);
        circleLayersRef.current[zone.zone_id] = circle;
      } else {
        circle.setRadius(geo.radius);
        circle.setLatLng(geo.center);
        circle.setStyle({
          color: style.color,
          fillColor: style.fillColor,
          fillOpacity: style.fillOpacity,
          weight: style.weight,
          dashArray: style.dashArray,
          className: isSelected ? 'selected-zone-circle' : ''
        });
      }

      // 2. Add Perimeter GPS pins and Precision Concentric Ring for selected zone
      if (isSelected && cornerMarkersRef.current) {
        // Inner concentric dashed radar circle for precision center-pivot look
        const innerRing = L.circle(geo.center, {
          radius: geo.radius * 0.45,
          color: '#38bdf8',
          fillColor: 'transparent',
          weight: 1.5,
          dashArray: '3, 4'
        });
        innerRing.addTo(cornerMarkersRef.current);

        // 4 Cardinal Perimeter Pins (North, South, East, West)
        const latOffset = (geo.radius / 111000);
        const lngOffset = (geo.radius / 103800);
        const perimeterPoints: [number, number][] = [
          [geo.center[0] + latOffset, geo.center[1]], // North
          [geo.center[0] - latOffset, geo.center[1]], // South
          [geo.center[0], geo.center[1] + lngOffset], // East
          [geo.center[0], geo.center[1] - lngOffset]  // West
        ];

        perimeterPoints.forEach((point) => {
          const pinIcon = L.divIcon({
            className: 'perimeter-pin',
            html: '<div style="width: 8px; height: 8px; background: #38bdf8; border: 2px solid #ffffff; border-radius: 9999px; box-shadow: 0 0 6px #0284c7;"></div>',
            iconSize: [8, 8],
            iconAnchor: [4, 4]
          });
          L.marker(point, { icon: pinIcon }).addTo(cornerMarkersRef.current!);
        });
      }

      // 3. Custom Centroid Pin / Badge Marker
      let marker = markerLayersRef.current[zone.zone_id];
      const badgeHtml = `
        <div style="cursor: pointer; transform: translate(-50%, -50%);" class="group flex flex-col items-center">
          <div style="
            background: ${isSelected ? '#0284c7' : 'rgba(28, 25, 23, 0.92)'};
            color: #ffffff;
            border: 2px solid ${isSelected ? '#38bdf8' : style.fillColor};
            border-radius: 9999px;
            padding: 3px 10px;
            font-size: 11px;
            font-weight: 800;
            box-shadow: 0 4px 14px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
          ">
            <span style="width: 9px; height: 9px; border-radius: 9999px; background: ${style.fillColor}; display: inline-block; box-shadow: 0 0 5px ${style.fillColor};"></span>
            <span>${tText(zone.zone_name.split(' (')[0])}</span>
            <span style="color: ${isSelected ? '#bae6fd' : '#a8a29e'}; font-size: 10px;">${zone.soil_moisture}%</span>
            ${isSelected ? '<span style="color:#7dd3fc; font-weight:bold;">✓</span>' : ''}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-farm-pin',
        html: badgeHtml,
        iconSize: [130, 32],
        iconAnchor: [65, 16]
      });

      if (!marker) {
        marker = L.marker(geo.center, { icon: customIcon });
        marker.on('click', () => {
          setSelectedZoneId(zone.zone_id);
        });
        marker.addTo(map);
        markerLayersRef.current[zone.zone_id] = marker;
      } else {
        marker.setIcon(customIcon);
      }
    });

    // Pan smoothly to selected zone center
    const activeGeo = ZONE_CIRCLES[selectedZoneId];
    if (activeGeo) {
      map.panTo(activeGeo.center, { animate: true, duration: 0.6 });
    }
  }, [farmZones, selectedZoneId, tText]);

  // Recenter Map Handler
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(FARM_CENTER, 17, { animate: true });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Toast Feedback */}
      {actionToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-400 flex items-center space-x-3 max-w-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-200" />
          <div className="text-xs sm:text-sm font-bold">{tText(actionToast)}</div>
          <button onClick={dismissActionToast} className="text-xs text-emerald-200 hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('map.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('map.subtitle')} • {farmState.config.farm_name} (20.6717° N, 78.5380° E • Wardha Agro Basin)
        </p>
      </div>

      {/* Interactive Zone Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {farmZones.map((zone) => {
          const isSelected = zone.zone_id === activeZone.zone_id;
          return (
            <button
              key={zone.zone_id}
              onClick={() => setSelectedZoneId(zone.zone_id)}
              className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                isSelected
                  ? 'bg-agri-50 border-agri-600 ring-2 ring-agri-500/20 shadow-sm'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-stone-900 font-serif">
                    {tText(zone.zone_name)}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-agri-600" />}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  {tText("Moisture")}: <span className="font-semibold text-stone-800">{zone.soil_moisture}%</span> • N: <span className="font-semibold text-stone-800">{zone.nitrogen} mg/kg</span>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  zone.status === 'Healthy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {tText(zone.status)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Realistic Satellite Farm Map View */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center space-x-2">
              <Map className="w-5 h-5 text-agri-600" />
              <h3 className="text-base font-bold text-stone-900">{tText("Spatial Farm Health Map")}</h3>
            </div>

            {/* Layer Switcher */}
            <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setMapLayer('google_satellite')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                  mapLayer === 'google_satellite' ? 'bg-stone-900 text-white shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Satellite className="w-3.5 h-3.5 text-sky-400" />
                <span>{tText("Google Satellite")}</span>
              </button>
              <button
                onClick={() => setMapLayer('streets')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                  mapLayer === 'streets' ? 'bg-stone-900 text-white shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>{tText("Map / Terrain")}</span>
              </button>
              <button
                onClick={() => setMapLayer('ndvi')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                  mapLayer === 'ndvi' ? 'bg-stone-900 text-white shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <span>{tText("NDVI Canopy")}</span>
              </button>
            </div>
          </div>

          {/* Leaflet Satellite Container */}
          <div className="relative w-full h-84 sm:h-96 md:h-[430px] rounded-2xl overflow-hidden border border-stone-800 shadow-inner bg-stone-950">
            {/* Map Container Element */}
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* NDVI / Moisture Overlay Graphic when mode selected */}
            {mapLayer === 'ndvi' && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-emerald-600/30 via-lime-500/20 to-transparent mix-blend-color z-10 animate-pulse" />
            )}
            {mapLayer === 'moisture' && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-600/25 via-cyan-500/15 to-transparent mix-blend-color z-10 animate-pulse" />
            )}

            {/* Google Maps Style UI Controls */}
            <div className="absolute top-3 right-3 z-20 flex flex-col space-y-1.5">
              <button
                onClick={handleZoomIn}
                className="w-9 h-9 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-white flex items-center justify-center shadow-lg border border-stone-700 transition"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-9 h-9 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-white flex items-center justify-center shadow-lg border border-stone-700 transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleRecenter}
                className="w-9 h-9 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-sky-400 flex items-center justify-center shadow-lg border border-stone-700 transition"
                title="Recenter Farm"
              >
                <Crosshair className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom GPS Coordinates & High-Res Satellite Badge */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-2 bg-stone-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl border border-stone-700 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono text-stone-300">20.6717° N, 78.5380° E</span>
              <span className="text-stone-500">•</span>
              <span className="text-emerald-400 font-bold">{tText("High-Res Farmland Satellite")}</span>
            </div>

            {/* Top-Left Selected Zone Quick Tag */}
            <div className="absolute top-3 left-3 z-20 bg-stone-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl border border-sky-500/40 text-xs font-bold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{tText(activeZone.zone_name.split(' (')[0])}:</span>
              <span className="text-sky-300 font-normal">{activeZone.soil_moisture}% {tText("Moisture")}</span>
            </div>
          </div>

          {/* Map Color Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-stone-100 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center text-stone-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5 shadow-sm"></span> {tText("Good")}
              </span>
              <span className="flex items-center text-stone-600">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1.5 shadow-sm"></span> {tText("Water Stress")}
              </span>
              <span className="flex items-center text-stone-600">
                <span className="w-3 h-3 rounded-full bg-amber-500 mr-1.5 shadow-sm"></span> {tText("Nutrient Stress")}
              </span>
              <span className="flex items-center text-stone-600">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-1.5 shadow-sm"></span> {tText("Waterlogging Hazard")}
              </span>
            </div>
            <span className="text-stone-400 text-[11px] font-medium hidden sm:inline">
              {t('map.select_zone_hint')}
            </span>
          </div>
        </div>

        {/* Selected Zone Real-time Diagnostics Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-agri-700 bg-agri-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                {tText(activeZone.crop)}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  activeZone.status === 'Healthy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {tText(activeZone.status)}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 font-serif mb-1">
              {tText(activeZone.zone_name)}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {tText("Area")}: {activeZone.area_acres} {t('common.acres')} • GPS: 20.6717° N, 78.5380° E
            </p>

            {/* Diagnostics Metrics */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">{tText("Current Moisture")}</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.soil_moisture}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">{tText("Available Nitrogen (N)")}</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.nitrogen} mg/kg</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">{tText("Soil pH Reaction")}</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.ph} pH</span>
              </div>
            </div>

            {/* Identified Problem & Action */}
            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 mb-4 text-xs">
              <span className="font-bold text-amber-900 block mb-1">{tText("Identified Issue:")}</span>
              <p className="text-amber-800">{tText(activeZone.primary_issue)}</p>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 text-xs">
              <span className="font-bold text-emerald-900 block mb-1">{tText("Recommended Action:")}</span>
              <p className="text-emerald-800">{tText(activeZone.recommended_action)}</p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-400">{tText("Degradation Risk")}: {tText(activeZone.degradation_risk + ' Risk')}</span>
            {activeZone.status !== 'Healthy' && (
              <button
                onClick={() => executeAdvisorAction('zone_remediate', 'zone_remediate')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold transition shadow-sm"
              >
                <span>{tText("Remediate Zone")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
