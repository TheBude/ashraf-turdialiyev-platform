export type Language = 'en' | 'uz' | 'ru' | 'tr';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    travels: string;
    globe: string;
    journey: string;
    research: string;
    certificates: string;
    experience: string;
    audience: string;
    contact: string;
    admin: string;
    logout: string;
    destinations?: string;
    map?: string;
    timeline?: string;
    publications?: string;
  };
  hero: {
    badge: string;
    subtitle: string;
    exploreJourney: string;
    getInTouch: string;
    readBio: string;
    viewGlobe: string;
  };
  stats: {
    title: string;
    subtitle: string;
    liveSimulated: string;
    viewAllMetrics: string;
  };
  destinations: {
    title: string;
    subtitle: string;
    viewAll: string;
    readStory: string;
    viewGallery: string;
    visitedOn: string;
    allCountries: string;
    searchPlaceholder: string;
  };
  globe: {
    title: string;
    subtitle: string;
    rotateHint: string;
    selectedLocation: string;
    visitedDate: string;
    coordinates: string;
    openDestination: string;
    resetView: string;
    autoRotate: string;
    locationsExplored: string;
  };
  map?: any;
  timeline: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterEducation: string;
    filterCareer: string;
    filterTravel: string;
    filterAchievement: string;
    filterScientific: string;
  };
  publications: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    citations: string;
    readPaper: string;
    doi: string;
    journal: string;
  };
  certificates: {
    title: string;
    subtitle: string;
    issuedBy: string;
    viewCredential: string;
    verify: string;
  };
  experience: {
    title: string;
    subtitle: string;
    appointments: string;
    advisory: string;
    fellowships: string;
  };
  contact: {
    title: string;
    subtitle: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    directReach: string;
  };
  footer: {
    rights: string;
    tagline: string;
    quickLinks: string;
    connect: string;
    pages: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  uz: {
    nav: {
      home: 'Bosh sahifa',
      about: 'Haqida',
      travels: 'Sayohatlar',
      globe: '3D Yer Shari',
      journey: 'Faoliyat yo‘li',
      research: 'Ilmiy ishlar',
      certificates: 'Sertifikatlar',
      experience: 'Tajriba',
      audience: 'Auditoriya',
      contact: 'Aloqa',
      admin: 'CMS Portal',
      logout: 'Chiqish',
    },
    hero: {
      badge: 'Rasmiy Shaxsiy Brend Platformasi',
      subtitle: 'Xalqaro tadqiqotchi, sayyoh va intellektual yetakchi. Sivilizatsiyalar, ilm-fan va kelajak innovatsiyalarini bog‘lovchi platforma.',
      exploreJourney: 'Sayohatlar xronikasi',
      getInTouch: 'Muloqot boshlash',
      readBio: 'Batafsil tarjimai hol',
      viewGlobe: '3D Globusni ko‘rish',
    },
    stats: {
      title: 'Xalqaro Natijalar va Qamrov',
      subtitle: 'Xalqaro ekspeditsiyalar, akademik iqtiboslar va global auditoriya ko‘rsatkichlari.',
      liveSimulated: 'Jonli telemetriya faol',
      viewAllMetrics: 'Barcha ko‘rsatkichlar',
    },
    destinations: {
      title: 'Tanlangan Ekspeditsiyalar',
      subtitle: 'Baland tog‘ tadqiqotlari, tarixiy chorrahalar va qit’alar bo‘ylab madaniy sayohatlar kundaligi.',
      viewAll: 'Barcha sayohatlarni ko‘rish',
      readStory: 'Tarixni o‘qish',
      viewGallery: 'Fotogalereya',
      visitedOn: 'Tashrif yili',
      allCountries: 'Barcha davlatlar',
      searchPlaceholder: 'Shahar yoki davlat bo‘yicha izlash...',
    },
    globe: {
      title: 'Interaktiv 3D Yer Shari',
      subtitle: 'Yer sharini aylantiring, nuqtalarni tanlang va xalqaro ekspeditsiyalarni real 3D makonda kashf eting.',
      rotateHint: 'Sichqoncha yoki barmoq bilan 3D sharini aylantiring va yaqinlashtiring',
      selectedLocation: 'Hudud Dosyesi',
      visitedDate: 'Ekspeditsiya sanasi',
      coordinates: 'Geografik koordinatalar',
      openDestination: 'To‘liq ekspeditsiya ocherki',
      resetView: 'Qayta tiklash',
      autoRotate: 'Avtomatik aylanish',
      locationsExplored: 'Kashf etilgan nuqtalar',
    },
    timeline: {
      title: 'Bosib O‘tilgan Yo‘l',
      subtitle: 'Akademik, diplomatik, alpinizm va davlat miqyosidagi asosiy yutuqlar xronologiyasi.',
      filterAll: 'Barcha voqealar',
      filterEducation: 'Ta’lim',
      filterCareer: 'Yetakchilik',
      filterTravel: 'Ekspeditsiyalar',
      filterAchievement: 'Mukofotlar',
      filterScientific: 'Ilmiy faoliyat',
    },
    publications: {
      title: 'Ilmiy Nashrlar va Risolalar',
      subtitle: 'Yevroosiyo tranzit logistikasi, Alp muzliklari gidrologiyasi va raqamli iqtisodiyotga oid nufuzli maqolalar.',
      searchPlaceholder: 'Mavzu, kalit so‘z yoki jurnal nomi bo‘yicha izlash...',
      citations: 'Iqtiboslar',
      readPaper: 'Maqolani o‘qish',
      doi: 'Raqamli identifikator (DOI)',
      journal: 'Jurnal / Nashr',
    },
    certificates: {
      title: 'Diplom va Sertifikatlar',
      subtitle: 'Xalqaro diplomlar, ilmiy akkreditatsiyalar va baland tog‘ xavfsizligi sertifikatlari.',
      issuedBy: 'Bergan tashkilot',
      viewCredential: 'Hujjatni ko‘rish',
      verify: 'Aslligini tekshirish',
    },
    experience: {
      title: 'Kasbiy Tajriba va Maslahatchilik',
      subtitle: 'Akademik tayinlovlar, xalqaro dasturlar rahbarligi va ilmiy hamkorliklar.',
      appointments: 'Akademik lavozimlar',
      advisory: 'Maslahatchilik faoliyati',
      fellowships: 'Xalqaro stipendiyalar',
    },
    contact: {
      title: 'Hamkorlikni Boshlash',
      subtitle: 'Xalqaro anjumanlarda plenar ma’ruza, akademik konsalting, tadqiqot loyihalari va media muloqotlari uchun ochiq.',
      fullName: 'To‘liq ism-sharifingiz',
      email: 'Elektron pochta',
      subject: 'Mavzu yoki yo‘nalish',
      message: 'Xabaringiz yoki taklifingiz matni',
      send: 'Xabarni yuborish',
      sending: 'Yuborilmoqda...',
      successMessage: 'Tashakkur! Xabaringiz muvaffaqiyatli qabul qilindi. Tez orada ko‘rib chiqiladi.',
      errorMessage: 'Xatolik yuz berdi. Maydonlarni tekshirib, qayta urinib ko‘ring.',
      directReach: 'To‘g‘ridan-to‘g‘ri aloqa',
    },
    footer: {
      rights: 'Barcha huquqlar himoyalangan.',
      tagline: 'Qadimiy Ufqlar va Ertangi Innovatsiyalar Ko‘prigi.',
      quickLinks: 'Bo‘limlar',
      connect: 'Ijtimoiy tarmoqlar',
      pages: 'Sahifalar',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      travels: 'Expeditions',
      globe: '3D Globe',
      journey: 'Journey',
      research: 'Research',
      certificates: 'Credentials',
      experience: 'Experience',
      audience: 'Audience',
      contact: 'Contact',
      admin: 'CMS Portal',
      logout: 'Sign Out',
    },
    hero: {
      badge: 'Official Personal Brand Platform',
      subtitle: 'International explorer, academic researcher, and youth leadership advocate connecting civilizations, science, and the future.',
      exploreJourney: 'Explore Expeditions',
      getInTouch: 'Initiate Dialogue',
      readBio: 'Full Biography',
      viewGlobe: 'Explore 3D Earth',
    },
    stats: {
      title: 'Global Reach & Empirical Milestones',
      subtitle: 'Key data from international expeditions, academic citations, and worldwide readership.',
      liveSimulated: 'Live Telemetry Active',
      viewAllMetrics: 'View All Telemetry',
    },
    destinations: {
      title: 'Curated Expeditions',
      subtitle: 'High-altitude research treks, historical crossroads, and cultural chronicles across continents.',
      viewAll: 'View All Expeditions',
      readStory: 'Read Chronicle',
      viewGallery: 'Visual Gallery',
      visitedOn: 'Explored on',
      allCountries: 'All Nations',
      searchPlaceholder: 'Search by city or country...',
    },
    globe: {
      title: 'Interactive 3D Earth Globe',
      subtitle: 'Rotate, zoom, and inspect geo-located research waypoints across the globe.',
      rotateHint: 'Drag to rotate, pinch or scroll to zoom in/out',
      selectedLocation: 'Territory Dossier',
      visitedDate: 'Date of Expedition',
      coordinates: 'Geographic Coordinates',
      openDestination: 'Open Detailed Chronicle',
      resetView: 'Reset View',
      autoRotate: 'Auto-Rotate',
      locationsExplored: 'Waypoints Mapped',
    },
    timeline: {
      title: 'The Journey Timeline',
      subtitle: 'Chronicle of major academic, diplomatic, mountaineering, and institutional milestones.',
      filterAll: 'All Milestones',
      filterEducation: 'Education',
      filterCareer: 'Leadership',
      filterTravel: 'Expeditions',
      filterAchievement: 'Honors',
      filterScientific: 'Scientific',
    },
    publications: {
      title: 'Scientific Publications',
      subtitle: 'Peer-reviewed research on Eurasian transit logistics, alpine glaciology, and urban knowledge economies.',
      searchPlaceholder: 'Search by title, author, or journal...',
      citations: 'Citations',
      readPaper: 'Access Research',
      doi: 'Digital Object Identifier (DOI)',
      journal: 'Journal / Series',
    },
    certificates: {
      title: 'Credentials & Certifications',
      subtitle: 'International diplomas, scientific accreditations, and high-altitude safety certifications.',
      issuedBy: 'Conferred by',
      viewCredential: 'Open Credential',
      verify: 'Verify Record',
    },
    experience: {
      title: 'Professional Experience & Advisory',
      subtitle: 'Academic appointments, international project directorships, and scholarly advisory councils.',
      appointments: 'Academic Appointments',
      advisory: 'Advisory Roles',
      fellowships: 'Research Fellowships',
    },
    contact: {
      title: 'Initiate Collaboration',
      subtitle: 'Available for international keynote speaking, academic consulting, research partnerships, and media inquiries.',
      fullName: 'Full Name',
      email: 'Email Address',
      subject: 'Inquiry Category',
      message: 'Brief Your Proposal or Message',
      send: 'Transmit Message',
      sending: 'Transmitting Securely...',
      successMessage: 'Thank you. Your message has been safely received. Ashraf will review your dispatch.',
      errorMessage: 'Could not transmit your message. Please verify fields and try again.',
      directReach: 'Direct Coordinates',
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: 'Bridging Ancient Horizons & Tomorrow’s Innovation.',
      quickLinks: 'Navigation',
      connect: 'Official Channels',
      pages: 'Independent Pages',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'Обо мне',
      travels: 'Экспедиции',
      globe: '3D Глобус',
      journey: 'Хронология',
      research: 'Публикации',
      certificates: 'Сертификаты',
      experience: 'Опыт',
      audience: 'Аудитория',
      contact: 'Контакты',
      admin: 'Панель CMS',
      logout: 'Выйти',
    },
    hero: {
      badge: 'Официальная персональная платформа',
      subtitle: 'Международный исследователь, путешественник и общественный деятель, объединяющий цивилизации, науку и будущее.',
      exploreJourney: 'Исследовать экспедиции',
      getInTouch: 'Связаться со мной',
      readBio: 'Полная биография',
      viewGlobe: 'Исследовать 3D Глобус',
    },
    stats: {
      title: 'Глобальный Охват и Метрики',
      subtitle: 'Ключевые показатели международных исследований, академических цитирований и аудитории.',
      liveSimulated: 'Живая телеметрия активна',
      viewAllMetrics: 'Все показатели',
    },
    destinations: {
      title: 'Избранные Экспедиции',
      subtitle: 'Высокогорные треки, исторические перекрестки и путевые очерки с разных континентов.',
      viewAll: 'Все экспедиции',
      readStory: 'Читать очерк',
      viewGallery: 'Галерея',
      visitedOn: 'Экспедиция состоялась в',
      allCountries: 'Все регионы',
      searchPlaceholder: 'Поиск по городу или стране...',
    },
    globe: {
      title: 'Интерактивный 3D Глобус Земли',
      subtitle: 'Вращайте глобус, приближайте и исследуйте географические точки экспедиций.',
      rotateHint: 'Вращайте мышью или жестом, масштабируйте колесиком',
      selectedLocation: 'Досье территории',
      visitedDate: 'Дата экспедиции',
      coordinates: 'Географические координаты',
      openDestination: 'Открыть подробный очерк',
      resetView: 'Сбросить вид',
      autoRotate: 'Авто-вращение',
      locationsExplored: 'Исследованные точки',
    },
    timeline: {
      title: 'Хроника Пути',
      subtitle: 'Летопись академических, дипломатических, экспедиционных и общественных вех.',
      filterAll: 'Все события',
      filterEducation: 'Образование',
      filterCareer: 'Лидерство',
      filterTravel: 'Экспедиции',
      filterAchievement: 'Награды',
      filterScientific: 'Наука',
    },
    publications: {
      title: 'Научные Публикации',
      subtitle: 'Рецензируемые исследования по логистике Евразии, альпийской гляциологии и экономике знаний.',
      searchPlaceholder: 'Поиск по теме, автору или журналу...',
      citations: 'Цитирований',
      readPaper: 'Открыть статью',
      doi: 'Идентификатор DOI',
      journal: 'Журнал / Издание',
    },
    certificates: {
      title: 'Квалификации и Сертификаты',
      subtitle: 'Международные дипломы, научные аккредитации и сертификаты безопасности в горах.',
      issuedBy: 'Кем выдано',
      viewCredential: 'Посмотреть документ',
      verify: 'Проверить подлинность',
    },
    experience: {
      title: 'Профессиональный Опыт и Консалтинг',
      subtitle: 'Академические назначения, руководство проектами и научно-консультационная деятельность.',
      appointments: 'Академические назначения',
      advisory: 'Консультационная деятельность',
      fellowships: 'Научные стипендии',
    },
    contact: {
      title: 'Начать Сотрудничество',
      subtitle: 'Открыт для международных выступлений, академического консалтинга, исследовательских партнерств и прессы.',
      fullName: 'Ваше имя',
      email: 'Электронная почта',
      subject: 'Тема обращения',
      message: 'Текст сообщения или предложения',
      send: 'Отправить сообщение',
      sending: 'Отправка...',
      successMessage: 'Спасибо! Ваше обращение успешно доставлено. Ашраф ознакомится с ним в ближайшее время.',
      errorMessage: 'Не удалось отправить сообщение. Пожалуйста, проверьте поля и повторите.',
      directReach: 'Прямые контакты',
    },
    footer: {
      rights: 'Все права защищены.',
      tagline: 'Мост между древним наследием и инновациями завтрашнего дня.',
      quickLinks: 'Разделы',
      connect: 'Социальные сети',
      pages: 'Страницы сайта',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımda',
      travels: 'Keşifler',
      globe: '3D Küre',
      journey: 'Zaman Çizelgesi',
      research: 'Yayınlar',
      certificates: 'Sertifikalar',
      experience: 'Deneyim',
      audience: 'Kitle',
      contact: 'İletişim',
      admin: 'CMS Paneli',
      logout: 'Çıkış Yap',
    },
    hero: {
      badge: 'Resmi Kişisel Marka Platformu',
      subtitle: 'Medeniyetleri, bilimi ve geleceği bir araya getiren uluslararası kâşif, araştırmacı ve gençlik lideri.',
      exploreJourney: 'Keşif Günlükleri',
      getInTouch: 'İletişime Geçin',
      readBio: 'Kapsamlı Biyografi',
      viewGlobe: '3D Küreyi Keşfedin',
    },
    stats: {
      title: 'Küresel Etki ve Göstergeler',
      subtitle: 'Uluslararası seferler, akademik atıflar ve küresel okuyucu kitlesinden önemli kilometre taşları.',
      liveSimulated: 'Canlı Telemetri Aktif',
      viewAllMetrics: 'Tüm Göstergeler',
    },
    destinations: {
      title: 'Öne Çıkan Keşifler',
      subtitle: 'Yüksek irtifa araştırma rotaları, tarihi kavşaklar ve kıtalararası kültürel seyahat günlükleri.',
      viewAll: 'Tüm Keşifleri İncele',
      readStory: 'Hikayeyi Oku',
      viewGallery: 'Görsel Galeri',
      visitedOn: 'Ziyaret Yılı',
      allCountries: 'Tüm Ülkeler',
      searchPlaceholder: 'Şehir veya ülke adına göre ara...',
    },
    globe: {
      title: 'İnteraktif 3D Dünya Küresi',
      subtitle: 'Dünya küresini döndürün, yakınlaştırın ve coğrafi keşif rotalarını 3D uzayda inceleyin.',
      rotateHint: 'Döndürmek için sürükleyin, yakınlaştırmak için tekerleği kullanın',
      selectedLocation: 'Bölge Dosyası',
      visitedDate: 'Keşif Tarihi',
      coordinates: 'Coğrafi Koordinatlar',
      openDestination: 'Detaylı Keşif Hikayesi',
      resetView: 'Sıfırla',
      autoRotate: 'Otomatik Döndür',
      locationsExplored: 'Haritalanan Noktalar',
    },
    timeline: {
      title: 'Yolculuk Kronolojisi',
      subtitle: 'Akademik, diplomatik, dağcılık ve kurumsal başarıların kronolojik dökümü.',
      filterAll: 'Tüm Olaylar',
      filterEducation: 'Eğitim',
      filterCareer: 'Liderlik',
      filterTravel: 'Keşifler',
      filterAchievement: 'Ödüller',
      filterScientific: 'Bilim',
    },
    publications: {
      title: 'Bilimsel Yayınlar',
      subtitle: 'Avrasya transit lojistiği, buzul hidrolojisi ve kentsel bilgi ekonomileri üzerine hakemli makaleler.',
      searchPlaceholder: 'Konu, anahtar kelime veya dergiye göre ara...',
      citations: 'Atıf Sayısı',
      readPaper: 'Çalışmayı İncele',
      doi: 'Dijital Nesne Tanımlayıcı (DOI)',
      journal: 'Dergi / Dizi',
    },
    certificates: {
      title: 'Yetkinlikler ve Sertifikalar',
      subtitle: 'Uluslararası diplomalar, akademik akreditasyonlar ve yüksek irtifa güvenlik sertifikaları.',
      issuedBy: 'Veren Kurum',
      viewCredential: 'Belgeyi Aç',
      verify: 'Doğrula',
    },
    experience: {
      title: 'Mesleki Deneyim ve Danışmanlık',
      subtitle: 'Akademik görevler, uluslararası proje liderlikleri ve bilimsel danışma kurulları.',
      appointments: 'Akademik Görevler',
      advisory: 'Danışmanlık Rolleri',
      fellowships: 'Araştırma Bursları',
    },
    contact: {
      title: 'İş Birliği Başlatın',
      subtitle: 'Uluslararası açılış konuşmaları, akademik danışmanlık, araştırma ortaklıkları ve medya talepleri için iletişime geçebilirsiniz.',
      fullName: 'Adınız Soyadınız',
      email: 'E-posta Adresiniz',
      subject: 'Konu Başlığı',
      message: 'Mesajınız veya Teklifiniz',
      send: 'Mesajı İlet',
      sending: 'İletiliyor...',
      successMessage: 'Teşekkürler. Mesajınız başarıyla iletildi. Ashraf en kısa sürede dönüş yapacaktır.',
      errorMessage: 'Mesaj iletilemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.',
      directReach: 'Doğrudan İletişim',
    },
    footer: {
      rights: 'Tüm hakları saklıdır.',
      tagline: 'Antik Ufuklar ile Geleceğin İnovasyonu Arasındaki Köprü.',
      quickLinks: 'Bölümler',
      connect: 'Sosyal Ağlar',
      pages: 'Sayfalar',
    },
  },
};
