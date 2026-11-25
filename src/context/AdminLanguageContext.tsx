'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AdminLanguage = 'uz' | 'en';

export interface AdminTranslations {
  header: {
    title: string;
    subtitle: string;
    liveSite: string;
    logout: string;
    adminSession: string;
  };
  sidebar: {
    modulesHeading: string;
    overview: string;
    globe: string;
    media: string;
    travels: string;
    experience: string;
    timeline: string;
    research: string;
    certificates: string;
    audience: string;
    messages: string;
    settings: string;
  };
  overview: {
    title: string;
    subtitle: string;
    recentMessages: string;
    recentGlobe: string;
    viewAll: string;
    noMessages: string;
    unread: string;
    quickStats: string;
    systemStatus: string;
    online: string;
    cards: {
      globe: { title: string; desc: string };
      travels: { title: string; desc: string };
      media: { title: string; desc: string };
      timeline: { title: string; desc: string };
      research: { title: string; desc: string };
      certificates: { title: string; desc: string };
      messages: { title: string; desc: string };
    };
  };
  tabs: {
    destinations: string;
    map: string;
    timeline: string;
    certificates: string;
    publications: string;
    audience: string;
    messages: string;
    settings: string;
  };
  actions: {
    addNew: string;
    save: string;
    saving: string;
    cancel: string;
    delete: string;
    edit: string;
    search: string;
    filter: string;
    published: string;
    draft: string;
    status: string;
    actionsCol: string;
    confirmDelete: string;
    successSaved: string;
    successDeleted: string;
  };
}

