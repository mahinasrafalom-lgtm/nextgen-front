import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const filterTabs = [
  ['all', 'সব', 'All'],
  ['featured', 'ফিচার্ড', 'Featured'],
  ['trending', 'ট্রেন্ডিং', 'Trending'],
  ['new', 'নতুন এসেছে', 'New arrivals']
];

export default function ProductSection({ title, banglaTitle, category, subCategory, products }) {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollRef = useRef(null);

  const allItems = products.filter(
    (product) => (!category || product.category === category) && (!subCategory || product.subCategory === subCategory)
  );

  const items = activeFilter === 'featured'
    ? allItems.filter((p) => p.isFeatured).slice(0, 5)
    : allItems.slice(0, 5);

  if (!items.length) return null;

  const query = new URLSearchParams({
    ...(category ? { category } : {}),
    ...(subCategory ? { subCategory } : {})
  }).toString();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 260;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-6 md:py-8">
      <div className="page-container">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
            {language === 'bn' ? banglaTitle : title}
          </h2>

          <div className="flex items-center gap-2">
            {/* Filter tabs */}
            <div className="hide-scrollbar flex gap-1 overflow-x-auto">
              {filterTabs.map(([key, bn, en]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`filter-tab ${activeFilter === key ? 'filter-tab-active' : 'filter-tab-inactive'}`}
                >
                  {language === 'bn' ? bn : en}
                </button>
              ))}
            </div>

            {/* Scroll arrows */}
            <div className="hidden items-center gap-1 sm:flex">
              <button onClick={() => scroll('left')} className="scroll-arrow" aria-label="Scroll left">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll('right')} className="scroll-arrow" aria-label="Scroll right">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Product grid / carousel */}
        <div
          ref={scrollRef}
          className="product-carousel hide-scrollbar grid auto-cols-[220px] grid-flow-col gap-4 overflow-x-auto pb-3 md:grid-flow-row md:grid-cols-5"
        >
          {items.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
