import type { Metadata } from 'next';

export const SITE_URL = 'https://ashrafturdialiyev.uz';

const LOCALES = ['uz', 'en', 'ru', 'tr'] as const;
type Locale = (typeof LOCALES)[number];

const OG_LOCALE: Record<Locale, string> = {
  uz: 'uz_UZ',
  en: 'en_US',
  ru: 'ru_RU',
  tr: 'tr_TR',
};

export type PageKey =
  | 'about'
  | 'audience'
  | 'certificates'
  | 'contact'
  | 'experience'
  | 'globe'
  | 'journey'
  | 'research'
  | 'travels';

type Copy = { title: string; description: string };

// Page titles do NOT include the site name: the root layout title template
// appends " | Ashraf Turdialiyev" automatically.
const PAGE_COPY: Record<PageKey, Record<Locale, Copy>> = {
  about: {
    uz: {
      title: 'Biografiya va Ilmiy Faoliyat',
      description:
        "Ashraf Turdialiyevning tarjimai holi, ilmiy diplomatiya yo'nalishidagi faoliyati va xalqaro tajribasi haqida ma'lumot.",
    },
    en: {
      title: 'Biography and Academic Work',
      description:
        "Biography of Ashraf Turdialiyev: his background, academic work in science diplomacy and international experience.",
    },
    ru: {
      title: 'Биография и научная деятельность',
      description:
        'Биография Ашрафа Турдиалиева: его путь, научная деятельность в области научной дипломатии и международный опыт.',
    },
    tr: {
      title: 'Biyografi ve Akademik Çalışmalar',
      description:
        "Ashraf Turdialiyev'in biyografisi, bilim diplomasisi alanındaki akademik çalışmaları ve uluslararası deneyimi.",
    },
  },
  audience: {
    uz: {
      title: 'Auditoriya va Global Qamrov',
      description:
        "Ashraf Turdialiyev platformasining auditoriyasi, global qamrovi va ko'rsatkichlari haqida statistik ma'lumotlar.",
    },
    en: {
      title: 'Audience and Global Reach',
      description:
        "Statistics on the audience, global reach and key figures of Ashraf Turdialiyev's platform.",
    },
    ru: {
      title: 'Аудитория и глобальный охват',
      description:
        'Статистика аудитории, глобального охвата и ключевых показателей платформы Ашрафа Турдиалиева.',
    },
    tr: {
      title: 'Kitle ve Küresel Erişim',
      description:
        "Ashraf Turdialiyev platformunun kitlesi, küresel erişimi ve temel göstergeleri hakkında istatistikler.",
    },
  },
  certificates: {
    uz: {
      title: 'Sertifikatlar va Malaka Hujjatlari',
      description:
        "Ashraf Turdialiyevning sertifikatlari, malaka hujjatlari va ta'lim yutuqlari arxivi.",
    },
    en: {
      title: 'Certificates and Qualifications',
      description:
        "Archive of Ashraf Turdialiyev's certificates, qualifications and educational achievements.",
    },
    ru: {
      title: 'Сертификаты и квалификации',
      description:
        'Архив сертификатов, квалификационных документов и образовательных достижений Ашрафа Турдиалиева.',
    },
    tr: {
      title: 'Sertifikalar ve Nitelikler',
      description:
        "Ashraf Turdialiyev'in sertifikaları, nitelik belgeleri ve eğitim başarılarının arşivi.",
    },
  },
  contact: {
    uz: {
      title: "Bog'lanish va Takliflar",
      description:
        "Ashraf Turdialiyev bilan bog'laning: hamkorlik, rasmiy takliflar va savollar uchun xabar yuboring.",
    },
    en: {
      title: 'Contact and Proposals',
      description:
        'Get in touch with Ashraf Turdialiyev: send a message for collaboration, official proposals and questions.',
    },
    ru: {
      title: 'Контакты и предложения',
      description:
        'Свяжитесь с Ашрафом Турдиалиевым: сообщения по вопросам сотрудничества, официальных предложений и другим вопросам.',
    },
    tr: {
      title: 'İletişim ve Teklifler',
      description:
        "Ashraf Turdialiyev ile iletişime geçin: iş birliği, resmi teklifler ve sorular için mesaj gönderin.",
    },
  },
  experience: {
    uz: {
      title: 'Tajriba va Lavozimlar',
      description:
        "Ashraf Turdialiyevning kasbiy tajribasi, egallagan lavozimlari va faoliyat yo'nalishlari.",
    },
    en: {
      title: 'Experience and Positions',
      description:
        "Ashraf Turdialiyev's professional experience, positions held and areas of activity.",
    },
    ru: {
      title: 'Опыт и должности',
      description:
        'Профессиональный опыт Ашрафа Турдиалиева, занимаемые должности и направления деятельности.',
    },
    tr: {
      title: 'Deneyim ve Görevler',
      description:
        "Ashraf Turdialiyev'in mesleki deneyimi, üstlendiği görevler ve faaliyet alanları.",
    },
  },
  globe: {
    uz: {
      title: 'Interaktiv 3D Yer Shari',
      description:
        "Ashraf Turdialiyev tashrif buyurgan davlatlar va shaharlarni interaktiv 3D yer sharida ko'ring.",
    },
    en: {
      title: 'Interactive 3D Globe',
      description:
        'Explore the countries and cities visited by Ashraf Turdialiyev on an interactive 3D globe.',
    },
    ru: {
      title: 'Интерактивный 3D-глобус',
      description:
        'Изучайте страны и города, которые посетил Ашраф Турдиалиев, на интерактивном 3D-глобусе.',
    },
    tr: {
      title: 'Etkileşimli 3D Dünya Küresi',
      description:
        "Ashraf Turdialiyev'in ziyaret ettiği ülkeleri ve şehirleri etkileşimli 3D dünya küresinde keşfedin.",
    },
  },
  journey: {
    uz: {
      title: "Hayot Yo'li va Bosqichlar",
      description:
        "Ashraf Turdialiyevning hayot yo'li, muhim bosqichlari va yutuqlari xronologiyasi.",
    },
    en: {
      title: 'Life Journey and Milestones',
      description:
        "A timeline of Ashraf Turdialiyev's life journey, key milestones and achievements.",
    },
    ru: {
      title: 'Жизненный путь и этапы',
      description:
        'Хронология жизненного пути, ключевых этапов и достижений Ашрафа Турдиалиева.',
    },
    tr: {
      title: 'Yaşam Yolculuğu ve Kilometre Taşları',
      description:
        "Ashraf Turdialiyev'in yaşam yolculuğu, önemli aşamaları ve başarılarının zaman çizelgesi.",
    },
  },
  research: {
    uz: {
      title: 'Ilmiy Tadqiqotlar va Nashrlar',
      description:
        "Ashraf Turdialiyevning ilmiy tadqiqotlari, maqolalari va nashrlari ro'yxati.",
    },
    en: {
      title: 'Research and Publications',
      description:
        "A list of Ashraf Turdialiyev's research, articles and publications.",
    },
    ru: {
      title: 'Научные исследования и публикации',
      description:
        'Список научных исследований, статей и публикаций Ашрафа Турдиалиева.',
    },
    tr: {
      title: 'Araştırmalar ve Yayınlar',
      description:
        "Ashraf Turdialiyev'in araştırmaları, makaleleri ve yayınlarının listesi.",
    },
  },
  travels: {
    uz: {
      title: 'Sayohat Ekspeditsiyalari',
      description:
        "Ashraf Turdialiyevning xalqaro sayohatlari va ekspeditsiyalari: fotosuratlar, hikoyalar va tadqiqot yozuvlari.",
    },
    en: {
      title: 'Travel Expeditions',
      description:
        "Ashraf Turdialiyev's international travels and expeditions: photographs, stories and field notes.",
    },
    ru: {
      title: 'Путевые экспедиции',
      description:
        'Международные путешествия и экспедиции Ашрафа Турдиалиева: фотографии, истории и полевые заметки.',
    },
    tr: {
      title: 'Seyahat Seferleri',
      description:
        "Ashraf Turdialiyev'in uluslararası seyahatleri ve seferleri: fotoğraflar, hikâyeler ve saha notları.",
    },
  },
};

