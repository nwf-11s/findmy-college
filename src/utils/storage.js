// College Lost & Found Mock Data & Storage

export const BUILDINGS = [
  {
    id: 'bld-a',
    name: 'مبنى أ - كلية الهندسة وعلوم الحاسب',
    floors: ['الدور الأرضي', 'الدور الأول', 'الدور الثاني', 'الدور الثالث'],
    rooms: ['قاعة 202', 'قاعة 201', 'قاعة 203', 'قاعة 101', 'معمل الحاسب 1', 'معمل الحاسب 3', 'مدرج A1', 'مكتب شؤون الطلاب (أ)']
  },
  {
    id: 'bld-b',
    name: 'مبنى ب - كلية إدارة الأعمال والعلوم الإدارية',
    floors: ['الدور الأرضي', 'الدور الأول', 'الدور الثاني'],
    rooms: ['قاعة 105', 'قاعة 106', 'قاعة 210', 'معمل المالية والإحصاء', 'مدرج B2']
  },
  {
    id: 'bld-c',
    name: 'مبنى ج - السنة الأولى المشتركة (التحضيرية)',
    floors: ['الدور الأرضي', 'الدور الأول', 'الدور الثاني'],
    rooms: ['قاعة 110', 'قاعة 112', 'معمل اللغة الإنجليزية', 'صالة الاختبارات الكبرى']
  },
  {
    id: 'bld-central',
    name: 'المبنى المركزي والمرافق الجامعية',
    floors: ['الدور الأرضي', 'الدور الأول'],
    rooms: ['المكتبة المركزية - قسم المراجع', 'المطعم الطلابي والكافتيريا', 'مصلى الطلاب الرئيسي', 'الصالة الرياضية']
  },
  {
    id: 'bld-sec',
    name: 'مبنى الأمن والسلامة الجامعي',
    floors: ['الدور الأرضي'],
    rooms: ['مكتب المفقودات الرئيسي 104', 'بوابة 1 الرئيسية', 'بوابة 2 الغربية']
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'الكل', icon: '✨' },
  { id: 'phones', name: 'جوالات وأجهزة', icon: '📱' },
  { id: 'cards', name: 'بطاقات وهوية', icon: '🪪' },
  { id: 'laptops', name: 'لابتوب وآيباد', icon: '💻' },
  { id: 'keys', name: 'مفاتيح وميداليات', icon: '🔑' },
  { id: 'wallets', name: 'محافظ وحقائب', icon: '🎒' },
  { id: 'books', name: 'كتب وأدوات', icon: '📚' },
  { id: 'wearables', name: 'ساعات ونظارات', icon: '👓' },
  { id: 'other', name: 'أغراض أخرى', icon: '📦' }
];

