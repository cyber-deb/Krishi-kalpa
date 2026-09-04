import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = "Loading agronomic telemetry..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
