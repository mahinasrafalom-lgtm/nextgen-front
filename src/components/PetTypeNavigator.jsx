import { Bird, Bone, Boxes, Cat, Cookie, Dog, Fish, Gamepad2, HeartPulse, LayoutGrid, Pill, Scissors, Utensils } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const types = [
  ['cat', Cat, 'বিড়াল', 'Cat'], ['dog', Dog, 'কুকুর', 'Dog'], ['bird', Bird, 'পাখি', 'Bird'], ['fish', Fish, 'মাছ', 'Fish']
];
// Matches the controlled backend taxonomy (food/treats/toys/medicine/grooming/accessories/litter).
const primarySections = [
  ['food', Utensils, 'খাবার', 'Food'],
  ['medicine', Pill, 'মেডিসিন', 'Medicine'],
  ['toys', Gamepad2, 'খেলনা', 'Toys'],
  ['supplements', HeartPulse, 'সাপ্লিমেন্ট', 'Supplements'],
  ['accessories', Bone, 'এক্সেসরিজ', 'Accessories'],
];
const extraSections = [
  ['', LayoutGrid, 'সব', 'All'],
  ['treats', Cookie, 'ট্রিট', 'Treats'],
  ['grooming', Scissors, 'গ্রুমিং', 'Grooming'],
  ['litter', Boxes, 'লিটার', 'Litter']
];

export default function PetTypeNavigator({ title = true }) {
  const [params] = useSearchParams(); const { language } = useLanguage(); const category = params.get('category') || ''; const subCategory = params.get('subCategory') || '';
  const queryFor = (nextCategory, nextSubCategory = '') => {
    const next = new URLSearchParams(params);
    if (nextCategory) next.set('category', nextCategory); else next.delete('category');
    if (nextSubCategory) next.set('subCategory', nextSubCategory); else next.delete('subCategory');
    next.set('page', '1');
    return `/shop?${next.toString()}`;
  };
  return <section className={`page-container relative z-10 ${title ? '-mt-7' : ''}`}><div className="rounded-[1.55rem] border border-violet-100 bg-white p-4 shadow-[0_15px_35px_rgba(87,62,170,.1)] md:p-5">{title && <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-pink-500">SHOP BY NEED</p><h2 className="mt-1 text-xl font-black text-zinc-900">{language === 'bn' ? 'প্রথমে প্রয়োজনীয় ক্যাটাগরি বেছে নিন' : 'Start with what your companion needs'}</h2></div><Link className="text-sm font-bold text-violet-700 hover:text-violet-900" to="/shop">{language === 'bn' ? 'সব পণ্য দেখুন' : 'Browse all'}</Link></div>}<div className="product-category-rail hide-scrollbar grid gap-3 overflow-x-auto sm:grid-cols-5">{primarySections.map(([key, Icon, bn, en]) => <Link key={key} to={queryFor(category, key)} className={`product-category-card ${subCategory === key ? 'product-category-card-active' : ''}`}><span className="product-category-icon"><Icon size={28} /></span><span>{language === 'bn' ? bn : en}</span></Link>)}</div><div className="mt-5 border-t border-violet-100 pt-4"><div className="flex items-center justify-between gap-4"><p className="text-xs font-bold uppercase tracking-[.13em] text-violet-500">{language === 'bn' ? 'প্রাণীর ধরন অনুযায়ী দেখুন' : 'Browse by companion'}</p><div className="pet-section-rail hide-scrollbar flex gap-2 overflow-x-auto">{extraSections.map(([key, Icon, bn, en]) => <Link key={key || 'all'} className={`pet-section-tab ${subCategory === key ? 'pet-section-tab-active' : ''}`} to={queryFor(category, key)}><Icon size={15} />{language === 'bn' ? bn : en}</Link>)}</div></div><div className="pet-type-rail hide-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">{types.map(([type, Icon, bn, en]) => <Link key={type} to={queryFor(type, subCategory)} className={`pet-type-card ${category === type ? 'pet-type-card-active' : ''}`}><span className="pet-type-icon"><Icon size={25} /></span><span className="text-sm font-bold">{language === 'bn' ? bn : en}</span></Link>)}</div></div></div></section>;
}
