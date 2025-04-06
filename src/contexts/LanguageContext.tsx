
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'app.title': 'ई-Yukta',
    'app.subtitle': 'Your E-Waste, our responsibility',
    'roles.user': 'General User',
    'roles.kabadiwala': 'Kabadiwala',
    'roles.recycler': 'Recycler/Refurbisher',
    'roles.corporate': 'Corporate',
    'roles.user_desc': 'Individual with e-waste',
    'roles.kabadiwala_desc': 'E-waste collector',
    'roles.recycler_desc': 'Recycling facility',
    'roles.corporate_desc': 'Business entity',
    'landing.heading': 'Sustainable E-Waste Management',
    'landing.subheading': 'Connect with the right people to dispose of your electronic waste responsibly',
    'landing.select_role': 'Select your role',
    'landing.get_started': 'Get Started',
    'landing.user_description': 'Dispose your e-waste responsibly and track the entire lifecycle.',
    'landing.kabadiwala_description': 'Collect e-waste from users and earn through the E-Yukta platform.',
    'landing.recycler_description': 'Process e-waste in compliance with regulations and improve efficiency.',
    'landing.corporate_description': 'Manage corporate e-waste compliance and reporting in one place.',
    'user.dashboard': 'Dashboard',
    'user.scan': 'Scan E-Waste',
    'user.schedule': 'Schedule Pickup',
    'user.track': 'Track Disposal',
    'user.marketplace': 'Marketplace',
    'user.awareness': 'Awareness Hub',
    'kabadiwala.dashboard': 'Dashboard',
    'kabadiwala.pickups': 'Pickup Requests',
    'kabadiwala.inventory': 'Inventory',
    'kabadiwala.verification': 'Waste Verification',
    'kabadiwala.performance': 'Performance',
    'recycler.dashboard': 'Dashboard',
    'recycler.inventory': 'Inventory Management',
    'recycler.certification': 'Certification',
    'recycler.bulk': 'Bulk Pickup',
    'corporate.dashboard': 'Dashboard',
    'corporate.compliance': 'Compliance',
    'corporate.bulk_upload': 'Bulk Upload',
    'corporate.campaigns': 'Campaigns',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.logout': 'Logout',
  },
  hi: {
    'app.title': 'ई-युक्ता',
    'app.subtitle': 'आपका ई-कचरा, हमारी जिम्मेदारी',
    'roles.user': 'सामान्य उपयोगकर्ता',
    'roles.kabadiwala': 'कबाड़ीवाला',
    'roles.recycler': 'रीसाइक्लर/रिफर्बिशर',
    'roles.corporate': 'कॉर्पोरेट',
    'roles.user_desc': 'ई-कचरे वाला व्यक्ति',
    'roles.kabadiwala_desc': 'ई-कचरा संग्रहकर्ता',
    'roles.recycler_desc': 'रीसाइक्लिंग सुविधा',
    'roles.corporate_desc': 'व्यावसायिक संस्था',
    'landing.heading': 'टिकाऊ ई-कचरा प्रबंधन',
    'landing.subheading': 'अपने इलेक्ट्रॉनिक कचरे को जिम्मेदारी से निपटाने के लिए सही लोगों से जुड़ें',
    'landing.select_role': 'अपनी भूमिका चुनें',
    'landing.get_started': 'शुरू करें',
    'landing.user_description': 'अपने ई-कचरे का जिम्मेदारी से निपटान करें और पूरे जीवनचक्र को ट्रैक करें।',
    'landing.kabadiwala_description': 'उपयोगकर्ताओं से ई-कचरा इकट्ठा करें और ई-युक्ता प्लेटफॉर्म के माध्यम से कमाई करें।',
    'landing.recycler_description': 'नियमों के अनुपालन में ई-कचरे का प्रसंस्करण करें और दक्षता में सुधार करें।',
    'landing.corporate_description': 'कॉर्पोरेट ई-कचरा अनुपालन और रिपोर्टिंग को एक ही जगह पर प्रबंधित करें।',
    'user.dashboard': 'डैशबोर्ड',
    'user.scan': 'ई-कचरा स्कैन करें',
    'user.schedule': 'पिकअप शेड्यूल करें',
    'user.track': 'निपटान ट्रैक करें',
    'user.marketplace': 'मार्केटप्लेस',
    'user.awareness': 'जागरूकता हब',
    'kabadiwala.dashboard': 'डैशबोर्ड',
    'kabadiwala.pickups': 'पिकअप अनुरोध',
    'kabadiwala.inventory': 'इन्वेंटरी',
    'kabadiwala.verification': 'कचरा सत्यापन',
    'kabadiwala.performance': 'प्रदर्शन',
    'recycler.dashboard': 'डैशबोर्ड',
    'recycler.inventory': 'इन्वेंटरी प्रबंधन',
    'recycler.certification': 'प्रमाणीकरण',
    'recycler.bulk': 'थोक पिकअप',
    'corporate.dashboard': 'डैशबोर्ड',
    'corporate.compliance': 'अनुपालन',
    'corporate.bulk_upload': 'थोक अपलोड',
    'corporate.campaigns': 'अभियान',
    'common.continue': 'जारी रखें',
    'common.back': 'वापस',
    'common.logout': 'लॉगआउट',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