export const adminTranslations: Record<AdminLanguage, AdminTranslations> = {
  uz: {
    header: {
      title: 'Ashraf Turdialiyev CMS',
      subtitle: 'Ijroiya Boshqaruvi Markazi',
      liveSite: 'Saytni ko‘rish',
      logout: 'Chiqish',
      adminSession: 'Admin seansi',
    },
    sidebar: {
      modulesHeading: 'Boshqaruv Modullari',
      overview: 'Boshqaruv Paneli',
      globe: '3D Yer Shari',
      media: 'Media Kutubxona',
      travels: 'Ekspeditsiyalar',
      experience: 'Tajriba va Lavozimlar',
      timeline: 'Muhim Bosqichlar',
      research: 'Ilmiy Nashrlar',
      certificates: 'Sertifikatlar',
      audience: 'Telemetriya va Auditoriya',
      messages: 'Kelgan Xabarlar',
      settings: 'Platforma Sozlamalari',
    },
    overview: {
      title: 'Ijroiya Boshqaruv Paneli',
      subtitle: 'Platforma statistikasi, kiritilgan ma’lumotlar va aloqa signallari',
      recentMessages: 'Oxirgi Kelgan Xabarlar',
      recentGlobe: 'Oxirgi 3D Yer Shari Nuqtalari',
      viewAll: 'Barchasini ko‘rish',
      noMessages: 'Yangi xabarlar mavjud emas',
      unread: 'Yangi',
      quickStats: 'Asosiy Ko‘rsatkichlar',
      systemStatus: 'Tizim holati',
      online: 'Faol & Himoyalangan',
      cards: {
        globe: { title: '3D Yer Shari Nuqtalari', desc: 'Interaktiv geolokatsiyalar' },
        travels: { title: 'Sayohat Ekspeditsiyalari', desc: 'Dala xronikalari va hikoyalar' },
        media: { title: 'Media Fayllar', desc: 'Rasmlar va galereyalar' },
        timeline: { title: 'Tarixiy Bosqichlar', desc: 'Faoliyat xronologiyasi' },
        research: { title: 'Ilmiy Nashrlar', desc: 'Monografiyalar va maqolalar' },
        certificates: { title: 'Diplom va Sertifikatlar', desc: 'Xalqaro tasdiqlangan hujjatlar' },
        messages: { title: 'Kelgan Xabarlar', desc: 'Hamkorlik takliflari' },
      },
    },
    tabs: {
      destinations: 'Ekspeditsiyalar',
      map: 'Dunyo Xaritasi',
      timeline: 'Bosib O‘tilgan Yo‘l',
      certificates: 'Sertifikatlar Ombori',
      publications: 'Ilmiy Nashrlar',
      audience: 'Auditoriya Hisoblagichlari',
      messages: 'Xabarlar',
      settings: 'Sayt Sozlamalari & Tarjima',
    },
    actions: {
      addNew: 'Yangi qo‘shish',
      save: 'O‘zgarishlarni saqlash',
      saving: 'Saqlanmoqda...',
      cancel: 'Bekor qilish',
      delete: 'O‘chirish',
      edit: 'Tahrirlash',
      search: 'Qidirish...',
      filter: 'Filtr',
      published: 'Chiqarilgan',
      draft: 'Qoralama',
      status: 'Holati',
      actionsCol: 'Amallar',
      confirmDelete: 'Haqiqatan ham ushbu yozuvni o‘chirmoqchimisiz?',
      successSaved: 'Muvaffaqiyatli saqlandi!',
      successDeleted: 'Muvaffaqiyatli o‘chirildi!',
    },
  },
  en: {
    header: {
      title: 'Ashraf Turdialiyev CMS',
      subtitle: 'Executive Operations',
      liveSite: 'Live Site',
      logout: 'Sign Out',
      adminSession: 'Admin Session',
    },
    sidebar: {
      modulesHeading: 'Management Modules',
      overview: 'Executive Overview',
      globe: '3D Earth Globe',
      media: 'Media Library',
      travels: 'Expeditions',
      experience: 'Experience & Roles',
      timeline: 'Milestones',
      research: 'Publications',
      certificates: 'Certificates',
      audience: 'Telemetry',
      messages: 'Inbound Inbox',
      settings: 'Platform Settings',
    },
    overview: {
      title: 'Executive Dashboard',
      subtitle: 'Real-time telemetry, database entities, and communication signals',
      recentMessages: 'Recent Incoming Messages',
      recentGlobe: 'Recent 3D Waypoints',
      viewAll: 'View All',
      noMessages: 'No inbound messages recorded',
      unread: 'New',
      quickStats: 'Platform Overview',
      systemStatus: 'System Status',
      online: 'Active & Encrypted',
      cards: {
        globe: { title: '3D Globe Locations', desc: 'Interactive Earth pins' },
        travels: { title: 'Travel Expeditions', desc: 'Curated field chronicles' },
        media: { title: 'Media Assets', desc: 'Archived imagery & galleries' },
        timeline: { title: 'Timeline Events', desc: 'Career milestones' },
        research: { title: 'Publications', desc: 'Peer-reviewed research' },
        certificates: { title: 'Certificates Vault', desc: 'Credentials & diplomas' },
        messages: { title: 'Inbound Messages', desc: 'Form dispatches' },
      },
    },
    tabs: {
      destinations: 'Destinations',
      map: 'World Map',
      timeline: 'Timeline Events',
      certificates: 'Certificates Vault',
      publications: 'Research Papers',
      audience: 'Audience Counters',
      messages: 'Messages',
      settings: 'Site Settings & Bio',
    },
    actions: {
      addNew: 'Add New',
      save: 'Save Changes',
      saving: 'Saving...',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search...',
      filter: 'Filter',
      published: 'Published',
      draft: 'Draft',
      status: 'Status',
      actionsCol: 'Actions',
      confirmDelete: 'Are you sure you want to delete this entry?',
      successSaved: 'Saved successfully!',
      successDeleted: 'Deleted successfully!',
    },
  },
};

interface AdminLanguageContextType {
  adminLang: AdminLanguage;
  setAdminLang: (lang: AdminLanguage) => void;
  adminT: AdminTranslations;
}

const AdminLanguageContext = createContext<AdminLanguageContextType | undefined>(undefined);

export function AdminLanguageProvider({ children }: { children: React.ReactNode }) {
  const [adminLang, setAdminLangState] = useState<AdminLanguage>('uz');

  useEffect(() => {
    const saved = localStorage.getItem('ashraf_admin_lang') as AdminLanguage | null;
    if (saved && (saved === 'uz' || saved === 'en')) {
      setAdminLangState(saved);
    }
  }, []);

  const setAdminLang = (lang: AdminLanguage) => {
    setAdminLangState(lang);
    localStorage.setItem('ashraf_admin_lang', lang);
    document.cookie = `ashraf_admin_lang=${lang}; path=/; max-age=31536000`;
  };

  return (
    <AdminLanguageContext.Provider
      value={{
        adminLang,
        setAdminLang,
        adminT: adminTranslations[adminLang] || adminTranslations.uz,
      }}
    >
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  const context = useContext(AdminLanguageContext);
  if (!context) {
    throw new Error('useAdminLanguage must be used within an AdminLanguageProvider');
  }
  return context;
}
