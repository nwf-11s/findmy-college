import React from 'react';
import { useApp } from '../context/AppContext';
import ReportCard from './ReportCard';
import { sounds } from '../utils/audio';
import { Shield, Bell, AlertCircle, CheckCircle2, Volume2, Filter, Radio } from 'lucide-react';

export default function SecurityDashboard() {
  const { reports, selectedRoom, setSelectedRoom } = useApp();

  const lostReports = reports.filter(r => r.type === 'lost');
  const searchingReports = lostReports.filter(r => r.status === 'searching');
  const foundReports = reports.filter(r => r.status === 'found' || r.status === 'delivered');

  const filteredReports = lostReports.filter(r => {
    if (selectedRoom !== 'ALL' && !r.room.includes(selectedRoom)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Security Alert Header Banner */}
      <div className="glass-panel-accent rounded-3xl p-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">لوحة تحكم وتنبيهات الأمن والسلامة</h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  مباشر - كادر الكلية
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                استقبال تنبيهات المفاتيح المفقودة من قاعات الكلية (مثل قاعة 202) والإبلاغ فوراً بمكان العثور عليها.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => sounds.playAlertSound()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 font-bold text-xs shadow-lg transition-all"
            >
              <Volume2 className="w-4 h-4 text-rose-400 animate-pulse" />
              اختبار صافرة التنبيه الصوتية
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold">البلاغات النشطة</p>
            <p className="text-2xl font-black text-rose-400 mt-1 flex items-center gap-2">
              {searchingReports.length}
              <span className="text-xs font-normal text-rose-400/70">بلاغ ينتظر البحث</span>
            </p>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold">تم تحديد موقعها</p>
            <p className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-2">
              {foundReports.length}
              <span className="text-xs font-normal text-emerald-400/70">مفتاح عُثر عليه</span>
            </p>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold">أكثر القاعات بلاغات</p>
            <p className="text-sm font-black text-cyan-300 mt-2">
              ⭐ قاعة 202 (مبنى أ)
            </p>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold">مكتب الاستلام</p>
            <p className="text-xs font-bold text-slate-200 mt-2">
              غرفة الأمن 104 - المبنى الرئيسي
            </p>
          </div>
        </div>
      </div>

      {/* Room Filter Pills */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-extrabold text-white">تصفية البلاغات حسب القاعة:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {['ALL', '202', '201', '101', 'المكتبة'].map(roomCode => (
            <button
              key={roomCode}
              onClick={() => setSelectedRoom(roomCode)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedRoom === roomCode
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {roomCode === 'ALL' ? 'جميع القاعات' : `قاعة ${roomCode}`}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReports.length > 0 ? (
          filteredReports.map(rep => (
            <ReportCard key={rep.id} report={rep} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 glass-panel rounded-3xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">لا توجد بلاغات مفقودات معلقة في هذه القاعة!</h3>
            <p className="text-xs text-slate-400 mt-1">جميع المفاتيح تم تسليمها أو لا يوجد بلاغ حالياً.</p>
          </div>
        )}
      </div>

    </div>
  );
}
