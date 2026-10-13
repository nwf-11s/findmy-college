import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loadReports, 
  saveReports, 
  loadUsers, 
  saveUsers, 
  loadCurrentUser, 
  saveCurrentUser,
  CATEGORIES 
} from '../utils/storage';
import { sounds } from '../utils/audio';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [reports, setReports] = useState(() => loadReports());
  const [users, setUsers] = useState(() => loadUsers());
  const [currentUser, setCurrentUser] = useState(() => loadCurrentUser());

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBuilding, setSelectedBuilding] = useState('ALL');
  const [selectedRoom, setSelectedRoom] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL'); // 'ALL' | 'lost' | 'found'
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'map', 'my_reports', 'profile'
  
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);
  const [isFoundModalOpen, setIsFoundModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [chatReport, setChatReport] = useState(null);
  const [selectedReportDetail, setSelectedReportDetail] = useState(null);
  
  const [toastAlerts, setToastAlerts] = useState([]);

  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    saveCurrentUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToastAlerts(prev => [{ id, title, message, type }, ...prev]);
    setTimeout(() => {
      setToastAlerts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToastAlerts(prev => prev.filter(t => t.id !== id));
  };

  // Auth Functions
  const login = (identifier, password) => {
    const user = users.find(u => 
      (u.email.toLowerCase() === identifier.toLowerCase() || 
       u.studentId.toLowerCase() === identifier.toLowerCase() || 
       u.phone === identifier) && 
      u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setAuthModalOpen(false);
      sounds.playSuccessSound();
      addToast('أهلاً بك مجدداً!', `تم تسجيل الدخول بنجاح كـ ${user.name}`, 'success');
      return true;
    }
    sounds.playAlertSound();
    return false;
  };

  const register = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      ...userData,
      role: 'student'
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    sounds.playSuccessSound();
    addToast('تم إنشاء الحساب!', `مرحباً بك يا ${newUser.name} في منصة مفقودات الكلية`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('تسجيل الخروج', 'تم تسجيل خروجك بنجاح', 'info');
  };

  // Add Lost Item Report
  const addLostReport = (formData) => {
    const cat = CATEGORIES.find(c => c.id === formData.category) || CATEGORIES[1];
    const newReport = {
      id: `REP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      type: 'lost',
      title: formData.title || `غرض مفقود في ${formData.room}`,
      category: formData.category || 'other',
      categoryName: cat.name,
      building: formData.building,
      floor: formData.floor || 'الدور الأول',
      room: formData.room,
      specificLocation: formData.specificLocation || 'داخل القاعة',
      dateReported: new Date().toISOString(),
      reporterName: currentUser ? currentUser.name : (formData.reporterName || 'طالب كلية'),
      reporterPhone: currentUser ? currentUser.phone : (formData.reporterPhone || '0500000000'),
      reporterEmail: currentUser ? currentUser.email : '',
      studentId: currentUser ? currentUser.studentId : (formData.studentId || '44000000'),
      description: formData.description,
      keyDetails: formData.keyDetails || '',
      status: 'searching',
      foundLocation: null,
      foundBy: null,
      foundDate: null,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'النظام الجامعي',
          role: 'system',
          text: `تم تقديم بلاغ فقدان غرض في (${formData.room} - ${formData.building})، وتم إرسال تنبيه لمشرفي القاعات والأمن.`,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setReports(prev => [newReport, ...prev]);
    setIsLostModalOpen(false);

    sounds.playAlertSound();
    addToast(
      `🚨 تنبيه عاجل: فقدان غرض!`,
      `تم تسجيل بلاغ في [${formData.room}] وإشعار طلاب ومنسوبي الكلية.`,
      'alert'
    );
  };

  // Add Found Item Report
  const addFoundReport = (formData) => {
    const cat = CATEGORIES.find(c => c.id === formData.category) || CATEGORIES[1];
    const newReport = {
      id: `REP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      type: 'found',
      title: formData.title || `تم العثور على غرض في ${formData.room}`,
      category: formData.category || 'other',
      categoryName: cat.name,
      building: formData.building,
      floor: formData.floor || 'الدور الأول',
      room: formData.room,
      specificLocation: formData.specificLocation || `في ${formData.room}`,
      dateReported: new Date().toISOString(),
      reporterName: currentUser ? currentUser.name : (formData.reporterName || 'فاعل خير'),
      reporterPhone: currentUser ? currentUser.phone : (formData.reporterPhone || ''),
      reporterEmail: currentUser ? currentUser.email : '',
      studentId: currentUser ? currentUser.studentId : '',
      description: formData.description,
      keyDetails: formData.keyDetails || '',
      status: 'found',
      foundLocation: formData.foundLocation || `في ${formData.room}`,
      foundBy: currentUser ? currentUser.name : (formData.reporterName || 'أحد منسوبي الكلية'),
      foundDate: new Date().toISOString(),
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
      messages: []
    };

    setReports(prev => [newReport, ...prev]);
    setIsFoundModalOpen(false);

    sounds.playSuccessSound();
    addToast(
      `✨ تم تسجيل غرض معثور عليه!`,
      `شكراً لمساعدتك! تم إدراج الغرض في (${formData.room}) وسيتم مطابثته مع أصحاب البلاغات.`,
      'success'
    );
  };

  // Update Status & Set Found Location
  const resolveReportLocation = (reportId, status, foundLocation, foundBy = 'أمن الكلية') => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        const timeStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
        const updatedMessages = [
          ...rep.messages,
          {
            id: `msg-${Date.now()}`,
            sender: currentUser?.role === 'security' ? 'فريق الأمن والسلامة' : 'نظام الكلية',
            role: currentUser?.role || 'security',
            text: `تم تحديث حالة البلاغ إلى [${status === 'found' ? 'تم العثور عليه' : status === 'delivered' ? 'تم التسليم للمالك' : 'جاري البحث'}]`,
            time: timeStr,
            isLocationUpdate: !!foundLocation,
            locationText: foundLocation
          }
        ];

        return {
          ...rep,
          status,
          foundLocation: foundLocation || rep.foundLocation,
          foundBy: foundBy || rep.foundBy,
          foundDate: new Date().toISOString(),
          messages: updatedMessages
        };
      }
      return rep;
    }));

    sounds.playSuccessSound();
    addToast(
      `🎉 تم تحديث مكان وحالة الغرض!`,
      `تم إرسال إشعار لصاحب البلاغ بتفاصيل المكان (${foundLocation}).`,
      'success'
    );
  };

  // Send message in chat
  const sendMessage = (reportId, text, locationText = null) => {
    if (!text.trim() && !locationText) return;

    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        const timeStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
        const newMessage = {
          id: `msg-${Date.now()}`,
          sender: currentUser ? currentUser.name : 'زائر',
          role: currentUser ? currentUser.role : 'student',
          text: text,
          time: timeStr,
          isLocationUpdate: !!locationText,
          locationText: locationText
        };
        const updated = {
          ...rep,
          messages: [...rep.messages, newMessage]
        };
        if (chatReport && chatReport.id === reportId) {
          setChatReport(updated);
        }
        return updated;
      }
      return rep;
    }));

    sounds.playMessageSound();
  };

  const toggleSound = () => setSoundEnabled(prev => !prev);

  return (
    <AppContext.Provider
      value={{
        reports,
        users,
        currentUser,
        login,
        register,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        soundEnabled,
        toggleSound,
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
        activeTab,
        setActiveTab,
        isLostModalOpen,
        setIsLostModalOpen,
        isFoundModalOpen,
        setIsFoundModalOpen,
        chatReport,
        setChatReport,
        selectedReportDetail,
        setSelectedReportDetail,
        toastAlerts,
        removeToast,
        addLostReport,
        addFoundReport,
        resolveReportLocation,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
