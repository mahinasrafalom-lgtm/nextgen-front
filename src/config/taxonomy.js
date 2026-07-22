// Mirrors backend/config/taxonomy.js. Controlled lists keep the catalogue clean
// (no more auto-created duplicate categories) and power all category labels.

export const PET_TYPES = [
  { value: 'cat', bn: 'বিড়াল', en: 'Cat' },
  { value: 'dog', bn: 'কুকুর', en: 'Dog' },
  { value: 'bird', bn: 'পাখি', en: 'Bird' },
  { value: 'fish', bn: 'মাছ', en: 'Fish' }
];

export const PRODUCT_CATEGORIES = [
  { value: 'food', bn: 'খাবার', en: 'Food' },
  { value: 'treats', bn: 'ট্রিট', en: 'Treats' },
  { value: 'toys', bn: 'খেলনা', en: 'Toys' },
  { value: 'medicine', bn: 'মেডিসিন', en: 'Medicine' },
  { value: 'grooming', bn: 'গ্রুমিং', en: 'Grooming' },
  { value: 'accessories', bn: 'এক্সেসরিজ', en: 'Accessories' },
  { value: 'litter', bn: 'লিটার', en: 'Litter' }
];

export const PET_AGES = [
  { value: '0-6m', bn: '০–৬ মাস', en: '0–6 months' },
  { value: '6-12m', bn: '৬–১২ মাস', en: '6–12 months' },
  { value: '1-2y', bn: '১–২ বছর', en: '1–2 years' },
  { value: '2-5y', bn: '২–৫ বছর', en: '2–5 years' },
  { value: '5y+', bn: '৫+ বছর', en: '5+ years' }
];

const findLabel = (list, value, language) => list.find((item) => item.value === value)?.[language] ?? value ?? '';

export const petLabel = (value, language = 'bn') => findLabel(PET_TYPES, value, language);
export const categoryLabel = (value, language = 'bn') => findLabel(PRODUCT_CATEGORIES, value, language);
export const ageLabel = (value, language = 'bn') => findLabel(PET_AGES, value, language);
export const genderLabel = (value, language = 'bn') =>
  value === 'male' ? (language === 'bn' ? 'পুরুষ' : 'Male') : value === 'female' ? (language === 'bn' ? 'মহিলা' : 'Female') : (language === 'bn' ? 'অজানা' : 'Unknown');
