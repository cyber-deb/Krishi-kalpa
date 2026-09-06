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
  Maximize2,
  Satellite,
  Compass,
  Sprout,
  Droplets,
  AlertTriangle,
  Info
} from 'lucide-react';
import L from 'leaflet';

// Define Farm Zone GIS Boundaries centered at Wardha (20.7453° N, 78.6022° E)
const FARM_CENTER: [number, number] = [20.7453, 78.6022];

const ZONE_BOUNDS: Record<string, { bounds: [number, number][]; center: [number, number] }> = {
  'zone-a-north': {
    bounds: [
      [20.7472, 78.6002],
      [20.7472, 78.6042],
      [20.7457, 78.6042],
      [20.7457, 78.6002]
    ],
    center: [20.74645, 78.6022]
  },
  'zone-b-central': {
    bounds: [
      [20.7455, 78.6002],
      [20.7455, 78.6042],
      [20.7443, 78.6042],
      [20.7443, 78.6002]
    ],
    center: [20.7449, 78.6022]
  },
  'zone-c-south': {
    bounds: [
      [20.7441, 78.6002],
      [20.7441, 78.6042],
      [20.7431, 78.6042],
      [20.7431, 78.6002]
    ],
    center: [20.7436, 78.6022]
  }
};

export const FarmMapPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { farmZones, farmState, executeAdvisorAction, actionToast, dismissActionToast } = useFarmState();
  const [selectedZoneId, setSelectedZoneId] = useState<string>(farmZones[0]?.zone_id || 'zone-a-north');
  const [mapLayer, setMapLayer] = useState<'satellite' | 'streets' | 'ndvi' | 'moisture'>('satellite');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<Record<string, L.Polygon>>({});
  const markerLayersRef = useRef<Record<string, L.Marker>>({});
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
      fillOpacity: isSelected ? 0.55 : 0.28,
      weight: isSelected ? 4 : 2,
      dashArray: isSelected ? undefined : '4, 4'
    };
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: FARM_CENTER,
        zoom: 16.5,
        minZoom: 14,
        maxZoom: 19,
        zoomControl: false,
        attributionControl: false
      });

      // Default Esri High-Resolution World Imagery (Google Maps / Satellite style)
      const satelliteTile = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          subdomains: ['server', 'services']
        }
      );
      satelliteTile.addTo(map);
      tileLayerRef.current = satelliteTile;

      mapInstanceRef.current = map;
    }

    return () => {
      // clean up on unmount
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

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let options: L.TileLayerOptions = { maxZoom: 19 };

    if (mapLayer === 'streets') {
      url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      options = { maxZoom: 19, subdomains: 'abcd' };
    } else if (mapLayer === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    } else if (mapLayer === 'ndvi') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    } else if (mapLayer === 'moisture') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }

    const newTile = L.tileLayer(url, options);
    newTile.addTo(map);
    tileLayerRef.current = newTile;
  }, [mapLayer]);

  // Render / Update Polygon Zones on Map with Interactive Highlighting
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    farmZones.forEach((zone) => {
      const geo = ZONE_BOUNDS[zone.zone_id];
      if (!geo) return;

      const isSelected = zone.zone_id === selectedZoneId;
      const style = getZoneColors(zone.status, isSelected);

      // 1. Update or create Polygon
      let poly = polygonLayersRef.current[zone.zone_id];
      if (!poly) {
        poly = L.polygon(geo.bounds, {
          color: style.color,
          fillColor: style.fillColor,
          fillOpacity: style.fillOpacity,
          weight: style.weight,
          dashArray: style.dashArray,
          className: isSelected ? 'selected-zone-polygon' : ''
        });

        poly.on('click', () => {
          setSelectedZoneId(zone.zone_id);
        });

        poly.addTo(map);
        polygonLayersRef.current[zone.zone_id] = poly;
      } else {
        poly.setStyle({
          color: style.color,
          fillColor: style.fillColor,
          fillOpacity: style.fillOpacity,
          weight: style.weight,
          dashArray: style.dashArray
        });
      }

      // 2. Custom Centroid Pin / Badge Marker
      let marker = markerLayersRef.current[zone.zone_id];
      const badgeHtml = `
        <div style="cursor: pointer; transform: translate(-50%, -50%);" class="group flex flex-col items-center">
          <div style="
            background: ${isSelected ? '#0284c7' : 'rgba(28, 25, 23, 0.88)'};
            color: #ffffff;
            border: 2px solid ${isSelected ? '#38bdf8' : style.fillColor};
            border-radius: 9999px;
            padding: 3px 9px;
            font-size: 11px;
            font-weight: 800;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            gap: 5px;
            white-space: nowrap;
          ">
            <span style="width: 8px; height: 8px; border-radius: 9999px; background: ${style.fillColor}; display: inline-block;"></span>
            <span>${tText(zone.zone_name.split(' (')[0])}</span>
            <span style="opacity: 0.85; font-size: 10px;">${zone.soil_moisture}%</span>
            ${isSelected ? '<span style="color:#7dd3fc;">✓</span>' : ''}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-farm-pin',
        html: badgeHtml,
        iconSize: [120, 30],
        iconAnchor: [60, 15]
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
    const activeGeo = ZONE_BOUNDS[selectedZoneId];
    if (activeGeo) {
      map.panTo(activeGeo.center, { animate: true, duration: 0.6 });
    }
  }, [farmZones, selectedZoneId, tText]);

  // Recenter Map Handler
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(FARM_CENTER, 16.5, { animate: true });
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
          {t('map.subtitle')} • {farmState.config.farm_name} ({farmState.config.location})
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
                onClick={() => setMapLayer('satellite')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                  mapLayer === 'satellite' ? 'bg-stone-900 text-white shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Satellite className="w-3.5 h-3.5 text-sky-400" />
                <span>{tText("Satellite")}</span>
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
          <div className="relative w-full h-84 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden border border-stone-800 shadow-inner bg-stone-950">
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
            <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-2 bg-stone-900/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl border border-stone-700 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono text-stone-300">20.7453° N, 78.6022° E</span>
              <span className="text-stone-500">•</span>
              <span className="text-emerald-400 font-bold">{tText("High-Res Satellite")}</span>
            </div>

            {/* Top-Left Selected Zone Quick Tag */}
            <div className="absolute top-3 left-3 z-20 bg-stone-900/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl border border-sky-500/40 text-xs font-bold flex items-center space-x-2">
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
              {tText("Area")}: {activeZone.area_acres} {t('common.acres')} • GPS: 20.7453° N, 78.6022° E
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
