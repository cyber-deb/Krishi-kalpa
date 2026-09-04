import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Farm Profile & IoT Node Settings</h2>
        <p className="text-xs text-slate-500">Configure device credentials and laboratory calibration offsets</p>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Farm Name</label>
          <input type="text" defaultValue="Green Meadows Farm" className="w-full p-2.5 rounded-lg border border-slate-300" />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Total Acreage</label>
          <input type="number" defaultValue={2.4} className="w-full p-2.5 rounded-lg border border-slate-300" />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">ESP32 Device Identifier</label>
          <input type="text" defaultValue="ESP32-FARM-001" className="w-full p-2.5 rounded-lg border border-slate-300" />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Lab Soil Test Offset (Calibration)</label>
          <p className="text-slate-500 mb-2">Adjust raw IoT probe readings against accredited laboratory soil health cards.</p>
          <div className="grid grid-cols-3 gap-2">
            <input type="text" defaultValue="pH Offset: 0.0" className="p-2 rounded border border-slate-300" />
            <input type="text" defaultValue="N Offset: +2.0" className="p-2 rounded border border-slate-300" />
            <input type="text" defaultValue="P Offset: -1.5" className="p-2 rounded border border-slate-300" />
          </div>
        </div>

        <button className="bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};
