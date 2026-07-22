import { Bird, Bone, Boxes, Cat, Cookie, Dog, Fish, Gamepad2, LayoutGrid, Pill, Scissors, Utensils } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const types = [
  ['cat', Cat, 'বিড়াল', 'Cat'], ['dog', Dog, 'কুকুর', 'Dog'], ['bird', Bird, 'পাখি', 'Bird'], ['fish', Fish, 'মাছ', 'Fish']
];
// Matches the controlled backend taxonomy (food/treats/toys/medicine/grooming/accessories/litter).
const sections = [
  ['', LayoutGrid, 'সব', 'All'],
  ['food', Utensils, 'খাবার', 'Food'],
  ['treats', Cookie, 'ট্রিট', 'Treats'],
  ['toys', Gamepad2, 'খেলনা', 'Toys'],
  ['medicine', Pill, 'মেডিসিন', 'Medicine'],
  ['grooming', Scissors, 'গ্রুমিং', 'Grooming'],
  ['accessories', Bone, 'এক্সেসরিজ', 'Accessories'],
  ['litter', Boxes, 'লিটার', 'Litter']
];

export default function PetTypeNavigator({ title = true }) {
  const [params] = useSearchParams(); const { language } = useLanguage(); const category = params.get('category') || 'cat'; const subCategory = params.get('subCategory') || '';
  const queryFor = (nextCategory, nextSubCategory = '') => {
    const next = new URLSearchParams(params);
    next.set('category', nextCategory);
    if (nextSubCategory) next.set('subCategory', nextSubCategory); else next.delete('subCategory');
    next.set('page', '1');
    return `/shop?${next.toString()}`;
  };
  return <section className="page-container relative z-10 -mt-7"><div className="rounded-2xl border border-yellow-100 bg-white p-4 shadow-[0_15px_30px_rgba(99,72,4,.11)] md:p-5">{title && <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-yellow-700">SHOP BY PET</p><h2 className="mt-1 text-xl font-bold text-zinc-900">{language === 'bn' ? 'আপনার প্রাণী বেছে নিন' : 'Choose your companion'}</h2></div><Link className="text-sm font-bold text-yellow-700 hover:text-yellow-800" to="/shop">{language === 'bn' ? 'সব পণ্য দেখুন' : 'Browse all'}</Link></div>}<div className="pet-type-rail hide-scrollbar flex gap-3 overflow-x-auto pb-2">{types.map(([type, Icon, bn, en]) => <Link key={type} to={queryFor(type)} className={`pet-type-card ${category === type ? 'pet-type-card-active' : ''}`}><span className="pet-type-icon"><Icon size={25} /></span><span className="text-sm font-bold">{language === 'bn' ? bn : en}</span></Link>)}</div><div className="pet-section-rail hide-scrollbar mt-5 flex gap-2 overflow-x-auto border-t border-zinc-100 pt-4">{sections.map(([key, Icon, bn, en]) => <Link key={key || 'all'} className={`pet-section-tab ${subCategory === key ? 'pet-section-tab-active' : ''}`} to={queryFor(category, key)}><Icon size={15} />{language === 'bn' ? bn : en}</Link>)}</div></div></section>;
}
