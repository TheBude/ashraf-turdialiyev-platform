const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.experience.count();
  if (count > 0) {
    console.log(`Experience table already has ${count} records. Skipping seed.`);
    return;
  }

  const roles = [
    {
      period: '2022 — Present',
      role: 'Chief Scientific Advisor & Associate Professor',
      roleUz: 'Bosh Ilmiy Maslahatchi va Dotsent',
      roleRu: 'Главный научный советник и доцент',
      roleTr: 'Baş Bilimsel Danışman ve Doçent',
      organization: 'Central Asian Institute of Advanced Technologies',
      location: 'Tashkent, Uzbekistan',
      description: 'Coordinating strategic innovations, digital transformation, and cross-border research frameworks. Mentoring over 40 graduate scholars and doctoral researchers.',
      descriptionUz: 'Strategik innovatsiyalar, raqamli transformatsiya va xalqaro tadqiqot dasturlarini muvofiqlashtirish. 40 dan ortiq yosh olimlar va magistrantlarga ilmiy rahbarlik.',
      descriptionRu: 'Координация стратегических инноваций, цифровой трансформации и международных исследовательских программ. Научное руководство более чем 40 молодыми исследователями.',
      descriptionTr: 'Stratejik inovasyon, dijital dönüşüm ve uluslararası araştırma programlarının koordinasyonu. 40tan fazla genç araştırmacıya akademik danışmanlık.',
      type: 'ACADEMIC',
      order: 1,
    },
    {
      period: '2020 — 2022',
      role: 'Senior Policy & Innovation Advisor',
      roleUz: 'Innovatsion Rivojlanish Bo‘yicha Ekspert',
      roleRu: 'Эксперт по инновационному развитию',
      roleTr: 'İnovasyon Geliştirme Uzmanı',
      organization: 'Ministry of Higher Education, Science and Innovations',
      location: 'Tashkent, Uzbekistan',
      description: 'Formulating evaluation frameworks for scientific research institutes and steering bilateral technological grant agreements.',
      descriptionUz: "Ilmiy-tadqiqot institutlari faoliyatini baholash mezonlarini ishlab chiqish va xalqaro grantlarni jalb qilish komissiyasi a'zosi.",
      descriptionRu: 'Разработка критериев оценки эффективности научно-исследовательских институтов и привлечение грантов мировых фондов.',
      descriptionTr: 'Araştırma enstitülerinin değerlendirme kriterlerinin geliştirilmesi ve uluslararası fonların yönetimi komisyonu üyeliği.',
      type: 'POLICY',
      order: 2,
    },
    {
      period: '2017 — 2020',
      role: 'Senior Research Fellow & Project Lead',
      roleUz: 'Katta Tadqiqotchi va Loyiha Rahbari',
      roleRu: 'Старший исследователь и руководитель проектов',
      roleTr: 'Kıdemli Araştırmacı ve Proje Yöneticisi',
      organization: 'Eurasian Applied Physics & Geoscience Laboratories',
      location: 'Almaty & International Consortiums',
      description: 'Heading high-altitude geodynamics, climate monitoring frameworks, and satellite telemetry integrations for alpine corridors.',
      descriptionUz: "Tog'li hududlar geodinamikasi, iqlim monitoringi va tabiiy resurslarni sun'iy yo'ldosh orqali tahlil qilish tizimlari loyihasi.",
      descriptionRu: 'Геодинамика горных регионов, климатический мониторинг и спутниковый анализ природных ресурсов.',
      descriptionTr: 'Dağlık bölgelerin jeodinamiği, iklim izleme ve doğal kaynakların uydu analizi projesi liderliği.',
      type: 'EXPEDITION',
      order: 3,
    },
  ];

  for (const role of roles) {
    await prisma.experience.create({ data: role });
  }

  console.log(`Seeded ${roles.length} experience records.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
