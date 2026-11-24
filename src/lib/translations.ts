export type Language = 'en' | 'uz' | 'ru' | 'tr';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    destinations: string;
    map: string;
    timeline: string;
    publications: string;
    certificates: string;
    contact: string;
    admin: string;
    logout: string;
  };
  hero: {
    badge: string;
    subtitle: string;
    exploreJourney: string;
    getInTouch: string;
    readBio: string;
  };
  stats: {
    title: string;
    subtitle: string;
    liveSimulated: string;
  };
  destinations: {
    title: string;
    subtitle: string;
    viewAll: string;
    readStory: string;
    viewGallery: string;
    visitedOn: string;
    allCountries: string;
  };
  map: {
    title: string;
    subtitle: string;
    hint: string;
    selectedCountry: string;
    visitedYear: string;
    notes: string;
    countriesVisitedCount: string;
  };
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
  };
  admin: {
    dashboard: string;
    destinations: string;
    mapCountries: string;
    timeline: string;
    certificates: string;
    publications: string;
    audienceCounter: string;
    messages: string;
    settings: string;
    loginTitle: string;
    loginSubtitle: string;
    signIn: string;
    email: string;
    password: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      destinations: 'Destinations',
      map: 'World Map',
      timeline: 'Journey',
      publications: 'Research',
      certificates: 'Credentials',
      contact: 'Contact',
      admin: 'CMS Portal',
      logout: 'Sign Out',
    },
    hero: {
      badge: 'Official Personal Brand Platform',
      subtitle: 'International explorer, academic researcher, and youth leadership advocate connecting civilizations, science, and the future.',
      exploreJourney: 'Explore My Journey',
      getInTouch: 'Initiate Dialogue',
      readBio: 'Read Biography',
    },
    stats: {
      title: 'Global Impact & Reach',
      subtitle: 'Empirical milestones from international expeditions, academic citations, and worldwide audience engagement.',
      liveSimulated: 'Live Telemetry Active',
    },
    destinations: {
      title: 'Curated Expeditions',
      subtitle: 'High-altitude research treks, historical crossroads, and cultural chronicles from across continents.',
      viewAll: 'Explore All Destinations',
      readStory: 'Read Chronicle',
      viewGallery: 'Visual Gallery',
      visitedOn: 'Explored in',
      allCountries: 'All Regions',
    },
    map: {
      title: 'Interactive Global Footprint',
      subtitle: 'Click or hover over highlighted countries to inspect research records, field notes, and expedition dates.',
      hint: 'Select a highlighted territory to view field documentation',
      selectedCountry: 'Territory Dossier',
      visitedYear: 'Year of Expedition',
      notes: 'Expedition Summary',
      countriesVisitedCount: 'Sovereign Territories Explored',
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
      searchPlaceholder: 'Search by topic, keyword, or journal...',
      citations: 'Citations',
      readPaper: 'Access Research',
      doi: 'Digital Object Identifier',
      journal: 'Journal / Series',
    },
    certificates: {
      title: 'Credentials & Certifications',
      subtitle: 'International diplomas, scientific accreditations, and high-altitude safety certifications.',
      issuedBy: 'Conferred by',
      viewCredential: 'Open Credential',
      verify: 'Verify Issuer Record',
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
    },
    admin: {
      dashboard: 'Executive Dashboard',
      destinations: 'Destinations Manager',
      mapCountries: 'World Map Territories',
      timeline: 'Journey Events',
      certificates: 'Credentials Vault',
      publications: 'Research Papers',
      audienceCounter: 'Telemetry & Counters',
      messages: 'Inbound Dispatches',
      settings: 'Platform Settings',
      loginTitle: 'Security Authentication',
      loginSubtitle: 'Restricted administrative portal for Ashraf Turdialiyev platform.',
      signIn: 'Authenticate & Enter',
      email: 'Administrative Email',
      password: 'Security Passphrase',
    },
  },
  uz: {
    nav: {
      home: 'Bosh sahifa',
      about: 'Haqida',
      destinations: 'Sayohatlar',
      map: 'Dunyo xaritasi',
      timeline: 'Faoliyat yo‘li',
      publications: 'Ilmiy ishlar',
      certificates: 'Sertifikatlar',
      contact: 'Aloqa',
      admin: 'Boshqaruv (CMS)',
      logout: 'Chiqish',
    },
    hero: {
      badge: 'Rasmiy Shaxsiy Brend Platformasi',
      subtitle: 'Xalqaro tadqiqotchi, sayyoh va yoshlar intellektual yetakchisi. Madaniyatlar, ilm-fan va kelajakni o‘zaro bog‘lovchi platforma.',
      exploreJourney: 'Sayohatlarimni kashf eting',
      getInTouch: 'Muloqot boshlash',
      readBio: 'Tarjimai hol',
    },
    stats: {
      title: 'Xalqaro Natijalar va Qamrov',
      subtitle: 'Xalqaro ekspeditsiyalar, ilmiy iqtiboslar va global auditoriya ko‘rsatkichlari.',
      liveSimulated: 'Jonli telemetriya faol',
    },
    destinations: {
      title: 'Tanlangan Ekspeditsiyalar',
      subtitle: 'Baland tog‘ tadqiqotlari, tarixiy chorrahalar va qit’alar bo‘ylab madaniy sayohatlar kundaligi.',
      viewAll: 'Barcha manzillarni ko‘rish',
      readStory: 'Tarixni o‘qish',
      viewGallery: 'Fotogalereya',
      visitedOn: 'Tashrif yili',
      allCountries: 'Barcha hududlar',
    },
    map: {
      title: 'Interaktiv Dunyo Xaritasi',
      subtitle: 'Tadqiqot yozuvlari, ekspeditsiya sanalari va xotiralarni ko‘rish uchun belgilangan davlatlarni tanlang.',
      hint: 'Dala hujjatlarini ko‘rish uchun xaritadagi davlatni bosing',
      selectedCountry: 'Davlat dosyesi',
      visitedYear: 'Ekspeditsiya yili',
      notes: 'Ekspeditsiya xulosasi',
      countriesVisitedCount: 'Tashrif buyurilgan davlatlar',
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
      title: 'Ilmiy Nashrlar',
      subtitle: 'Yevroosiyo tranzit logistikasi, Alp muzliklari gidrologiyasi va raqamli iqtisodiyotga oid nufuzli maqolalar.',
      searchPlaceholder: 'Mavzu, kalit so‘z yoki jurnal nomi bo‘yicha izlash...',
      citations: 'Iqtiboslar',
      readPaper: 'Maqolani o‘qish',
      doi: 'Raqamli identifikator (DOI)',
      journal: 'Jurnal / To‘plam',
    },
    certificates: {
      title: 'Diplom va Sertifikatlar',
      subtitle: 'Xalqaro diplomlar, ilmiy akkreditatsiyalar va baland tog‘ xavfsizligi sertifikatlari.',
      issuedBy: 'Bergan tashkilot',
      viewCredential: 'Hujjatni ko‘rish',
      verify: 'Aslligini tekshirish',
    },
    contact: {
      title: 'Hamkorlikni Boshlash',
      subtitle: 'Xalqaro konferensiyalarda ma’ruza, ilmiy konsalting, tadqiqot loyihalari va media muloqotlari uchun ochiq.',
      fullName: 'To‘liq ism-sharifingiz',
      email: 'Elektron pochta',
      subject: 'Mavzu yoki yo‘nalish',
      message: 'Xabaringiz yoki taklifingiz matni',
      send: 'Xabarni yuborish',
      sending: 'Yuborilmoqda...',
      successMessage: 'Tashakkur! Xabaringiz muvaffaqiyatli qabul qilindi. Tez orada ko‘rib chiqiladi.',
      errorMessage: 'Xatolik yuz berdi. Maydonlarni tekshirib, qayta urinib ko‘ring.',
      directReach: 'Aloqa ma’lumotlari',
    },
    footer: {
      rights: 'Barcha huquqlar himoyalangan.',
      tagline: 'Qadimiy Ufqlar va Ertangi Innovatsiyalar Ko‘prigi.',
      quickLinks: 'Bo‘limlar',
      connect: 'Ijtimoiy tarmoqlar',
    },
    admin: {
      dashboard: 'Boshqaruv paneli',
      destinations: 'Sayohatlar boshqaruvi',
      mapCountries: 'Xarita hududlari',
      timeline: 'Faoliyat xronologiyasi',
      certificates: 'Sertifikatlar ombori',
      publications: 'Ilmiy maqolalar',
      audienceCounter: 'Auditoriya hisoblagichlari',
      messages: 'Kelgan xabarlar',
      settings: 'Sayt sozlamalari',
      loginTitle: 'Tizimga Kirish',
      loginSubtitle: 'Ashraf Turdialiyev platformasi ma’muriy boshqaruv qismi.',
      signIn: 'Tizimga kirish',
      email: 'Admin elektron pochtasi',
      password: 'Maxfiy kalit so‘z',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'Обо мне',
      destinations: 'Экспедиции',
      map: 'Карта мира',
      timeline: 'Хронология',
      publications: 'Публикации',
      certificates: 'Сертификаты',
      contact: 'Контакты',
      admin: 'Панель CMS',
      logout: 'Выйти',
    },
    hero: {
      badge: 'Официальная персональная платформа',
      subtitle: 'Международный исследователь, путешественник и общественный деятель, объединяющий цивилизации, науку и будущее.',
      exploreJourney: 'Исследовать экспедиции',
      getInTouch: 'Связаться со мной',
      readBio: 'Биография',
    },
    stats: {
      title: 'Глобальный Охват и Влияние',
      subtitle: 'Ключевые показатели международных исследований, академических цитирований и аудитории.',
      liveSimulated: 'Живая телеметрия активна',
    },
    destinations: {
      title: 'Избранные Экспедиции',
      subtitle: 'Высокогорные треки, исторические перекрестки и путевые заметки с разных континентов.',
      viewAll: 'Все направления',
      readStory: 'Читать очерк',
      viewGallery: 'Галерея',
      visitedOn: 'Экспедиция состоялась в',
      allCountries: 'Все регионы',
    },
    map: {
      title: 'Интерактивная Карта Мира',
      subtitle: 'Нажмите на выделенную страну, чтобы изучить научные отчеты, путевые заметки и даты экспедиций.',
      hint: 'Выберите отмеченную страну для просмотра полевых данных',
      selectedCountry: 'Досье территории',
      visitedYear: 'Год экспедиции',
      notes: 'Резюме экспедиции',
      countriesVisitedCount: 'Посещенные суверенные государства',
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
    },
    admin: {
      dashboard: 'Панель управления',
      destinations: 'Управление экспедициями',
      mapCountries: 'Страны на карте',
      timeline: 'События хронологии',
      certificates: 'Реестр сертификатов',
      publications: 'Научные статьи',
      audienceCounter: 'Счетчики и телеметрия',
      messages: 'Входящие сообщения',
      settings: 'Настройки платформы',
      loginTitle: 'Авторизация в CMS',
      loginSubtitle: 'Закрытый портал администрирования платформы Ашрафа Турдиалиева.',
      signIn: 'Войти в панель',
      email: 'Email администратора',
      password: 'Пароль доступа',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımda',
      destinations: 'Keşifler',
      map: 'Dünya Haritası',
      timeline: 'Zaman Çizelgesi',
      publications: 'Yayınlar',
      certificates: 'Sertifikalar',
      contact: 'İletişim',
      admin: 'CMS Paneli',
      logout: 'Çıkış Yap',
    },
    hero: {
      badge: 'Resmi Kişisel Marka Platformu',
      subtitle: 'Medeniyetleri, bilimi ve geleceği bir araya getiren uluslararası kâşif, araştırmacı ve gençlik lideri.',
      exploreJourney: 'Yolculuğumu Keşfedin',
      getInTouch: 'İletişime Geçin',
      readBio: 'Biyografi',
    },
    stats: {
      title: 'Küresel Etki ve Erişim',
      subtitle: 'Uluslararası seferler, akademik atıflar ve küresel okuyucu kitlesinden önemli kilometre taşları.',
      liveSimulated: 'Canlı Telemetri Aktif',
    },
    destinations: {
      title: 'Öne Çıkan Keşifler',
      subtitle: 'Yüksek irtifa araştırma rotaları, tarihi kavşaklar ve kıtalararası kültürel seyahat günlükleri.',
      viewAll: 'Tüm Rotaları İncele',
      readStory: 'Hikayeyi Oku',
      viewGallery: 'Görsel Galeri',
      visitedOn: 'Ziyaret Yılı',
      allCountries: 'Tüm Bölgeler',
    },
    map: {
      title: 'İnteraktif Dünya Haritası',
      subtitle: 'Araştırma kayıtlarını, saha notlarını ve keşif tarihlerini incelemek için işaretli ülkeleri seçin.',
      hint: 'Saha belgelerini görüntülemek için haritadan bir ülke seçin',
      selectedCountry: 'Bölge Dosyası',
      visitedYear: 'Keşif Yılı',
      notes: 'Keşif Özeti',
      countriesVisitedCount: 'Ziyaret Edilen Ülke Sayısı',
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
    },
    admin: {
      dashboard: 'Yönetim Paneli',
      destinations: 'Keşif Rotaları Yönetimi',
      mapCountries: 'Harita Ülkeleri',
      timeline: 'Zaman Çizelgesi Olayları',
      certificates: 'Sertifika Kasası',
      publications: 'Akademik Makaleler',
      audienceCounter: 'Sayaçlar ve Telemetri',
      messages: 'Gelen Bildirimler',
      settings: 'Site Ayarları',
      loginTitle: 'Güvenli Yönetici Girişi',
      loginSubtitle: 'Ashraf Turdialiyev platformu kapalı yönetim paneli.',
      signIn: 'Giriş Yap',
      email: 'Yönetici E-postası',
      password: 'Güvenlik Parolası',
    },
  },
};
