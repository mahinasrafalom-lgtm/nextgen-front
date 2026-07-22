import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const copy = {
  bn: {
    home: 'হোম', shop: 'শপ', consultation: 'পরামর্শ', about: 'আমাদের সম্পর্কে', search: 'পণ্য, ব্র্যান্ড অথবা প্রাণীর নাম খুঁজুন...',
    searchResults: 'স্মার্ট সাজেশন', allResults: 'সব ফলাফল দেখুন', cart: 'কার্ট', login: 'লগইন', logout: 'লগআউট',
    heroEyebrow: 'NEXT-GEN PET NUTRITION', heroTitle: 'ভালোবাসার প্রতিটি খাবার, বিজ্ঞানসম্মত যত্নে।', heroText: 'প্রিমিয়াম pet food, trusted brands ও vet-powered care—সবকিছু এক স্মার্ট অভিজ্ঞতায়।',
    shopNow: 'এখনই শপ করুন', freeConsultation: 'ফ্রি পরামর্শ নিন', trustedBy: 'বিশ্বস্ত ব্র্যান্ড', explore: 'এক্সপ্লোর করুন',
    addToCart: 'কার্টে যোগ করুন', viewAll: 'সব দেখুন', featured: 'আজকের ফিচারড সিলেকশন', whyUs: 'কেন PetCare BD?',
    secureCheckout: 'নিরাপদ পেমেন্ট', fastDelivery: 'দ্রুত ডেলিভারি', originals: '১০০% অরিজিনাল', vetCare: 'ভেট এক্সপার্ট কেয়ার',
    aiTitle: 'PetCare Smart Guide', aiText: 'আপনার প্রাণীর জন্য সঠিক খাবার খুঁজতে সাহায্য চাই?', aiStart: 'খাবার সাজেস্ট করুন',
    language: 'ভাষা', category: 'ক্যাটাগরি', price: 'মূল্য', inStock: 'স্টকে আছে', account: 'অ্যাকাউন্ট', newArrival: 'নতুন এসেছে'
  },
  en: {
    home: 'Home', shop: 'Shop', consultation: 'Consultation', about: 'About us', search: 'Search products, brands or pet types...',
    searchResults: 'Smart suggestions', allResults: 'View all results', cart: 'Cart', login: 'Sign in', logout: 'Sign out',
    heroEyebrow: 'NEXT-GEN PET NUTRITION', heroTitle: 'Every bowl of love, backed by science.', heroText: 'Premium pet food, trusted brands and vet-powered care—inside one intelligent experience.',
    shopNow: 'Shop now', freeConsultation: 'Get free advice', trustedBy: 'Trusted brands', explore: 'Explore',
    addToCart: 'Add to cart', viewAll: 'View all', featured: 'Today’s featured selection', whyUs: 'Why PetCare BD?',
    secureCheckout: 'Secure payments', fastDelivery: 'Fast delivery', originals: '100% original', vetCare: 'Vet expert care',
    aiTitle: 'PetCare Smart Guide', aiText: 'Need help finding the right food for your companion?', aiStart: 'Recommend food',
    language: 'Language', category: 'Category', price: 'Price', inStock: 'In stock', account: 'Account', newArrival: 'Just landed'
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('petcare_language') || 'bn');
  useEffect(() => { localStorage.setItem('petcare_language', language); document.documentElement.lang = language === 'bn' ? 'bn' : 'en'; }, [language]);
  const value = useMemo(() => ({ language, setLanguage, t: (key) => copy[language][key] || copy.bn[key] || key }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
