import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, Phone, BookOpen, ShieldCheck } from 'lucide-react';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login, register } = useApp();
  const [identifier, setIdentifier] = useState('44210988');
  const [password, setPassword] = useState('123');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regId, setRegId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCollege, setRegCollege] = useState('كلية علوم الحاسب والمعلومات');
  const [regPassword, setRegPassword] = useState('');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = login(identifier, password);
    if (!success) {
      alert('البيانات غير متطابقة. جرب استخدام كلمة المرور 123');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regId || !regEmail || !regPassword) {
      alert('يرجى تعبئة كافة الحقول المطلوبة');
      return;
    }
    register({
      name: regName,
      studentId: regId,
      email: regEmail,
      phone: regPhone || '0500000000',
      college: regCollege,
      password: regPassword
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-modal rounded-3xl max-w-md w-full p-6 border border-slate-700/80 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mode Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              authMode === 'login' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              authMode === 'register' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            إنشاء حساب جديد
          </button>
        </div>

        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-black text-white">مرحباً بك في مفقودات الكلية</h3>
              <p className="text-xs text-slate-400 mt-1">سجل الدخول بالرقم الجامعي أو البريد لمتابعة بلاغاتك</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">الرقم الجامعي أو البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثال: 44210988"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/20 transition-all"
            >
              تسجيل الدخول 🚀
            </button>

            {/* Quick Demo Access */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <p className="text-[11px] text-slate-400 text-center font-bold">دخول تجريبي سريع:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setIdentifier('44210988'); setPassword('123'); login('44210988', '123'); }}
                  className="py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-bold"
                >
                  طالب جامعي
                </button>
                <button
                  type="button"
                  onClick={() => { setIdentifier('SEC-9901'); setPassword('123'); login('SEC-9901', '123'); }}
                  className="py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-bold"
                >
                  أمن الكلية
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div className="text-center mb-2">
              <h3 className="text-lg font-black text-white">إنشاء حساب جامعي جديد</h3>
              <p className="text-xs text-slate-400 mt-0.5">سجل بياناتك للتواصل الفوري عند العثور على مفقوداتك</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">الاسم الكامل</label>
              <input
                type="text"
                placeholder="اسم الطالب"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">الرقم الجامعي</label>
                <input
                  type="text"
                  placeholder="44xxxxxx"
                  value={regId}
                  onChange={e => setRegId(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">رقم الجوال</label>
                <input
                  type="tel"
                  placeholder="05xxxxxxxx"
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">البريد الإلكتروني الجامعي</label>
              <input
                type="email"
                placeholder="student@ksu.edu.sa"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">الكلية</label>
              <select
                value={regCollege}
                onChange={e => setRegCollege(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
              >
                <option value="كلية علوم الحاسب والمعلومات">كلية علوم الحاسب والمعلومات</option>
                <option value="كلية الهندسة">كلية الهندسة</option>
                <option value="كلية إدارة الأعمال">كلية إدارة الأعمال</option>
                <option value="كلية العلوم">كلية العلوم</option>
                <option value="السنة الأولى المشتركة">السنة الأولى المشتركة</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/20 transition-all mt-2"
            >
              تأكيد إنشاء الحساب ✨
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
