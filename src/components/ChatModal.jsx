import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  Navigation,
  CheckCircle2,
  Shield,
  User,
  Key,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export default function ChatModal() {
  const {
    chatReport,
    setChatReport,
    sendMessage,
    resolveReportLocation,
    activeRole,
    reports
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [showLocationBox, setShowLocationBox] = useState(false);

  if (!chatReport) return null;

  // Sync with current live report data
  const currentReport = reports.find(r => r.id === chatReport.id) || chatReport;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !locationInput.trim()) return;

    sendMessage(currentReport.id, inputMessage, locationInput ? locationInput : null);
    setInputMessage('');
    setLocationInput('');
    setShowLocationBox(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-modal rounded-3xl max-w-2xl w-full h-[650px] max-h-[90vh] flex flex-col border border-cyan-500/30 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">{currentReport.title}</h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {currentReport.room}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                صاحب البلاغ: {currentReport.reporterName} ({currentReport.reporterPhone})
              </p>
            </div>
          </div>

          <button
            onClick={() => setChatReport(null)}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Found Location Highlight Banner */}
        {currentReport.foundLocation ? (
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900/80 to-slate-900 p-3 px-4 border-b border-emerald-500/40 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                <Navigation className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-400">📍 تم تحديد مكان العثور على المفتاح:</p>
                <p className="text-xs font-bold text-white mt-0.5">{currentReport.foundLocation}</p>
              </div>
            </div>

            {currentReport.status !== 'delivered' && (
              <button
                onClick={() => resolveReportLocation(currentReport.id, 'delivered', currentReport.foundLocation)}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] shadow-sm shrink-0"
              >
                تأكيد التسليم للطلاب
              </button>
            )}
          </div>
        ) : (
          <div className="bg-amber-950/40 px-4 py-2 border-b border-amber-500/30 flex items-center justify-between text-xs shrink-0">
            <span className="text-amber-300 font-bold flex items-center gap-1.5">
              🔍 مفتاح مفقود - جاري البحث في {currentReport.room}
            </span>
            {activeRole === 'security' && (
              <button
                onClick={() => setShowLocationBox(prev => !prev)}
                className="text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg font-bold"
              >
                + تسجيل مكان العثور
              </button>
            )}
          </div>
        )}

        {/* Security Quick Found Box */}
        {showLocationBox && (
          <div className="bg-slate-900 p-3 border-b border-cyan-500/40 animate-in fade-in duration-150 shrink-0">
            <label className="text-xs font-bold text-cyan-300 mb-1 block">
              📍 إدخال مكان العثور على المفتاح بالضبط (مثال: قاعة 202 - على المنصة):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={locationInput}
                onChange={e => setLocationInput(e.target.value)}
                placeholder="وجدته في قاعة 202 وسلّمته للأمن..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (locationInput) {
                    resolveReportLocation(currentReport.id, 'found', locationInput);
                    setShowLocationBox(false);
                    setLocationInput('');
                  }
                }}
                className="bg-emerald-600 text-white font-bold text-xs px-4 py-1.5 rounded-xl hover:bg-emerald-500"
              >
                حفظ المكان
              </button>
            </div>
          </div>
        )}

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
          {currentReport.messages && currentReport.messages.length > 0 ? (
            currentReport.messages.map(msg => {
              const isSecurity = msg.role === 'security';
              const isSystem = msg.role === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center my-3">
                    <span className="bg-slate-900/80 text-cyan-400 border border-slate-800 text-[11px] px-3.5 py-1 rounded-full font-bold inline-block shadow-sm">
                      🔔 {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    isSecurity ? 'mr-auto items-end' : 'ml-auto items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-bold px-1">
                    {isSecurity ? (
                      <>
                        <Shield className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">{msg.sender}</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 text-cyan-400" />
                        <span className="text-cyan-400">{msg.sender}</span>
                      </>
                    )}
                    <span>• {msg.time}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed font-semibold shadow-md ${
                      isSecurity
                        ? 'bg-emerald-950 text-emerald-100 border border-emerald-500/40 rounded-tl-none'
                        : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tr-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Location Highlight inside chat bubble */}
                    {msg.isLocationUpdate && (
                      <div className="mt-2 pt-2 border-t border-emerald-500/30 text-emerald-300 bg-emerald-900/60 p-2 rounded-xl flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                        <div>
                          <span className="text-[10px] block font-bold text-emerald-200">
                            موقع المفتاح المحدد:
                          </span>
                          <span className="text-xs font-extrabold text-white">
                            {msg.locationText}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              لا توجد رسائل سابقة. أرسل استفسارك أو تحديث المكان هنا.
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder={
              activeRole === 'security'
                ? "اكتب رداً للطالب أو أرسل تفاصيل المكان..."
                : "اكتب رسالة أو استفساراً لفريق الأمن..."
            }
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            className="p-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md shrink-0"
          >
            <Send className="w-4 h-4 transform rotate-180" />
          </button>
        </form>

      </div>
    </div>
  );
}