export function normalizeLocale(locale: string): Locale {
  return (LOCALES as readonly string[]).includes(locale) ? (locale as Locale) : 'uz';
}

/** Self-referencing canonical + hreflang alternates for one page. */
export function localizedAlternates(locale: string, path = '') {
  const loc = normalizeLocale(locale);
  const suffix = path ? `/${path}` : '';
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `/${l}${suffix}`;
  languages['x-default'] = `/uz${suffix}`;
  return { canonical: `/${loc}${suffix}`, languages };
}

function socialMeta(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image = '/images/og-image.jpg',
  type: 'website' | 'article' = 'website'
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const suffix = path ? `/${path}` : '';
  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${suffix}`,
      type,
      siteName: 'Ashraf Turdialiyev Platform',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/** Metadata for a static page: unique title/description + correct canonical. */
export function buildPageMetadata(locale: string, page: PageKey): Metadata {
  const loc = normalizeLocale(locale);
  const { title, description } = PAGE_COPY[page][loc];
  return {
    title,
    description,
    alternates: localizedAlternates(loc, page),
    ...socialMeta(loc, page, title, description),
  };
}

/** Home page: keeps the layout's default title, only fixes canonical/hreflang. */
export function buildHomeMetadata(locale: string): Metadata {
  return { alternates: localizedAlternates(locale, '') };
}

/** Metadata for a single destination story page. */
export function buildDestinationMetadata(
  locale: string,
  slug: string,
  title: string,
  description: string,
  image?: string
): Metadata {
  const loc = normalizeLocale(locale);
  const desc = description.length > 160 ? `${description.slice(0, 157).trimEnd()}...` : description;
  return {
    title,
    description: desc,
    alternates: localizedAlternates(loc, `travels/${slug}`),
    ...socialMeta(loc, `travels/${slug}`, title, desc, image, 'article'),
  };
}
