import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUILDINGS, CATEGORIES } from '../utils/storage';
import { X, CheckCircle, Navigation } from 'lucide-react';

export default function ReportFoundModal() {
  const { isFoundModalOpen, setIsFoundModalOpen, addFoundReport, currentUser } = useApp();

  const [building, setBuilding] = useState(BUILDINGS[0].name);
  const [floor, setFloor] = useState('الدور الثاني');
  const [room, setRoom] = useState('قاعة 202');
  const [category, setCategory] = useState('phones');
  const [foundLocation, setFoundLocation] = useState('');
  const [specificLocation, setSpecificLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');

  if (!isFoundModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addFoundReport({
      title: title || `عثرت على غرض في ${room}`,
      category,
      building,
      floor,
      room,
      specificLocation,
      foundLocation: foundLocation || `في ${room} - تم التسليم للأمن`,
      description: description || `وجدته في ${room} (${foundLocation || 'مكان واضح'})، وهو متاح للاستلام.`,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
      reporterName: currentUser ? currentUser.name : (reporterName || 'فاعل خير'),
      reporterPhone: currentUser ? currentUser.phone : reporterPhone
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-modal rounded-3xl max-w-lg w-full p-6 border border-emerald-500/40 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setIsFoundModalOpen(false)}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 border-b border-slate-800/80 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl shrink-0">
            ✨
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">إبلاغ عن غرض معثور عليه</h2>
            <p className="text-xs text-slate-400">ساعد زملائك وادخل مكان العثور على الغرض بدقة</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">وصف الغرض المعثور عليه</label>
              <input
                type="text"
                placeholder="مثال: سماعة AirPods، بطاقة صراف، مفتاح"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">فئة الغرض</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">المبنى</label>
              <select
                value={building}
                onChange={e => setBuilding(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {BUILDINGS.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">الدور</label>
              <select
                value={floor}
                onChange={e => setFloor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="الدور الأرضي">الدور الأرضي</option>
                <option value="الدور الأول">الدور الأول</option>
                <option value="الدور الثاني">الدور الثاني</option>
                <option value="الدور الثالث">الدور الثالث</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-emerald-300 mb-1.5 block">رقم القاعة أو المعمل</label>
              <input
                type="text"
                value={room}
                onChange={e => setRoom(e.target.value)}
                required
                placeholder="مثال: قاعة 202"
                className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-bold"
              />
            </div>
          </div>

          <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/40 space-y-1.5">
            <label className="text-xs font-bold text-emerald-300 block flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-400" />
              أين وجدته بالضبط وأين وضعته الآن؟ (مكان الاستلام)
            </label>
            <input
              type="text"
              placeholder="مثال: تحت منصة قاعة 202، وسلّمته لغرفة الأمن 104"
              value={foundLocation}
              onChange={e => setFoundLocation(e.target.value)}
              className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-bold"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">ملاحظات إضافية</label>
            <textarea
              rows={2}
              placeholder="أي تفاصيل تساعد صاحب الغرض في التعرف عليه..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {!currentUser && (
            <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-3">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">اسمك (اختياري)</label>
                <input
                  type="text"
                  placeholder="فاعل خير"
                  value={reporterName}
                  onChange={e => setReporterName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">رقم للتواصل (اختياري)</label>
                <input
                  type="tel"
                  placeholder="05xxxxxxxx"
                  value={reporterPhone}
                  onChange={e => setReporterPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              حفظ وتأكيد مكان العثور
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
