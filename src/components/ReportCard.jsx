import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Clock,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Navigation,
  Sparkles
} from 'lucide-react';

export default function ReportCard({ report }) {
  const { setChatReport, currentUser, resolveReportLocation, setSelectedReportDetail } = useApp();

  const isLost = report.type === 'lost';
  const isRoom202 = report.room && report.room.includes('202');

  const getStatusBadge = () => {
    switch (report.status) {
      case 'searching':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
            <AlertCircle className="w-3.5 h-3.5" />
            جاري البحث
          </span>
        );
      case 'found':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            تم العثور عليه!
          </span>
        );
      case 'delivered':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/10 text-blue-300 border border-blue-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            تم التسليم للمالك
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between ${
        isRoom202 ? 'ring-1 ring-cyan-400/30 bg-slate-900/90' : 'border-slate-800'
      }`}
    >
      <div>
        {/* Optional Image */}
        {report.imageUrl && (
          <div className="relative h-44 w-full bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setSelectedReportDetail(report)}>
            <img
              src={report.imageUrl}
              alt={report.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black shadow-md ${
                report.type === 'lost' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {report.type === 'lost' ? '🚨 مفقود' : '✨ معثور عليه'}
              </span>
              <span className="bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[10px] px-2 py-0.5 rounded-lg font-bold">
                {report.categoryName || 'غرض'}
              </span>
            </div>

            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-black text-white bg-slate-950/90 px-2.5 py-1 rounded-xl border border-slate-700/60 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{report.room}</span>
              {isRoom202 && <span className="text-cyan-400">⭐</span>}
            </div>
          </div>
        )}

        {/* Header Bar */}
        <div className="p-4 border-b border-slate-800/80 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                {report.id}
              </span>
              {isRoom202 && (
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  قاعة 202
                </span>
              )}
            </div>
            <h3 
              onClick={() => setSelectedReportDetail(report)}
              className="font-extrabold text-base text-white mt-0.5 leading-snug cursor-pointer hover:text-cyan-400 transition-colors"
            >
              {report.title}
            </h3>
          </div>
          <div>{getStatusBadge()}</div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-3">
          
          {/* Location details */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-cyan-400">🏛️</span>
              <span className="font-semibold text-slate-300 truncate">{report.building}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-cyan-400">🚪</span>
              <span className="font-bold text-white">{report.room} ({report.floor || 'الدور الأول'})</span>
            </div>
            {report.specificLocation && (
              <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-1 mt-1 leading-relaxed">
                <strong className="text-cyan-300">المكان الدقيق: </strong>
                {report.specificLocation}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {report.description}
          </p>

          {/* Key Details */}
          {report.keyDetails && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] font-medium">علامات مميزة:</span>
              <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded-lg border border-slate-700/60 font-semibold text-[11px]">
                🏷️ {report.keyDetails}
              </span>
            </div>
          )}

          {/* Found Location Banner */}
          {report.foundLocation && (
            <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/40 text-xs">
              <p className="text-emerald-300 font-black text-[11px] flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" /> أين تم العثور عليه؟
              </p>
              <p className="text-white font-bold mt-0.5 leading-relaxed">
                {report.foundLocation}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="p-3.5 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 truncate">
          <User className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-medium text-[11px] truncate">{report.reporterName}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {currentUser && (currentUser.role === 'security' || report.studentId === currentUser.studentId) && report.status !== 'delivered' && (
            <button
              onClick={() => {
                const loc = prompt('أين تم العثور على الغرض أو تسليمه؟ (مثال: قاعة 202 - مكتب الأمن 104)');
                if (loc) resolveReportLocation(report.id, report.status === 'searching' ? 'found' : 'delivered', loc);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all"
            >
              {report.status === 'searching' ? 'تسجيل العثور' : 'تسليم'}
            </button>
          )}

          <button
            onClick={() => setChatReport(report)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>تواصل</span>
            {report.messages?.length > 0 && (
              <span className="bg-cyan-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black mr-0.5">
                {report.messages.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
