import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUILDINGS, CATEGORIES } from '../utils/storage';
import { X, Sparkles, AlertTriangle, MapPin, Tag } from 'lucide-react';

export default function ReportLostModal() {
  const { isLostModalOpen, setIsLostModalOpen, addLostReport, currentUser } = useApp();

  const [building, setBuilding] = useState(BUILDINGS[0].name);
  const [floor, setFloor] = useState('الدور الثاني');
  const [room, setRoom] = useState('قاعة 202');
  const [specificLocation, setSpecificLocation] = useState('');
  const [category, setCategory] = useState('phones');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keyDetails, setKeyDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [studentId, setStudentId] = useState('');

  if (!isLostModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addLostReport({
      title: title || `غرض مفقود في ${room}`,
      category,
      building,
      floor,
      room,
      specificLocation,
      description: description || `فقدت الغرض في ${room} يرجى الإبلاغ فور العثور عليه.`,
      keyDetails,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
      reporterName: currentUser ? currentUser.name : (reporterName || 'طالب كلية'),
      reporterPhone: currentUser ? currentUser.phone : (reporterPhone || '0500000000'),
      studentId: currentUser ? currentUser.studentId : (studentId || '44109000')
    });
  };

  const selectedBldObj = BUILDINGS.find(b => b.name === building) || BUILDINGS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-modal rounded-3xl max-w-xl w-full p-6 border border-rose-500/40 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsLostModalOpen(false)}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-slate-800/80 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center text-2xl shrink-0">
            🚨
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">إبلاغ عن غرض مفقود بالكلية</h2>
            <p className="text-xs text-slate-400">حدد القاعة والتفاصيل ليتمكن زملاؤك والأمن من مساعدتك</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Quick Room Shortcuts */}
          <div className="bg-slate-900/80 p-3 rounded-2xl border border-cyan-500/30">
            <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              اختيار سريع للقاعات الأكثر شيوعاً:
            </label>
            <div className="flex flex-wrap gap-2">
              {['قاعة 202', 'قاعة 201', 'قاعة 101', 'قاعة 105', 'معمل الحاسب 3', 'المكتبة المركزية'].map(r => (
                <button
                  type="button"
                  key={r}
                  onClick={() => {
                    setRoom(r);
                    if (r === 'قاعة 202' || r === 'قاعة 201' || r === 'معمل الحاسب 3') {
                      setBuilding(BUILDINGS[0].name);
                      setFloor('الدور الثاني');
                    } else if (r === 'قاعة 101') {
                      setBuilding(BUILDINGS[0].name);
                      setFloor('الدور الأول');
                    } else if (r === 'قاعة 105') {
                      setBuilding(BUILDINGS[1].name);
                      setFloor('الدور الأرضي');
                    } else {
                      setBuilding(BUILDINGS[3].name);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    room === r
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-extrabold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {r} {r === 'قاعة 202' ? '⭐' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">عنوان البلاغ (اسم الغرض)</label>
              <input
                type="text"
                placeholder="مثال: آيفون 15 برو، محفظة بنية، مفتاح سيارة"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">فئة الغرض</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Building & Floor & Room */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">المبنى الجامعي</label>
              <select
                value={building}
                onChange={e => setBuilding(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
              >
                {BUILDINGS.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">الدور / الطابق</label>
              <select
                value={floor}
                onChange={e => setFloor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
              >
                <option value="الدور الأرضي">الدور الأرضي</option>
                <option value="الدور الأول">الدور الأول</option>
                <option value="الدور الثاني">الدور الثاني</option>
                <option value="الدور الثالث">الدور الثالث</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-cyan-300 mb-1.5 block">رقم أو اسم القاعة</label>
              <input
                type="text"
                value={room}
                onChange={e => setRoom(e.target.value)}
                required
                placeholder="مثال: قاعة 202"
                className="w-full bg-slate-900 border border-cyan-500/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-bold"
              />
            </div>
          </div>

          {/* Exact Location */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">الموقع الدقيق داخل القاعة (مكان جلوسك)</label>
            <input
              type="text"
              placeholder="مثال: في الصف الثالث جهة النوافذ، على طاولة المحاضر، الكرسي الأخير..."
              value={specificLocation}
              onChange={e => setSpecificLocation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Description & Distinguishing Marks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">تفاصيل الفقدان ووقت المحاضرة</label>
              <textarea
                rows={2}
                placeholder="مثال: أثناء محاضرة نظم التشغيل الساعة 1 ظهراً..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">علامات مميزة للتعرف عليه</label>
              <textarea
                rows={2}
                placeholder="مثال: عليه غلاف شفاف، ستيكر، لون خاص..."
                value={keyDetails}
                onChange={e => setKeyDetails(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">رابط صورة للغرض (اختياري)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Contact Info (if guest) */}
          {!currentUser && (
            <div className="grid grid-cols-3 gap-3 border-t border-slate-800 pt-3">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">اسمك</label>
                <input
                  type="text"
                  placeholder="اسم الطالب"
                  value={reporterName}
                  onChange={e => setReporterName(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">رقم الجوال</label>
                <input
                  type="tel"
                  placeholder="05xxxxxxxx"
                  value={reporterPhone}
                  onChange={e => setReporterPhone(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">الرقم الجامعي</label>
                <input
                  type="text"
                  placeholder="44xxxxxx"
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              إرسال البلاغ وتنبيه طلاب الكلية وغرفة الأمن فوراً
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
