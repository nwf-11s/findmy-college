import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Key, Shield, Sparkles, Navigation, Layers, Info } from 'lucide-react';

export default function CampusMap() {
  const { reports, setIsLostModalOpen, setChatReport } = useApp();
  const [selectedFloor, setSelectedFloor] = useState('floor2');

  const room202Report = reports.find(r => r.room && r.room.includes('202'));
  const lostCountIn202 = reports.filter(r => r.room && r.room.includes('202') && r.status === 'searching').length;

  return (
    <div className="space-y-6">
      
      {/* Map Header */}
      <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
                خريطة القاعات التفاعلية 🗺️
              </span>
              <h2 className="text-xl font-extrabold text-white">خريطة قاعات الكلية ومواقع المفقودات</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              تحديد القاعات المسجل بها بلاغات فقدان (مثل قاعة 202) والتنقل بين الأدوار.
            </p>
          </div>

          {/* Floor selector */}
          <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 gap-1">
            <button
              onClick={() => setSelectedFloor('floor1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFloor === 'floor1' ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              الدور الأول (قاعة 101)
            </button>
            <button
              onClick={() => setSelectedFloor('floor2')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                selectedFloor === 'floor2' ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              الدور الثاني (قاعة 202)
              {lostCountIn202 > 0 && (
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
              )}
            </button>
            <button
              onClick={() => setSelectedFloor('services')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFloor === 'services' ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              المبنى المركزي والمكتبة
            </button>
          </div>
        </div>
      </div>

      {/* Visual Floor Plan Map Canvas */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 relative min-h-[480px] bg-slate-950/70 overflow-hidden flex flex-col justify-between">
        
        {/* Map Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

        {/* Floor 2 Layout */}
        {selectedFloor === 'floor2' && (
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-cyan-400 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                مخطط الدور الثاني - مبنى أ (الهندسة والحاسبات)
              </h3>
              <span className="text-xs text-slate-400">انقر على القاعة للاطلاع على البلاغ أو تقديمه</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* ROOM 202 CARD (FEATURED!) */}
              <div
                onClick={() => room202Report && setChatReport(room202Report)}
                className="bg-slate-900/90 rounded-2xl p-5 border-2 border-cyan-400 shadow-xl shadow-cyan-950/40 cursor-pointer hover:scale-102 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-bl-xl shadow-sm">
                  قاعة رئيسية ⭐
                </div>

                <div className="flex items-start justify-between mb-3 mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-black text-sm">
                      202
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors">
                        قاعة 202
                      </h4>
                      <p className="text-[11px] text-slate-400">مبنى أ - الدور الثاني</p>
                    </div>
                  </div>
                </div>

                {/* Status indicator on room map */}
                {room202Report ? (
                  <div className="space-y-2 mt-4 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">حالة المفتاح:</span>
                      {room202Report.status === 'searching' ? (
                        <span className="text-rose-400 font-extrabold animate-pulse flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          مفقود (جاري البحث)
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                          تم العثور عليه!
                        </span>
                      )}
                    </div>
                    {room202Report.foundLocation && (
                      <p className="text-[11px] text-emerald-300 font-bold bg-emerald-950/60 p-2 rounded-lg border border-emerald-500/30">
                        📍 {room202Report.foundLocation}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 mt-4">لا يوجد بلاغ مفقودات حالياً في هذه القاعة.</p>
                )}

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400 font-bold">
                  <span>فتح المحادثة ومتابعة المكان &larr;</span>
                </div>
              </div>

              {/* ROOM 201 */}
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800 opacity-80 hover:opacity-100 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-bold">
                    201
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">قاعة 201</h4>
                    <p className="text-[11px] text-slate-400">مبنى أ - الدور الثاني</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">لا توجد مفقودات مسجلة.</p>
              </div>

              {/* COMPUTER LAB 3 */}
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800 opacity-80 hover:opacity-100 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-bold">
                    معمل 3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">معمل الحاسب 3</h4>
                    <p className="text-[11px] text-slate-400">مبنى أ - الدور الثاني</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-400 font-bold">✨ تم العثور على مفتاح هيونداي سابقاً</p>
              </div>

            </div>
          </div>
        )}

        {/* Floor 1 Layout */}
        {selectedFloor === 'floor1' && (
          <div className="relative z-10 space-y-6">
            <h3 className="text-sm font-extrabold text-cyan-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              مخطط الدور الأول - قاعة 101 ومكتب الأمن الرئيسي
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="font-bold text-white text-sm">قاعة 101 (مبنى ب)</h4>
                <p className="text-xs text-slate-400 mt-1">حالة القاعة: آمنة ولا يوجد بلاغات معلقة.</p>
              </div>

              <div className="bg-emerald-950/40 p-5 rounded-2xl border border-emerald-500/40">
                <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  غرفة الاستقبال الرئيسية للأمن (غرفة 104)
                </h4>
                <p className="text-xs text-emerald-200 mt-1">
                  المكتب الرئيسي لتسليم واستلام جميع المفاتيح المعثور عليها بالقاعات.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Services Layout */}
        {selectedFloor === 'services' && (
          <div className="relative z-10 space-y-6">
            <h3 className="text-sm font-extrabold text-cyan-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              المبنى المركزي - المكتبة المركزية والمطعم الطلابي
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="font-bold text-white text-sm">المكتبة المركزية - قسم المراجع</h4>
                <p className="text-xs text-amber-400 font-bold mt-1">🔑 يوجد بلاغ مفتاح مفرد بشريط أحمر (جاري البحث)</p>
              </div>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              قاعة بها مفتاح مفقود
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              قاعة عُثر فيها على المفتاح
            </span>
          </div>

          <button
            onClick={() => setIsLostModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition-all shadow-md"
          >
            + إرسال بلاغ في إحدى هذه القاعات
          </button>
        </div>

      </div>

    </div>
  );
}
