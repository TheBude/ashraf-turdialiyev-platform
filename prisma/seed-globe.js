const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding Globe Locations ---');

  const locations = [
    {
      title: 'Samarkand: Heart of the Great Silk Road',
      titleUz: "Samarqand: Buyuk Ipak Yo'lining yuragi",
      titleRu: 'Самарканд: Сердце Великого шелкового пути',
      titleTr: 'Semerkant: İpek Yolu’nun Kalbi',
      country: 'Uzbekistan',
      countryCode: 'UZ',
      city: 'Samarkand',
      latitude: 39.6542,
      longitude: 66.9597,
      visitDate: new Date('2024-05-12'),
      description: 'An architectural and scholarly wonderland where ancient astronomers mapped the stars.',
      descriptionUz: "Ulug'bek yulduzlarni xaritaga tushirgan va qadimiy karvonlar tutashgan ilmiy markaz.",
      descriptionRu: 'Архитектурное и научное чудо, где астрономы исследовали созвездия.',
      descriptionTr: 'Uluğ Bey’in gökbilim haritalarını çıkardığı kadim medeniyet merkezi.',
      story: 'The azure mosaics of Registan illuminated during twilight show how mathematics, poetry, and celestial astronomy converged in medieval Central Asia.',
      category: 'CULTURAL',
      coverImage: 'https://images.unsplash.com/photo-1596484552829-9e8c07c29377?q=80&w=1200',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1596484552829-9e8c07c29377?q=80&w=1200',
        'https://images.unsplash.com/photo-1596484552994-e8e6e5898d97?q=80&w=1200'
      ]),
      status: 'PUBLISHED',
      featured: true,
      order: 1,
    },
    {
      title: 'Zermatt & Matterhorn: Alpine Glacier Dynamics',
      titleUz: 'Zermatt va Matterhorn: Alp muzliklari tadqiqoti',
      titleRu: 'Церматт и Маттерхорн: Динамика альпийских ледников',
      titleTr: 'Zermatt ve Matterhorn: Alp Buzul Dinamikleri',
      country: 'Switzerland',
      countryCode: 'CH',
      city: 'Zermatt',
      latitude: 45.9763,
      longitude: 7.7491,
      visitDate: new Date('2024-02-14'),
      description: 'High-altitude research documenting glacial retreat and water retention across the Bernese Alps.',
      descriptionUz: "Alp tog'lari baland cho'qqilarida muzliklar erishi va suv xavfsizligini tahlil qilish.",
      descriptionRu: 'Высокогорные гляциологические исследования и анализ таяния ледниковых масс.',
      descriptionTr: 'Yüksek irtifa Alp buzul erimeleri ve su güvenliği modellemesi.',
      story: 'Facing the majestic pyramid of the Matterhorn in sub-zero winds teaches resilience and empirical respect for planetary ecosystems.',
      category: 'ALPINE',
      coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200'
      ]),
      status: 'PUBLISHED',
      featured: true,
      order: 2,
    },
    {
      title: 'Cappadocia: Valleys of Wind and Stone',
      titleUz: 'Kappadokiya: Shamol va tosh vodiylari',
      titleRu: 'Каппадокия: Долины ветра и камня',
      titleTr: 'Kapadokya: Rüzgar ve Taş Vadileri',
      country: 'Turkey',
      countryCode: 'TR',
      city: 'Göreme',
      latitude: 38.6431,
      longitude: 34.8289,
      visitDate: new Date('2023-09-20'),
      description: 'Subterranean geological sanctuaries, tuff stone erosion, and sunrise balloon perspectives.',
      descriptionUz: "G'aroyib geologik qoyatoshlar va havo sharida tonggi ekspeditsiya kuzatuvi.",
      descriptionRu: 'Подземные святилища и исследование эрозии туфовых пород с высоты полета шаров.',
      descriptionTr: 'Yeraltı kaya yerleşimleri ve sıcak hava balonuyla gün doğumu jeoloji keşfi.',
      story: 'Ascending over the Göreme valley at dawn provides an unparalleled perspective on erosion, geology, and early civilizational adaptation.',
      category: 'EXPEDITION',
      coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
        'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1200'
      ]),
      status: 'PUBLISHED',
      featured: true,
      order: 3,
    },
    {
      title: 'Kyoto to Tokyo: Harmony of Epochs',
      titleUz: 'Kioto va Tokio: Davrlar sintezi',
      titleRu: 'Киото и Токио: Гармония эпох',
      titleTr: 'Kyoto ve Tokyo: Çağların Dengesi',
      country: 'Japan',
      countryCode: 'JP',
      city: 'Tokyo',
      latitude: 35.6762,
      longitude: 139.6503,
      visitDate: new Date('2024-07-08'),
      description: 'Bridging centuries of zen cultural preservation with AI robotics and high-tech institutes.',
      descriptionUz: "Ko'p asrlik an'analar va zamonaviy robototexnika hamda texnoparklar integratsiyasi.",
      descriptionRu: 'Соединение вековой культуры дзэн с передовыми центрами робототехники.',
      descriptionTr: 'Tarihi Zen felsefesi ile en ileri yapay zekâ merkezlerinin köprüsü.',
      story: 'From bamboo groves in Arashiyama to Odaiba innovation clusters, Japan demonstrates how ancient roots empower cutting-edge technological prowess.',
      category: 'SCHOLARLY',
      coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200',
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200'
      ]),
      status: 'PUBLISHED',
      featured: true,
      order: 4,
    },
    {
      title: 'Geneva: United Nations & Global Diplomacy',
      titleUz: "Jeneva: BMT va global diplomatiya sammiti",
      titleRu: 'Женева: ООН и глобальная дипломатия',
      titleTr: 'Cenevre: BM ve Küresel Diplomasi',
      country: 'Switzerland',
      countryCode: 'CH',
      city: 'Geneva',
      latitude: 46.2044,
      longitude: 6.1432,
      visitDate: new Date('2024-09-15'),
      description: 'Keynote address at the Palais des Nations on Eurasian connectivity and scientific youth fellowship.',
      descriptionUz: "Yevroosiyo tranzit integratsiyasi bo'yicha Millatlar saroyida plenar ma'ruza.",
      descriptionRu: 'Выступление во Дворце Наций по вопросам евразийских торговых путей.',
      descriptionTr: 'Milletler Sarayında Avrasya bağlantısallığı üzerine açılış konuşması.',
      category: 'DIPLOMATIC',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200'
      ]),
      status: 'PUBLISHED',
      featured: true,
      order: 5,
    },
    {
      title: 'Cairo: Nile Civilization & Historical Archives',
      titleUz: 'Qohira: Nil sivilizatsiyasi va tarixiy arxivlar',
      titleRu: 'Каир: Цивилизация Нила и древние архивы',
      titleTr: 'Kahire: Nil Medeniyeti ve Antik Arşivler',
      country: 'Egypt',
      countryCode: 'EG',
      city: 'Cairo',
      latitude: 30.0444,
      longitude: 31.2357,
      visitDate: new Date('2022-11-05'),
      description: 'Investigating ancient trade routes, Alexandria manuscript archives, and riverine ecosystem management.',
      descriptionUz: "Qadimgi savdo yo'llari va Aleksandriya qo'lyozmalari arxivlari tadqiqoti.",
      descriptionRu: 'Исследование древних караванных путей и Александрийских архивов.',
      descriptionTr: 'Antik ticaret yolları ve İskenderiye kütüphane arşivleri incelemesi.',
      category: 'CULTURAL',
      coverImage: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1200',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1200'
      ]),
      status: 'PUBLISHED',
      featured: false,
      order: 6,
    },
    {
      title: 'Dubai & Abu Dhabi: Clean Energy Future',
      titleUz: "Dubay va Abu-Dabi: Yashil energetika forumi",
      titleRu: 'Дубай и Абу-Даби: Энергетический переход будущего',
      titleTr: 'Dubai ve Abu Dabi: Geleceğin Temiz Enerjisi',
      country: 'United Arab Emirates',
      countryCode: 'AE',
      city: 'Dubai',
      latitude: 25.2048,
      longitude: 55.2708,
      visitDate: new Date('2023-01-18'),
      description: 'World Future Energy Summit attendance and sustainable desert architectural evaluation.',
      descriptionUz: "Butunjahon kelajak energiyasi sammiti va barqaror shahar infratuzilmasi tahlili.",
      descriptionRu: 'Участие во всемирном саммите чистой энергии и умных городов.',
      descriptionTr: 'Dünya Geleceğin Enerjisi Zirvesi ve sürdürülebilir mimari incelemeleri.',
      category: 'SCHOLARLY',
      coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200'
      ]),
      status: 'PUBLISHED',
      featured: false,
      order: 7,
    },
    {
      title: 'Tien Shan & Almaty: Mountain Ecosystems',
      titleUz: "Tyanshan va Olmaota: Tog' ekotizimlari",
      titleRu: 'Тянь-Шань и Алматы: Горные экосистемы',
      titleTr: 'Tanrı Dağları ve Almatı: Dağ Ekosistemleri',
      country: 'Kazakhstan',
      countryCode: 'KZ',
      city: 'Almaty',
      latitude: 43.2389,
      longitude: 76.8897,
      visitDate: new Date('2020-08-10'),
      description: 'Tien Shan alpine belt exploration and Central Asian ecological network launch.',
      descriptionUz: "Tyanshan tog' tizmasi va Markaziy Osiyo yoshlar ekologik tarmog'i tashabbusi.",
      descriptionRu: 'Экспедиция по Тянь-Шаню и запуск молодежной сети исследователей.',
      descriptionTr: 'Tanrı Dağları keşfi ve Orta Asya gençlik çevre inisiyatifi.',
      category: 'ALPINE',
      coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200'
      ]),
      status: 'PUBLISHED',
      featured: false,
      order: 8,
    },
  ];

  for (const loc of locations) {
    const existing = await prisma.globeLocation.findFirst({
      where: { title: loc.title },
    });
    if (!existing) {
      await prisma.globeLocation.create({ data: loc });
    }
  }

  const count = await prisma.globeLocation.count();
  console.log(`Globe locations total in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
