import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ProductSection({ title, banglaTitle, category, subCategory, products }) {
  const { language, t } = useLanguage(); const items = products.filter((product) => (!category || product.category === category) && (!subCategory || product.subCategory === subCategory)).slice(0, 4);
  if (!items.length) return null;
  const query = new URLSearchParams({ ...(category ? { category } : {}), ...(subCategory ? { subCategory } : {}) }).toString();
  return <section className="py-6 md:py-8"><div className="page-container"><div className="mb-5 flex items-end justify-between gap-3"><div><span className="text-[10px] font-bold uppercase tracking-[.18em] text-pink-500">{language === 'bn' ? title : banglaTitle}</span><h2 className="mt-1 text-2xl font-black text-zinc-900 md:text-3xl">{language === 'bn' ? banglaTitle : title}</h2></div><Link className="flex shrink-0 items-center gap-1 rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-50" to={`/shop?${query}`}>{t('viewAll')} <ArrowUpRight size={15} /></Link></div><div className="product-carousel hide-scrollbar grid auto-cols-[220px] grid-flow-col gap-4 overflow-x-auto pb-3 md:grid-flow-row md:grid-cols-4">{items.map((product) => <ProductCard product={product} key={product._id} />)}</div></div></section>;
}
