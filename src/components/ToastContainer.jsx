import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toastAlerts, removeToast } = useApp();

  if (!toastAlerts.length) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {toastAlerts.map(toast => {
        const isAlert = toast.type === 'alert';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 border ${
              isAlert
                ? 'bg-rose-950/90 text-rose-100 border-rose-500/50 alert-glow'
                : isSuccess
                ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/50 shadow-emerald-900/30'
                : 'bg-slate-900/90 text-slate-100 border-slate-700/50'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isAlert && <AlertTriangle className="w-6 h-6 text-rose-400 animate-bounce" />}
              {isSuccess && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
              {!isAlert && !isSuccess && <Bell className="w-6 h-6 text-cyan-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm tracking-wide mb-1 flex items-center gap-2">
                {toast.title}
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 transition-colors rounded-lg hover:bg-white/10 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