export const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'محمد عبدالله القحطاني',
    studentId: '44210988',
    email: 'mohammed@student.ksu.edu.sa',
    phone: '0551234567',
    college: 'كلية علوم الحاسب والمعلومات',
    role: 'student',
    password: '123'
  },
  {
    id: 'usr-sec',
    name: 'الضابط أبو فهد (الأمن والسلامة)',
    studentId: 'SEC-9901',
    email: 'security@ksu.edu.sa',
    phone: '0509998877',
    college: 'إدارة الأمن والسلامة الجامعية',
    role: 'security',
    password: '123'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'REP-2026-101',
    type: 'lost',
    title: 'آيفون 15 برو تيتانيوم أزرق',
    category: 'phones',
    categoryName: 'جوالات وأجهزة',
    building: 'مبنى أ - كلية الهندسة وعلوم الحاسب',
    floor: 'الدور الثاني',
    room: 'قاعة 202',
    specificLocation: 'في الصف الثالث من جهة النوافذ، بجانب فيش الشاحن الجداري',
    dateReported: '2026-10-12T14:30:00',
    reporterName: 'سعود بن تركي',
    reporterPhone: '0567890123',
    reporterEmail: 'saud@student.ksu.edu.sa',
    studentId: '44310567',
    description: 'نسيت جوالي آيفون 15 برو لونه أزرق تيتانيوم بغلاف شفاف، أثناء محاضرة نظم التشغيل التي انتهت الساعة 2 ظهراً في قاعة 202.',
    keyDetails: 'شاشة القفل تحتوي صورة برج المملكة، يوجد ستيكر صغير في الخلف.',
    status: 'searching',
    foundLocation: null,
    foundBy: null,
    foundDate: null,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    messages: [
      {
        id: 'm1',
        sender: 'سعود بن تركي',
        role: 'student',
        text: 'السلام عليكم، هل شافه أحد في قاعة 202 بعد محاضرة نظم التشغيل؟',
        time: '14:45'
      },
      {
        id: 'm2',
        sender: 'الأمن والسلامة',
        role: 'security',
        text: 'وعليكم السلام، توجهت فرقة تفتيش الآن لقاعة 202 للتأكد وسنبلغك فوراً.',
        time: '14:50'
      }
    ]
  },
  {
    id: 'REP-2026-102',
    type: 'found',
    title: 'محفظة جلدية بنية وبطاقة جامعية',
    category: 'wallets',
    categoryName: 'محافظ وحقائب',
    building: 'مبنى أ - كلية الهندسة وعلوم الحاسب',
    floor: 'الدور الثاني',
    room: 'قاعة 202',
    specificLocation: 'تحت منصة المحاضر في قاعة 202 (تم تسليمها لغرفة الأمن 104)',
    dateReported: '2026-10-12T16:15:00',
    reporterName: 'فهد المطيري (طالب)',
    reporterPhone: '0543219876',
    reporterEmail: 'fahad@student.ksu.edu.sa',
    studentId: '44109432',
    description: 'عثرت على محفظة بنية اللون بداخلها بطاقة صراف وبطاقة جامعية تخص طالب أثناء خروجي من قاعة 202.',
    keyDetails: 'تم تسليمها مباشرة لمكتب الأمن والسلامة مبنى الإدارة غرفة 104.',
    status: 'found',
    foundLocation: 'قاعة 202 - تحت منصة المحاضر (متاحة بمكتب الأمن غرفة 104)',
    foundBy: 'فهد المطيري',
    foundDate: '2026-10-12T16:15:00',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    messages: [
      {
        id: 'm10',
        sender: 'فهد المطيري',
        role: 'student',
        text: 'سلمت المحفظة لمكتب الأمن حتى يستلمها صاحبها بأمان.',
        time: '16:20'
      }
    ]
  },
  {
    id: 'REP-2026-103',
    type: 'lost',
    title: 'ميدالية مفاتيح سيارة كامري مع مفتاح شقة',
    category: 'keys',
    categoryName: 'مفاتيح وميداليات',
    building: 'مبنى أ - كلية الهندسة وعلوم الحاسب',
    floor: 'الدور الثاني',
    room: 'قاعة 201',
    specificLocation: 'في الصف الأخير جهة الباب',
    dateReported: '2026-10-12T11:00:00',
    reporterName: 'عبدالرحمن العتيبي',
    reporterPhone: '0559988112',
    reporterEmail: 'abdulrahman@student.ksu.edu.sa',
    studentId: '44200877',
    description: 'فقدت طقم مفاتيح يحتوي على ريموت كامري ومفتاح منزل مع ميدالية عليها شعار النادي الرياضي.',
    keyDetails: 'ميدالية قماشية زرقاء مكتوب عليها KSU.',
    status: 'delivered',
    foundLocation: 'تم العثور عليها في قاعة 201 من قبل مشرف النظافة وتسليمها للطالب.',
    foundBy: 'مشرف النظافة',
    foundDate: '2026-10-12T12:30:00',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
    messages: [
      {
        id: 'm21',
        sender: 'عبدالرحمن العتيبي',
        role: 'student',
        text: 'تم بحمد الله استلام المفتاح من مكتب الأمن، شكراً لكم!',
        time: '13:00'
      }
    ]
  }
];

const STORAGE_KEY_REPORTS = 'college_app_reports';
const STORAGE_KEY_USERS = 'college_app_users';
const STORAGE_KEY_CURRENT_USER = 'college_current_user';

export function loadReports() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_REPORTS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse localStorage reports:', e);
  }
  localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(INITIAL_REPORTS));
  return INITIAL_REPORTS;
}

export function saveReports(reports) {
  try {
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
  } catch (e) {
    console.error('Failed to save reports:', e);
  }
}

export function loadUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse users:', e);
  }
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
  return INITIAL_USERS;
}

export function saveUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users:', e);
  }
}

export function loadCurrentUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse current user:', e);
  }
  return INITIAL_USERS[0]; // Default student account
}

export function saveCurrentUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  } catch (e) {
    console.error('Failed to save current user:', e);
  }
}
