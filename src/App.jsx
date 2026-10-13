import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import ReportCard from './components/ReportCard';
import ReportLostModal from './components/ReportLostModal';
import ReportFoundModal from './components/ReportFoundModal';
import AuthModal from './components/AuthModal';
import ChatModal from './components/ChatModal';
import CampusMap from './components/CampusMap';
import ToastContainer from './components/ToastContainer';
import { CATEGORIES, BUILDINGS } from './utils/storage';
import {
  Search,
  Sparkles,
  MapPin,
  ListFilter,
  PlusCircle,
  CheckCircle
} from 'lucide-react';

function MainAppContent() {
  const {
    reports,
    activeTab,
    setActiveTab,
    currentUser,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBuilding,
    setSelectedBuilding,
    selectedRoom,
    setSelectedRoom,
    selectedStatus,
    setSelectedStatus,
    selectedType,
    setSelectedType,
    setIsLostModalOpen,
    setIsFoundModalOpen,
    setAuthModalOpen,
    setAuthMode,
    setChatReport,
    logout
  } = useApp();

  const [deviceMode, setDeviceMode] = useState('auto'); // 'auto' | 'iphone' | 'android'

  // Filter reports
  const filteredReports = reports.filter(r => {
    if (selectedType !== 'ALL' && r.type !== selectedType) return false;
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (selectedBuilding !== 'ALL' && r.building !== selectedBuilding) return false;
    if (selectedRoom !== 'ALL' && !r.room?.includes(selectedRoom)) return false;
    if (selectedStatus !== 'ALL' && r.status !== selectedStatus) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title?.toLowerCase().includes(q);
      const matchRoom = r.room?.toLowerCase().includes(q);
      const matchDesc = r.description?.toLowerCase().includes(q);
      const matchBuilding = r.building?.toLowerCase().includes(q);
      const matchLocation = r.specificLocation?.toLowerCase().includes(q);
      if (!matchTitle && !matchRoom && !matchDesc && !matchBuilding && !matchLocation) return false;
    }

    return true;
  });

  const myReports = currentUser
    ? reports.filter(r => r.studentId === currentUser.studentId || r.reporterPhone === currentUser.phone || r.reporterName === currentUser.name)
    : [];

  const room202Report = reports.find(r => r.room && r.room.includes('202') && r.status === 'searching');

  const renderInnerApp = () => (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white pb-24 md:pb-16">
      <ToastContainer />
      <Navbar />

      {/* Device Mode Switcher for Desktop */}
      <div className="hidden xl:flex items-center justify-end max-w-7xl mx-auto px-4 w-full pt-3">
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs">
          <span className="px-2.5 text-[11px] text-slate-400 font-bold">معاينة واجهة الأجهزة:</span>
          <button
            onClick={() => setDeviceMode('auto')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${deviceMode === 'auto' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
          >
            🖥️ كمبيوتر
          </button>
          <button
            onClick={() => setDeviceMode('iphone')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${deviceMode === 'iphone' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
          >
            📱 آيفون (iOS)
          </button>
          <button
            onClick={() => setDeviceMode('android')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${deviceMode === 'android' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
          >
            🤖 أندرويد
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        
        {/* ROOM 202 QUICK ACCESS BANNER */}
        {room202Report && (
          <div className="glass-panel-accent rounded-3xl p-5 border border-cyan-400/40 shadow-2xl relative overflow-hidden bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full animate-pulse">
                      بلاغ نشط بقاعة 202 📢
                    </span>
                    <h2 className="text-base font-extrabold text-white">
                      {room202Report.title} ({room202Report.building})
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {room202Report.specificLocation || 'جاري البحث بالتنسيق مع الكلية والأمن...'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setChatReport(room202Report)}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0"
              >
                متابعة البلاغ والتواصل &larr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: All Reports Feed */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            
            {/* Search & Filter Header Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="ابحث برقم القاعة (مثال: قاعة 202)، اسم الغرض (آيفون، محفظة، بطاقة)، أو المبنى..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-semibold"
                  />
                </div>

                <div className="flex items-center gap-1.5 w-full md:w-auto bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSelectedType('ALL')}
                    className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedType === 'ALL' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                  >
                    الكل
                  </button>
                  <button
                    onClick={() => setSelectedType('lost')}
                    className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedType === 'lost' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    المفقودات
                  </button>
                  <button
                    onClick={() => setSelectedType('found')}
                    className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedType === 'found' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    المعثورات
                  </button>
                </div>
              </div>

              {/* Categories Scroll */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Room & Building & Status Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80">
                <select
                  value={selectedBuilding}
                  onChange={e => setSelectedBuilding(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 font-semibold"
                >
                  <option value="ALL">جميع المباني والكليات</option>
                  {BUILDINGS.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>

                <select
                  value={selectedRoom}
                  onChange={e => setSelectedRoom(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 font-semibold"
                >
                  <option value="ALL">جميع القاعات</option>
                  <option value="202">قاعة 202 ⭐ (الهندسة)</option>
                  <option value="201">قاعة 201</option>
                  <option value="101">قاعة 101</option>
                  <option value="105">قاعة 105</option>
                  <option value="معمل الحاسب">معامل الحاسب الآلي</option>
                  <option value="المكتبة">المكتبة المركزية</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 font-semibold"
                >
                  <option value="ALL">جميع الحالات</option>
                  <option value="searching">جاري البحث</option>
                  <option value="found">تم العثور عليه</option>
                  <option value="delivered">تم التسليم للمالك</option>
                </select>
              </div>
            </div>

            {/* Mobile Action Bar */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => {
                  if (!currentUser) { setAuthMode('login'); setAuthModalOpen(true); }
                  else setIsLostModalOpen(true);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black text-xs rounded-2xl text-center shadow-lg"
              >
                + فقدت غرضاً!
              </button>
              <button
                onClick={() => {
                  if (!currentUser) { setAuthMode('login'); setAuthModalOpen(true); }
                  else setIsFoundModalOpen(true);
                }}
                className="flex-1 py-3 bg-slate-900 text-emerald-400 font-black text-xs rounded-2xl text-center border border-emerald-500/30"
              >
                + وجدت غرضاً
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredReports.length > 0 ? (
                filteredReports.map(rep => (
                  <ReportCard key={rep.id} report={rep} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 glass-panel rounded-3xl space-y-3">
                  <div className="text-5xl">🔍</div>
                  <h3 className="text-base font-bold text-slate-300">لا توجد بلاغات تطابق البحث</h3>
                  <p className="text-xs text-slate-500">جرب البحث برقم قاعة آخر أو فئة مختلفة.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Interactive Campus Map */}
        {activeTab === 'map' && <CampusMap />}

        {/* Tab 3: My Reports */}
        {activeTab === 'my_reports' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">سجل بلاغاتي الخاصة</h2>
                <p className="text-xs text-slate-400 mt-1">الأغراض التي أبلغت عن فقدانها أو العثور عليها</p>
              </div>
              <button
                onClick={() => setIsLostModalOpen(true)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl"
              >
                + بلاغ مفقود جديد
              </button>
            </div>

            {myReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {myReports.map(rep => (
                  <ReportCard key={rep.id} report={rep} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 glass-panel rounded-3xl space-y-3">
                <div className="text-5xl">📭</div>
                <h3 className="text-base font-bold text-slate-300">لم تقم بكتابة أي بلاغ حتى الآن</h3>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Profile */}
        {activeTab === 'profile' && currentUser && (
          <div className="max-w-xl mx-auto glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl font-black">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-black text-white">{currentUser.name}</h2>
                <p className="text-xs text-slate-400">{currentUser.college}</p>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">الرقم الجامعي: {currentUser.studentId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-bold">البريد الإلكتروني:</span>
                <span className="text-white font-mono">{currentUser.email}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-bold">الجوال للتواصل:</span>
                <span className="text-white font-mono">{currentUser.phone}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={logout}
                className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold"
              >
                تسجيل الخروج 🚪
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-xl text-xs font-black"
              >
                العودة للبلاغات ←
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 safe-bottom md:hidden shadow-2xl">
        <div className="flex items-center justify-around py-2 px-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'all' ? 'text-cyan-400 font-black' : 'text-slate-400'
            }`}
          >
            <span className="text-lg">📋</span>
            <span className="text-[10px]">البلاغات</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'map' ? 'text-cyan-400 font-black' : 'text-slate-400'
            }`}
          >
            <span className="text-lg">🗺️</span>
            <span className="text-[10px]">القاعات</span>
          </button>

          <button
            onClick={() => {
              if (!currentUser) { setAuthMode('login'); setAuthModalOpen(true); }
              else setIsLostModalOpen(true);
            }}
            className="flex flex-col items-center -mt-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white w-12 h-12 rounded-full items-center justify-center shadow-lg shadow-rose-600/40 border-2 border-slate-900 active:scale-95"
          >
            <span className="text-xl font-bold">+</span>
          </button>

          {currentUser && (
            <button
              onClick={() => setActiveTab('my_reports')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                activeTab === 'my_reports' ? 'text-cyan-400 font-black' : 'text-slate-400'
              }`}
            >
              <span className="text-lg">🗂️</span>
              <span className="text-[10px]">بلاغاتي</span>
            </button>
          )}

          <button
            onClick={() => {
              if (!currentUser) { setAuthMode('login'); setAuthModalOpen(true); }
              else setActiveTab('profile');
            }}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'profile' ? 'text-cyan-400 font-black' : 'text-slate-400'
            }`}
          >
            <span className="text-lg">👤</span>
            <span className="text-[10px]">{currentUser ? 'حسابي' : 'دخول'}</span>
          </button>
        </div>
      </div>

      {/* Modals Container */}
      <ReportLostModal />
      <ReportFoundModal />
      <AuthModal />
      <ChatModal />
    </div>
  );

  if (deviceMode === 'iphone') {
    return (
      <div className="min-h-screen bg-slate-900/90 py-8 px-4 flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-[420px] mb-3 text-xs text-slate-400">
          <span className="font-bold text-cyan-400">📱 وضع محاكاة الآيفون (iPhone iOS)</span>
          <button onClick={() => setDeviceMode('auto')} className="text-slate-300 hover:text-white underline">
            شاشة كاملة ✕
          </button>
        </div>
        <div className="w-full max-w-[420px] rounded-[48px] border-[10px] border-slate-800 shadow-2xl overflow-hidden bg-slate-950 h-[820px] overflow-y-auto relative">
          <div className="w-28 h-6 bg-black rounded-2xl mx-auto mt-2 mb-1 flex items-center justify-center text-[9px] text-slate-500 font-mono">
            Dynamic Island
          </div>
          {renderInnerApp()}
        </div>
      </div>
    );
  }

  if (deviceMode === 'android') {
    return (
      <div className="min-h-screen bg-slate-900/90 py-8 px-4 flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-[430px] mb-3 text-xs text-slate-400">
          <span className="font-bold text-emerald-400">🤖 وضع محاكاة الأندرويد (Android)</span>
          <button onClick={() => setDeviceMode('auto')} className="text-slate-300 hover:text-white underline">
            شاشة كاملة ✕
          </button>
        </div>
        <div className="w-full max-w-[430px] rounded-[36px] border-[8px] border-slate-800 shadow-2xl overflow-hidden bg-slate-950 h-[820px] overflow-y-auto relative">
          <div className="w-3 h-3 bg-black rounded-full mx-auto mt-2 mb-1 border border-slate-700"></div>
          {renderInnerApp()}
        </div>
      </div>
    );
  }

  return renderInnerApp();
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
