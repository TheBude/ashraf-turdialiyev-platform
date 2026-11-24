const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Database Seeding ---');

  // 1. Create Default Admin User
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'AshrafAdmin2026!Secure';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@ashrafturdialiyev.com';

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: 'Ashraf Turdialiyev' },
    create: {
      email: adminEmail,
      name: 'Ashraf Turdialiyev',
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`Admin user created/verified: ${admin.email}`);

  // 2. Visited Countries for Interactive World Map
  const countries = [
    {
      isoCode: 'UZ',
      countryName: 'Uzbekistan',
      countryNameUz: "O'zbekiston",
      countryNameRu: 'Узбекистан',
      countryNameTr: 'Özbekistan',
      visitedYear: 2018,
      notes: 'Homeland, heart of the ancient Silk Road and scientific renaissance.',
      flag: '🇺🇿',
      coordinates: '41.3775,64.5853',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'TR',
      countryName: 'Turkey',
      countryNameUz: 'Turkiya',
      countryNameRu: 'Турция',
      countryNameTr: 'Türkiye',
      visitedYear: 2021,
      notes: 'Historical bridge between continents. Cappadocia and Istanbul research expeditions.',
      flag: '🇹🇷',
      coordinates: '38.9637,35.2433',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'CH',
      countryName: 'Switzerland',
      countryNameUz: 'Shveysariya',
      countryNameRu: 'Швейцария',
      countryNameTr: 'İsviçre',
      visitedYear: 2023,
      notes: 'Alpine glacier climate studies and UN international relations summits.',
      flag: '🇨🇭',
      coordinates: '46.8182,8.2275',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'JP',
      countryName: 'Japan',
      countryNameUz: 'Yaponiya',
      countryNameRu: 'Япония',
      countryNameTr: 'Japonya',
      visitedYear: 2024,
      notes: 'Advanced technology hubs, Kyoto cultural preservation, and university symposium.',
      flag: '🇯🇵',
      coordinates: '36.2048,138.2529',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'EG',
      countryName: 'Egypt',
      countryNameUz: 'Misr',
      countryNameRu: 'Египет',
      countryNameTr: 'Mısır',
      visitedYear: 2022,
      notes: 'Alexandria library archives and Nile civilizational heritage studies.',
      flag: '🇪🇬',
      coordinates: '26.8206,30.8025',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'DE',
      countryName: 'Germany',
      countryNameUz: 'Germaniya',
      countryNameRu: 'Германия',
      countryNameTr: 'Almanya',
      visitedYear: 2022,
      notes: 'Heidelberg & Berlin research conferences on sustainable governance.',
      flag: '🇩🇪',
      coordinates: '51.1657,10.4515',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'AE',
      countryName: 'United Arab Emirates',
      countryNameUz: 'Birlashgan Arab Amirliklari',
      countryNameRu: 'ОАЭ',
      countryNameTr: 'Birleşik Arap Emirlikleri',
      visitedYear: 2023,
      notes: 'Global Future Energy Summit and Middle East economic forum.',
      flag: '🇦🇪',
      coordinates: '23.4241,53.8478',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'KZ',
      countryName: 'Kazakhstan',
      countryNameUz: 'Qozogʻiston',
      countryNameRu: 'Казахстан',
      countryNameTr: 'Kazakistan',
      visitedYear: 2020,
      notes: 'Tien Shan mountain exploration and Central Asian academic network.',
      flag: '🇰🇿',
      coordinates: '48.0196,66.9237',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'KR',
      countryName: 'South Korea',
      countryNameUz: 'Janubiy Koreya',
      countryNameRu: 'Южная Корея',
      countryNameTr: 'Güney Kore',
      visitedYear: 2023,
      notes: 'Seoul Innovation Forum and Smart City infrastructure workshops.',
      flag: '🇰🇷',
      coordinates: '35.9078,127.7669',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'GB',
      countryName: 'United Kingdom',
      countryNameUz: 'Buyuk Britaniya',
      countryNameRu: 'Великобритания',
      countryNameTr: 'Birleşik Krallık',
      visitedYear: 2024,
      notes: 'Oxford academic lecture and British Library manuscript investigation.',
      flag: '🇬🇧',
      coordinates: '55.3781,-3.4360',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'US',
      countryName: 'United States',
      countryNameUz: 'AQSH',
      countryNameRu: 'США',
      countryNameTr: 'Amerika Birleşik Devletleri',
      visitedYear: 2023,
      notes: 'Washington DC policy panel and California technology ecosystem study.',
      flag: '🇺🇸',
      coordinates: '37.0902,-95.7129',
      highlightColor: '#d4af37',
    },
    {
      isoCode: 'IT',
      countryName: 'Italy',
      countryNameUz: 'Italiya',
      countryNameRu: 'Италия',
      countryNameTr: 'İtalya',
      visitedYear: 2024,
      notes: 'Venice Biennale architectural history and Rome archaeological study.',
      flag: '🇮🇹',
      coordinates: '41.8719,12.5674',
      highlightColor: '#d4af37',
    },
  ];

  for (const c of countries) {
    await prisma.visitedCountry.upsert({
      where: { isoCode: c.isoCode },
      update: c,
      create: c,
    });
  }
  console.log(`Visited countries seeded: ${countries.length}`);

  // 3. Travel Destinations
  const destinations = [
    {
      slug: 'samarkand-silk-road-renaissance',
      title: 'Samarkand: Heart of the Great Silk Road',
      titleUz: "Samarqand: Buyuk Ipak Yo'lining yuragi",
      titleRu: 'Самарканд: Сердце Великого шелкового пути',
      titleTr: 'Semerkant: İpek Yolu’nun Kalbi',
      country: 'Uzbekistan',
      countryCode: 'UZ',
      city: 'Samarkand',
      coordinates: '39.6542,66.9597',
      description: 'An architectural and scholarly wonderland where Ulugbek mapped the stars and ancient caravans met.',
      descriptionUz: "Ulug'bek yulduzlarni xaritaga tushirgan va qadimiy karvonlar tutashgan ilmiy va me'moriy mo''jiza.",
      descriptionRu: 'Архитектурное и научное чудо, где Улугбек исследовал звезды и сходились торговые пути.',
      descriptionTr: 'Uluğ Bey’in yıldızları haritalandırdığı, antik kervanların buluştuğu mimarlık ve ilim harikası.',
      story: 'Walking through Registan Square at twilight reveals how civilization preserved geometry, poetry, and celestial astronomy in monumental azure tilework. Our expedition focused on cataloging historical manuscripts and connecting regional youth with their scientific heritage.',
      storyUz: "Registon maydonida oqshom payti sayr qilish insoniyat sivilizatsiyasi ko'k koshinlarga qanday qilib geometriya, she'riyat va falakiyot ilmini muhrlaganini namoyon etadi. Ekspeditsiyamiz qadimiy qo'lyozmalarni o'rganish va yoshlarni o'z ilmiy ildizlari bilan bog'lashga qaratildi.",
      storyRu: 'Прогулка по площади Регистан в сумерках открывает, как цивилизация запечатлела геометрию, поэзию и астрономию в лазурной мозаике. Экспедиция была посвящена изучению древних рукописей.',
      storyTr: 'Registan Meydanında alacakaranlıkta yürümek, medeniyetin geometri ve astronomiyi çinilere nasıl nakşettiğini gösteriyor.',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1596484552829-9e8c07c29377?q=80&w=1200',
        'https://images.unsplash.com/photo-1596484552994-e8e6e5898d97?q=80&w=1200',
      ]),
      status: 'PUBLISHED',
      featured: true,
      visitedAt: new Date('2024-05-12'),
    },
    {
      slug: 'cappadocia-valleys-expedition',
      title: 'Cappadocia: Valleys of Wind and Stone',
      titleUz: 'Kappadokiya: Shamol va tosh vodiylari',
      titleRu: 'Каппадокия: Долины ветра и камня',
      titleTr: 'Kapadokya: Rüzgar ve Taş Vadileri',
      country: 'Turkey',
      countryCode: 'TR',
      city: 'Göreme',
      coordinates: '38.6431,34.8289',
      description: 'Ancient subterranean sanctuaries, fairy chimneys, and sunrise stratospheric perspectives.',
      descriptionUz: "Qadimiy yer osti ziyoratgohlari, g'aroyib qoyatoshlar va havo sharlarida quyosh chiqishini kuzatish.",
      descriptionRu: 'Древние подземные святилища, скальные образования и рассветы с высоты полета шаров.',
      descriptionTr: 'Antik yeraltı sığınakları, peri bacaları ve sıcak hava balonuyla gün doğumu perspektifleri.',
      story: 'Ascending over the Göreme valley at dawn provides an unparalleled perspective on erosion, geology, and early monastic communities carved into tuff stone.',
      storyUz: "Tong saharda Göreme vodiysi uzra osmonga ko'tarilish geologik o'zgarishlar va tosh ichiga o'yilgan qadimiy jamoalar tarixini mislsiz rakursdan ko'rsatadi.",
      storyRu: 'Подъем над долиной Гёреме на рассвете дает уникальный взгляд на геологическую эрозию и историю скальных поселений.',
      storyTr: 'Göreme vadisi üzerinde şafak vakti yükselmek, rüzgar erozyonunun ve kaya yerleşimlerinin büyüsünü sunar.',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
        'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1200',
      ]),
      status: 'PUBLISHED',
      featured: true,
      visitedAt: new Date('2023-09-20'),
    },
    {
      slug: 'swiss-alps-matterhorn-ridge',
      title: 'Zermatt & Matterhorn: Alpine Glacier Research',
      titleUz: 'Zermatt va Matterhorn: Alp muzliklari tadqiqoti',
      titleRu: 'Церматт и Маттерхорн: Исследование альпийских ледников',
      titleTr: 'Zermatt ve Matterhorn: Alp Buzul Araştırması',
      country: 'Switzerland',
      countryCode: 'CH',
      city: 'Zermatt',
      coordinates: '45.9763,7.7491',
      description: 'Climbing to high alpine ridges to document environmental conservation and glacial retreat.',
      descriptionUz: "Atrof-muhitni muhofaza qilish va muzliklar dinamikasini hujjatlashtirish uchun baland Alp tog'lariga ko'tarilish.",
      descriptionRu: 'Восхождение на альпийские хребты для изучения экологической динамики и состояния ледников.',
      descriptionTr: 'Çevre koruma ve buzul erimelerini incelemek için yüksek Alp sırtlarına tırmanış.',
      story: 'Facing the majestic pyramid of the Matterhorn in sub-zero winds teaches resilience. The data gathered contributed to our comparative study on Central Asian and European alpine ecosystems.',
      storyUz: "Noldan past haroratda viqorli Matterhorn cho'qqisi bilan yuzlashish sabr-matonatga o'rgatadi. To'plangan ma'lumotlar Markaziy Osiyo va Yevropa tog' ekotizimlari qiyosiy tahliliga asos bo'ldi.",
      storyRu: 'Встреча с пирамидой Маттерхорна учит стойкости. Собранные данные легли в основу исследований горных экосистем.',
      storyTr: 'Matterhorn’un görkemi karşısında soğuğa direnmek azim kazandırır. Toplanan veriler ekoloji araştırmamıza katkı sağladı.',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200',
      ]),
      status: 'PUBLISHED',
      featured: true,
      visitedAt: new Date('2024-02-14'),
    },
    {
      slug: 'tokyo-kyoto-dialogue',
      title: 'Kyoto to Tokyo: Synthesis of Epochs',
      titleUz: 'Kioto va Tokio: Davrlar sintezi',
      titleRu: 'Киото и Токио: Синтез эпох',
      titleTr: 'Kyoto ve Tokyo: Çağların Sentezi',
      country: 'Japan',
      countryCode: 'JP',
      city: 'Tokyo / Kyoto',
      coordinates: '35.6762,139.6503',
      description: 'Bridging centuries of zen meditation with ultra-modern robotics and artificial intelligence institutes.',
      descriptionUz: "Ko'p asrlik dzen falsafasi va zamonaviy robototexnika hamda sun'iy intellekt institutlari o'rtasidagi uyg'unlik.",
      descriptionRu: 'Синтез многовековой философии дзэн с передовыми институтами робототехники и ИИ.',
      descriptionTr: 'Yüzyıllık Zen felsefesi ile en modern yapay zekâ ve robotik enstitülerinin köprüsü.',
      story: 'From the bamboo groves of Arashiyama to the innovation clusters of Odaiba, Japan offers an extraordinary blueprint for how traditions can co-exist harmoniously with exponential technology.',
      storyUz: "Arashiyama bambukzorlaridan tortib Odaiba innovatsiya klasterlarigacha bo'lgan yo'l an'analar va ilg'or texnologiyalar qanday uyg'unlashishi mumkinligini isbotlaydi.",
      storyRu: 'От бамбуковых рощ Арасиямы до технологических кластеров Одайбы, Япония показывает идеальный баланс традиций и инноваций.',
      storyTr: 'Arashiyama ormanlarından Odaiba teknoparklarına uzanan yolculuk, gelenek ile geleceğin uyumunu kanıtlıyor.',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200',
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200',
      ]),
      status: 'PUBLISHED',
      featured: true,
      visitedAt: new Date('2024-07-08'),
    },
  ];

  for (const d of destinations) {
    await prisma.destination.upsert({
      where: { slug: d.slug },
      update: d,
      create: d,
    });
  }
  console.log(`Destinations seeded: ${destinations.length}`);

  // 4. Timeline Events (Career, Education, Expeditions)
  const timelineEvents = [
    {
      year: 2024,
      date: 'Autumn 2024',
      title: 'Global Scholar Fellowship & UN Forum Keynote',
      titleUz: "Xalqaro ilmiy stipendiya va BMT forumidagi ma'ruza",
      titleRu: 'Международная научная стипендия и выступление на форуме ООН',
      titleTr: 'Küresel Akademik Burs ve BM Forumu Konuşması',
      category: 'ACHIEVEMENT',
      description: 'Delivered a keynote address in Geneva on Eurasian transport integration and youth empowerment in scientific innovation.',
      descriptionUz: "Jenevada Yevroosiyo transport integratsiyasi va ilmiy innovatsiyalarda yoshlar roli bo'yicha plenar ma'ruza qilindi.",
      descriptionRu: 'Выступление в Женеве с докладом по интеграции транспортных коридоров Евразии и развитию молодежной науки.',
      descriptionTr: 'Cenevre’de Avrasya ulaşım koridorları ve gençlerin bilimsel inovasyondaki rolü üzerine açılış konuşması yapıldı.',
      location: 'Geneva, Switzerland',
      mediaUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
      order: 1,
    },
    {
      year: 2023,
      date: 'Summer 2023',
      title: 'Trans-Alpine Environmental & Glacier Expedition',
      titleUz: "Trans-Alp ekologik va muzlik tadqiqot ekspeditsiyasi",
      titleRu: 'Трансальпийская экологическая экспедиция по ледникам',
      titleTr: 'Alpler Buzul ve Çevre Araştırma Seferi',
      category: 'TRAVEL',
      description: 'Completed a 24-day scientific trek across Switzerland, Italy, and Austria gathering empirical climate variation points.',
      descriptionUz: "Shveysariya, Italiya va Avstriya bo'ylab 24 kunlik ilmiy-tadqiqot safari davomida iqlim ko'rsatkichlari to'plandi.",
      descriptionRu: '24-дневный исследовательский маршрут через Швейцарию, Италию и Австрию со сбором климатических данных.',
      descriptionTr: 'İsviçre, İtalya ve Avusturya boyunca 24 günlük bilimsel buzul keşif rotası tamamlandı.',
      location: 'Alps, Central Europe',
      mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
      order: 2,
    },
    {
      year: 2022,
      date: 'Spring 2022',
      title: 'Publication of Landmark Monograph on Central Asian Logistics',
      titleUz: "Markaziy Osiyo logistika yo'laklariga oid yirik monografiya nashri",
      titleRu: 'Публикация фундаментальной монографии по логистике Центральной Азии',
      titleTr: 'Orta Asya Lojistik Koridorları Üzerine Kapsamlı Monografi Yayını',
      category: 'SCIENTIFIC',
      description: 'Co-authored a comprehensive comparative analysis of modern multimodal trade routes connecting Asia and Europe.',
      descriptionUz: "Osiyo va Yevropani bog'lovchi multimodal savdo yo'laklari tahliliga bag'ishlangan yirik ilmiy asar chop etildi.",
      descriptionRu: 'Выход в свет всестороннего анализа мультимодальных торговых путей между Азией и Европой.',
      descriptionTr: 'Asya ile Avrupa’yı birbirine bağlayan çok modlu ticaret rotaları üzerine ortak monografi yayınlandı.',
      location: 'Tashkent & Berlin',
      mediaUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800',
      order: 3,
    },
    {
      year: 2020,
      date: 'Autumn 2020',
      title: 'Establishment of Youth Knowledge & Leadership Initiative',
      titleUz: "Yoshlar intellektual salohiyati va yetakchilik tashabbusining yo'lga qo'yilishi",
      titleRu: 'Основание молодежной образовательной и лидерской инициативы',
      titleTr: 'Gençlik Bilgi ve Liderlik İnisiyatifinin Kuruluşu',
      category: 'CAREER',
      description: 'Initiated mentorship programs reaching over 10,000 ambitious students across Central Asia, promoting international education.',
      descriptionUz: "10,000 dan ortiq yoshlarni qamrab olgan, xalqaro ta'lim va tahliliy tafakkurni rivojlantiruvchi mentorlik loyihasi yo'lga qo'yildi.",
      descriptionRu: 'Запуск менторской программы, охватившей более 10 000 студентов по вопросам международного образования.',
      descriptionTr: 'Orta Asya genelinde 10.000’den fazla gence ulaşan uluslararası eğitim ve mentorluk programı başlatıldı.',
      location: 'Central Asia',
      mediaUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800',
      order: 4,
    },
    {
      year: 2018,
      date: 'Summer 2018',
      title: 'Graduation with Highest Academic Honors',
      titleUz: "Universitetni imtiyozli diplom bilan tamomlash",
      titleRu: 'Окончание университета с отличием',
      titleTr: 'Yüksek Onur Derecesiyle Üniversite Mezuniyeti',
      category: 'EDUCATION',
      description: 'Completed Bachelor studies with summa cum laude distinction, winning the National Academic Excellence Award.',
      descriptionUz: "Bakalavriat bosqichini a'lo baholar bilan tamomlab, Respublika akademik iqtidor mukofotiga sazovor bo'lindi.",
      descriptionRu: 'Успешное завершение обучения с наивысшими академическими баллами и получение государственной награды.',
      descriptionTr: 'Üniversite eğitimini üstün başarı derecesi ve Ulusal Akademik Mükemmellik Ödülü ile tamamlama.',
      location: 'Tashkent, Uzbekistan',
      mediaUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800',
      order: 5,
    },
  ];

  for (let i = 0; i < timelineEvents.length; i++) {
    const t = timelineEvents[i];
    await prisma.timelineEvent.create({
      data: t,
    });
  }
  console.log(`Timeline events seeded: ${timelineEvents.length}`);

  // 5. Certificates & Diplomas
  const certificates = [
    {
      title: 'Global Geopolitical Analysis & Strategic Foresight',
      titleUz: 'Global geosiyosiy tahlil va strategik prognozlash',
      titleRu: 'Глобальный геополитический анализ и стратегическое предвидение',
      titleTr: 'Küresel Jeopolitik Analiz ve Stratejik Öngörü',
      issuer: 'Geneva Centre for Security Policy (GCSP)',
      issueDate: new Date('2024-03-15'),
      credentialUrl: 'https://credentials.gcsp.ch/verify/GCSP-2024-AT-891',
      credentialId: 'GCSP-2024-AT-891',
      imageUrl: 'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?q=80&w=800',
      category: 'DIPLOMACY',
      featured: true,
      order: 1,
    },
    {
      title: 'Advanced Data Modeling in Socio-Economic Systems',
      titleUz: "Ijtimoiy-iqtisodiy tizimlarda ilg'or ma'lumotlar modellashtirish",
      titleRu: 'Продвинутое моделирование социально-экономических систем',
      titleTr: 'Sosyo-Ekonomik Sistemlerde İleri Veri Modellemesi',
      issuer: 'Max Planck Institute / European Research Consortium',
      issueDate: new Date('2023-11-10'),
      credentialUrl: 'https://verify.erc.eu/cert/AT-SOC-2023-44',
      credentialId: 'AT-SOC-2023-44',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800',
      category: 'ACADEMIC',
      featured: true,
      order: 2,
    },
    {
      title: 'High-Altitude Alpine Expedition & Field Safety Master',
      titleUz: "Baland tog' sharoitida ilmiy ekspeditsiya va xavfsizlik sertifikati",
      titleRu: 'Мастер высокогорных экспедиций и полевой безопасности',
      titleTr: 'Yüksek İrtifa Dağcılık ve Saha Güvenliği Sertifikası',
      issuer: 'International Mountaineering & Climbing Federation (UIAA)',
      issueDate: new Date('2023-06-25'),
      credentialUrl: 'https://theuiaa.org/certifications/verify/UIAA-ALPIN-2023-99',
      credentialId: 'UIAA-ALPIN-2023-99',
      imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800',
      category: 'EXPEDITION',
      featured: true,
      order: 3,
    },
    {
      title: 'Distinguished Youth Ambassador of Cultural Heritage',
      titleUz: 'Madaniy meros yoshlar elchisi faxriy diplomi',
      titleRu: 'Почетный молодежный посол культурного наследия',
      titleTr: 'Kültürel Mirasın Gençlik Elçisi Onur Belgesi',
      issuer: 'UNESCO Silk Roads Programme',
      issueDate: new Date('2022-09-18'),
      credentialUrl: 'https://unesco.org/silkroads/youth-ambassadors/ashraf-turdialiyev',
      credentialId: 'UNESCO-SR-2022-042',
      imageUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=800',
      category: 'LEADERSHIP',
      featured: true,
      order: 4,
    },
  ];

  for (let i = 0; i < certificates.length; i++) {
    const cert = certificates[i];
    await prisma.certificate.create({
      data: cert,
    });
  }
  console.log(`Certificates seeded: ${certificates.length}`);

  // 6. Scientific Publications
  const publications = [
    {
      title: 'Multimodal Transit Arteries: Re-engineering the Middle Corridor in Eurasian Trade Dynamics',
      titleUz: "Multimodal tranzit yo'laklari: Yevroosiyo savdo dinamikasida O'rta yo'lak modernizatsiyasi",
      titleRu: 'Мультимодальные транзитные артерии: Реинжиниринг Срединного коридора в торговле Евразии',
      titleTr: 'Çok Modlu Transit Arterleri: Avrasya Ticaret Dinamiklerinde Orta Koridorun Yeniden Yapılanması',
      authors: 'Ashraf Turdialiyev, K. V. Schneider, M. Rahimov',
      journal: 'Journal of Eurasian Economic Integration & Logistics, Vol. 14, Iss. 3',
      year: 2024,
      doi: '10.1016/j.jeasiatrans.2024.10842',
      link: 'https://doi.org/10.1016/j.jeasiatrans.2024.10842',
      abstract: 'This empirical study explores the evolving infrastructure, digital customs clearance systems, and strategic bottlenecks of the Middle Corridor connecting China to European markets through Central Asia and the Caucasus.',
      abstractUz: "Ushbu empirik tadqiqot Markaziy Osiyo va Kavkaz orqali Xitoy va Yevropa bozorlarini bog'lovchi O'rta yo'lakning rivojlanayotgan infratuzilmasi, raqamli bojxona tizimlari va strategik to'siqlarini tahlil qiladi.",
      abstractRu: 'В исследовании анализируются развивающаяся инфраструктура, цифровые таможенные системы и стратегические узлы Срединного коридора через Центральную Азию и Кавказ.',
      abstractTr: 'Bu çalışma, Orta Asya ve Kafkaslar üzerinden Çin ile Avrupa pazarlarını bağlayan Orta Koridor’un altyapı ve gümrük süreçlerini incelemektedir.',
      tags: JSON.stringify(['Logistics', 'Geopolitics', 'Silk Road', 'Economics', 'Trade']),
      citations: 34,
      featured: true,
    },
    {
      title: 'Glacial Recession and High-Mountain Water Security: A Comparative Hydrological Analysis',
      titleUz: "Muzliklar erishi va baland tog' suv xavfsizligi: Qiyosiy gidrologik tahlil",
      titleRu: 'Таяние ледников и водная безопасность высокогорных регионов: Сравнительный гидрологический анализ',
      titleTr: 'Buzul Erimesi ve Yüksek Dağ Su Güvenliği: Karşılaştırmalı Hidrolojik Analiz',
      authors: 'Ashraf Turdialiyev, Dr. Elena Weber',
      journal: 'International Bulletin of Alpine & Arid Hydrology, Vol. 29',
      year: 2023,
      doi: '10.1029/2023HY00981',
      link: 'https://doi.org/10.1029/2023HY00981',
      abstract: 'Investigating parallels in glacial mass balances between the Pamir-Alay system and the Swiss Bernese Alps to construct predictive models for downstream agricultural vulnerability.',
      abstractUz: "Pomir-Oloy tog' tizmasi va Shveysariya Bern Alp tog'laridagi muzliklar dinamikasi qiyoslanib, quyi oqimdagi qishloq xo'jaligi barqarorligi uchun bashoratli modellar ishlab chiqildi.",
      abstractRu: 'Исследование параллелей таяния ледников Памиро-Алая и Швейцарских Альп для создания прогнозных моделей для сельского хозяйства.',
      abstractTr: 'Pamir-Alay ve İsviçre Alpleri buzul kütle dengelerinin karşılaştırılarak aşağı havzalardaki su güvenliği modellerinin oluşturulması.',
      tags: JSON.stringify(['Climate Change', 'Hydrology', 'Glaciology', 'Ecology']),
      citations: 28,
      featured: true,
    },
    {
      title: 'Digital Nomads, Knowledge Hubs, and Spatial Development in Post-Industrial Cities',
      titleUz: "Raqamli ko'chmanchilar, bilim markazlari va post-industrial shaharlarning hududiy rivojlanishi",
      titleRu: 'Цифровые кочевники, хабы знаний и пространственное развитие постиндустриальных городов',
      titleTr: 'Dijital Göçebeler, Bilgi Merkezleri ve Sanayi Sonrası Şehirlerin Mekansal Gelişimi',
      authors: 'Ashraf Turdialiyev',
      journal: 'Urban Studies & Spatial Economy Review, Vol. 11, No. 2',
      year: 2023,
      doi: '10.1080/00420980.2023.2189441',
      link: 'https://doi.org/10.1080/00420980.2023.2189441',
      abstract: 'Examines how mobile tech professionals shape urban real estate, co-working ecosystems, and local knowledge dissemination in emerging metropolitan centers.',
      abstractUz: "Mobil texnologiya mutaxassislari rivojlanayotgan megapolislar ko'chmas mulk bozori, kovorking tizimlari va mahalliy bilim almashinuviga qanday ta'sir ko'rsatishi o'rganilgan.",
      abstractRu: 'Анализ влияния удаленных специалистов на экосистемы коворкингов, рынок недвижимости и передачу знаний в развивающихся центрах.',
      abstractTr: 'Gezici teknoloji profesyonellerinin kentsel gayrimenkul ve bilgi yayılımı üzerindeki etkisinin analizi.',
      tags: JSON.stringify(['Urban Planning', 'Digital Nomadism', 'Knowledge Economy', 'Technology']),
      citations: 19,
      featured: false,
    },
  ];

  for (let i = 0; i < publications.length; i++) {
    const pub = publications[i];
    await prisma.publication.create({
      data: pub,
    });
  }
  console.log(`Publications seeded: ${publications.length}`);

  // 7. Audience Stats (Simulated Live Counters)
  const stats = [
    {
      key: 'countries_visited',
      label: 'Countries Explored',
      labelUz: "Tashrif buyurilgan davlatlar",
      labelRu: 'Посещенные страны',
      labelTr: 'Keşfedilen Ülkeler',
      value: 42,
      prefix: '',
      suffix: '+',
      isSimulated: false,
      incrementRate: 0,
      order: 1,
    },
    {
      key: 'global_audience',
      label: 'Global Audience & Readers',
      labelUz: "Xalqaro auditoriya va mushtariylar",
      labelRu: 'Глобальная аудитория',
      labelTr: 'Küresel Kitle ve Okuyucular',
      value: 384500,
      prefix: '',
      suffix: '+',
      isSimulated: true,
      incrementRate: 0.25, // grows naturally over time
      order: 2,
    },
    {
      key: 'academic_citations',
      label: 'Research Citations',
      labelUz: "Ilmiy iqtiboslar",
      labelRu: 'Научные цитирования',
      labelTr: 'Akademik Atıflar',
      value: 680,
      prefix: '',
      suffix: '+',
      isSimulated: true,
      incrementRate: 0.05,
      order: 3,
    },
    {
      key: 'expedition_distance',
      label: 'Expedition Kilometers',
      labelUz: "Ekspeditsiya kilometrlari",
      labelRu: 'Километры экспедиций',
      labelTr: 'Keşif Kilometresi',
      value: 128400,
      prefix: '',
      suffix: ' km',
      isSimulated: true,
      incrementRate: 0.15,
      order: 4,
    },
  ];

  for (const s of stats) {
    await prisma.audienceStat.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log(`Audience stats seeded: ${stats.length}`);

  // 8. Site Settings & Bio
  const settings = [
    {
      key: 'hero_headline_en',
      value: 'Explorer. Scholar. Global Thinker.',
      description: 'Main landing page headline (English)',
    },
    {
      key: 'hero_headline_uz',
      value: 'Sayyoh. Olim. Global Fikrlaydigan Yetakchi.',
      description: 'Main landing page headline (Uzbek)',
    },
    {
      key: 'hero_headline_ru',
      value: 'Исследователь. Ученый. Мыслитель.',
      description: 'Main landing page headline (Russian)',
    },
    {
      key: 'hero_headline_tr',
      value: 'Kâşif. Akademisyen. Küresel Vizyoner.',
      description: 'Main landing page headline (Turkish)',
    },
    {
      key: 'bio_en',
      value: 'Ashraf Turdialiyev is an international traveler, interdisciplinary researcher, and public intellectual exploring the intersections of sustainable trade corridors, high-altitude alpine ecology, and youth leadership. Having traversed over 40 countries across Eurasia, the Americas, and Africa, his mission connects historical scientific heritage with cutting-edge global innovation.',
      description: 'Full biography (English)',
    },
    {
      key: 'bio_uz',
      value: "Ashraf Turdialiyev — xalqaro tadqiqotchi, sayyoh va intellektual yetakchi. U barqaror savdo yo'laklari, baland tog' ekologiyasi va yoshlar yetakchiligi chorrahalarini chuqur tadqiq etadi. Yevroosiyo, Amerika va Afrika bo'ylab 40 dan ortiq mamlakatlarni kezib, o'tmishning ilmiy merosini bugungi zamonaviy innovatsiyalar bilan bog'lashni o'z missiyasi deb biladi.",
      description: 'Full biography (Uzbek)',
    },
    {
      key: 'bio_ru',
      value: 'Ашраф Турдиалиев — международный исследователь, путешественник и общественный деятель, изучающий взаимосвязи устойчивых торговых путей, высокогорной экологии и молодежного лидерства. Посетив более 40 стран Евразии, Америки и Африки, он соединяет богатое историческое наследие с передовыми мировыми инновациями.',
      description: 'Full biography (Russian)',
    },
    {
      key: 'bio_tr',
      value: 'Ashraf Turdialiyev, sürdürülebilir ticaret koridorları, yüksek irtifa ekolojisi ve gençlik liderliği alanlarında araştırmalar yürüten uluslararası kâşif ve akademisyendir. Avrasya, Amerika ve Afrika genelinde 40’tan fazla ülkeyi keşfederek, tarihi ilmi mirası çağdaş küresel vizyonla buluşturmaktadır.',
      description: 'Full biography (Turkish)',
    },
    {
      key: 'social_links',
      value: JSON.stringify({
        instagram: 'https://instagram.com/ashrafturdialiyev',
        telegram: 'https://t.me/ashrafturdialiyev',
        linkedin: 'https://linkedin.com/in/ashrafturdialiyev',
        youtube: 'https://youtube.com/@ashrafturdialiyev',
        twitter: 'https://x.com/ashrafturdialiyev',
        orcid: 'https://orcid.org/0009-0002-8172-9182',
      }),
      description: 'Official social media links',
    },
    {
      key: 'contact_email',
      value: 'contact@ashrafturdialiyev.com',
      description: 'Public contact inquiry email',
    },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log(`Site settings seeded: ${settings.length}`);

  console.log('--- Database Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
