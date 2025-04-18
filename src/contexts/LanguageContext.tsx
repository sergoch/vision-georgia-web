
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ka' | 'en';

// Define structure for translations
export interface Translations {
  [key: string]: {
    en: string;
    ka: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isGeorgian: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Common translations used across the app
export const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    ka: 'მთავარი',
  },
  'nav.about': {
    en: 'About',
    ka: 'ჩვენს შესახებ',
  },
  'nav.services': {
    en: 'Services',
    ka: 'სერვისები',
  },
  'nav.team': {
    en: 'Team',
    ka: 'გუნდი',
  },
  'nav.projects': {
    en: 'Projects',
    ka: 'პროექტები',
  },
  'nav.contact': {
    en: 'Contact',
    ka: 'კონტაქტი',
  },
  
  // Home page
  'home.welcome': {
    en: 'Welcome to Real Vision LLC',
    ka: 'მოგესალმებათ შპს რეალ ვიჟენი',
  },
  'home.subtitle': {
    en: 'Innovative Engineering & Geodetic Services',
    ka: 'ინოვაციური საინჟინრო და გეოდეზიური სერვისები',
  },
  'home.learnMore': {
    en: 'Learn More',
    ka: 'გაიგე მეტი',
  },
  
  // About page
  'about.title': {
    en: 'About Us',
    ka: 'ჩვენს შესახებ',
  },
  'about.companyName': {
    en: 'Real Vision LLC',
    ka: 'შპს „რეალ ვიჟენი"',
  },
  'about.id': {
    en: 'Company ID: 445684536',
    ka: 'საიდენტიფიკაციო კოდი: 445684536',
  },
  
  // Services page
  'services.title': {
    en: 'Our Services',
    ka: 'ჩვენი სერვისები',
  },
  'services.engineering': {
    en: 'Engineering Consulting',
    ka: 'საინჟინრო კონსულტაცია',
  },
  'services.geodetic': {
    en: 'Geodetic & Topographic Services',
    ka: 'გეოდეზიური და ტოპოგრაფიული სერვისები',
  },
  'services.lidar': {
    en: 'LIDAR Aerial 3D Surveys',
    ka: 'ლიდარით საჰაერო 3D კვლევები',
  },
  'services.gis': {
    en: 'GIS Server Setup & Web GIS Maps',
    ka: 'GIS სერვერის ინსტალაცია და ვებ GIS რუკები',
  },
  'services.database': {
    en: 'Geodatabase Integration & Spatial Data Hosting',
    ka: 'გეოდატაბაზის ინტეგრაცია და სივრცითი მონაცემების ჰოსტინგი',
  },
  
  // Team page
  'team.title': {
    en: 'Our Team',
    ka: 'ჩვენი გუნდი',
  },
  
  // Projects page
  'projects.title': {
    en: 'Our Projects',
    ka: 'ჩვენი პროექტები',
  },
  'projects.categories.all': {
    en: 'All',
    ka: 'ყველა',
  },
  'projects.categories.gis': {
    en: 'GIS',
    ka: 'GIS',
  },
  'projects.categories.drone': {
    en: 'Drone Surveying',
    ka: 'დრონით კვლევა',
  },
  'projects.categories.mapping': {
    en: 'Mapping',
    ka: 'კარტოგრაფირება',
  },
  
  // Contact page
  'contact.title': {
    en: 'Contact Us',
    ka: 'დაგვიკავშირდით',
  },
  'contact.address': {
    en: '15 Tamar Mepe Ave, Batumi 6000',
    ka: 'თამარ მეფის გამზირი #15, ბათუმი 6000',
  },
  'contact.companyId': {
    en: 'Company ID: 445684536',
    ka: 'საიდენტიფიკაციო კოდი: 445684536',
  },
  'contact.bankInfo': {
    en: 'Bank Code: BAGAGE22',
    ka: 'ბანკის კოდი: BAGAGE22',
  },
  'contact.accountNumber': {
    en: 'Account #: GE08BG0000000541535273',
    ka: 'ანგარიში #: GE08BG0000000541535273',
  },
  'contact.form.name': {
    en: 'Name',
    ka: 'სახელი',
  },
  'contact.form.email': {
    en: 'Email',
    ka: 'ელ-ფოსტა',
  },
  'contact.form.message': {
    en: 'Message',
    ka: 'შეტყობინება',
  },
  'contact.form.submit': {
    en: 'Send Message',
    ka: 'გაგზავნა',
  },
  
  // Footer
  'footer.rights': {
    en: 'All Rights Reserved',
    ka: 'ყველა უფლება დაცულია',
  },
  'footer.contactUs': {
    en: 'Contact Us',
    ka: 'დაგვიკავშირდით',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ka'); // Default language is Georgian
  
  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    console.warn(`Translation key "${key}" not found.`);
    return key;
  };
  
  const isGeorgian = language === 'ka';
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isGeorgian }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
