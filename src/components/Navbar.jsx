import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Volume2,
  VolumeX,
  PlusCircle,
  CheckCircle,
  MapPin,
  ListFilter,
  User,
  Shield,
  Key
} from 'lucide-react';

export default function Navbar() {
  const {
    currentUser,
    setAuthModalOpen,
    setAuthMode,
    soundEnabled,
    toggleSound,
    activeTab,
    setActiveTab,
    setIsLostModalOpen,
    setIsFoundModalOpen,
    reports
  } = useApp();

  const activeLostCount = reports.filter(r => r.type === 'lost' && r.status === 'searching').length;

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('all')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/30">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-extrabold text-white tracking-wide">
                  مفقوداتي <span className="text-cyan-400">الجامعية</span>
                </h1>
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  الكلية والقاعات
                </span>
              </div>
              <p className="text-[11px] md:text-xs text-slate-400 font-medium">
                نظام البلاغات والبحث عن الأغراض المفقودة بالقاعات
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              جميع البلاغات
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'map'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              خريطة القاعات (قاعة 202)
            </button>

            {currentUser && (
              <button
                onClick={() => setActiveTab('my_reports')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'my_reports'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>🗂️</span>
                بلاغاتي
              </button>
            )}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "التنبيهات الصوتية مفعلة" : "التنبيهات الصوتية معطلة"}
              className={`p-2.5 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-cyan-950/40 text-cyan-400 border-cyan-500/40 hover:bg-cyan-900/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Auth User Info or Login Button */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-xs font-bold ${
                  activeTab === 'profile'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline font-bold">{currentUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5" />
                <span>دخول / تسجيل</span>
              </button>
            )}

            {/* Report Lost Button */}
            <button
              onClick={() => {
                if (!currentUser) { setAuthMode('login'); setAuthModalOpen(true); }
                else setIsLostModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              فقدت غرضاً!
            </button>

            {/* Report Found Button */}
            <button
              onClick={() => {
                if (!currentUser) { setAuthMode('login'); setAuthModalOpen(true); }
                else setIsFoundModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-emerald-500/30 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              وجدت غرضاً
            </button>

          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-800/60">
          <button
            onClick={() => setActiveTab('all')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${activeTab === 'all' ? 'text-cyan-400 bg-slate-800' : 'text-slate-400'}`}
          >
            جميع البلاغات
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${activeTab === 'map' ? 'text-cyan-400 bg-slate-800' : 'text-slate-400'}`}
          >
            خريطة القاعات (202)
          </button>
          {currentUser && (
            <button
              onClick={() => setActiveTab('my_reports')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg ${activeTab === 'my_reports' ? 'text-cyan-400 bg-slate-800' : 'text-slate-400'}`}
            >
              بلاغاتي
            </button>
          )}
          <button
            onClick={() => {
              if (!currentUser) { setAuthMode('login'); setAuthModalOpen(true); }
              else setActiveTab('profile');
            }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${activeTab === 'profile' ? 'text-cyan-400 bg-slate-800' : 'text-slate-400'}`}
          >
            {currentUser ? 'حسابي' : 'تسجيل الدخول'}
          </button>
        </div>

      </div>
    </header>
  );
}
