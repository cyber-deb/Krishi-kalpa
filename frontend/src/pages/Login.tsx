import React from 'react';
import { Sprout } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg max-w-md w-full text-center">
        <div className="w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sprout className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">{APP_NAME}</h2>
        <p className="text-xs text-slate-500 mb-6 italic">"{APP_TAGLINE}"</p>

        <form className="space-y-4 text-left text-xs" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
            <input type="text" defaultValue="+91 98765 43210" className="w-full p-3 rounded-lg border border-slate-300" />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <input type="password" defaultValue="••••••••" className="w-full p-3 rounded-lg border border-slate-300" />
          </div>
          <button className="w-full bg-emerald-700 text-white font-bold p-3 rounded-lg hover:bg-emerald-800 transition-colors text-sm">
            Sign In to Farm Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
