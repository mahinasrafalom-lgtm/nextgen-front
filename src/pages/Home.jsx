import { useEffect } from 'react';
import {
  ArrowRight, BadgeCheck, Bird, Cat, ChevronRight, Dog, Fish,
  HeartPulse, Phone, ShieldCheck, Sparkles, Stethoscope, Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner.jsx';
import ProductSection from '../components/ProductSection.jsx';
import { sectionDefinitions } from '../data/products.js';
import { useProducts } from '../hooks/useProducts.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const brands = [
  'Royal Canin', 'Whiskas', 'Pedigree', 'SmartHeart', 'Me-O',
  'Drools', 'Reflex', 'Bioline', 'Tetra', 'Vitapol'
];

const petTypes = [
  ['cat', Cat, 'বিড়াল', 'Cat'],
  ['dog', Dog, 'কুকুর', 'Dog'],
  ['bird', Bird, 'পাখি', 'Bird'],
  ['fish', Fish, 'মাছ', 'Fish']
];

export default function Home({ onProducts }) {
  const { products } = useProducts({ limit: 50 });
  const { language, t } = useLanguage();

  useEffect(() => { onProducts(products); }, [products, onProducts]);

  const label = (bn, en) => (language === 'bn' ? bn : en);

  return (
    <>
      {/* ── Hero Banner ── */}
      <HeroBanner />

      {/* ── Service Cards ── */}
      <section className="page-container relative z-10 -mt-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['service-card-icon-green', Stethoscope, label('ভেটেরিনারি অ্যাপয়েন্টমেন্ট', 'Veterinary Appointment'), label('বিশেষজ্ঞ ডাক্তারের অ্যাপয়েন্টমেন্ট নিন', 'Book an expert vet appointment')],
            ['service-card-icon-orange', Truck, label('দ্রুত ডেলিভারি', 'Fast Delivery'), label('১৪ ঘণ্টার মধ্যে ডেলিভারি', 'Delivery within 14 hours')],
            ['service-card-icon-pink', HeartPulse, label('হেলথ কনসালটেশন', 'Health Consultation'), label('অনলাইনে পেট কনসালটেশন', 'Online pet consultation')],
            ['service-card-icon-red', Phone, label('জরুরি সেবা', 'Emergency Service'), label('২৪/৭ জরুরি সেবা', '24/7 emergency service')]
          ].map(([iconClass, Icon, title, text]) => (
            <Link to="/consultation" key={title} className="service-card">
              <span className={`service-card-icon ${iconClass}`}>
                <Icon size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-zinc-800">{title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{text}</p>
              </div>
              <span className="service-card-arrow">
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Popular Brands ── */}
      <section className="section-space">
        <div className="page-container">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
                {label('জনপ্রিয় ব্র্যান্ড', 'Popular Brands')}
              </h2>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-1 text-sm font-semibold text-primary-700 transition hover:text-primary-800"
            >
              {label('সব দেখুন', 'View all')} <ChevronRight size={16} />
            </Link>
          </div>
          <div className="hide-scrollbar grid auto-cols-[130px] grid-flow-col gap-3 overflow-x-auto pb-2 sm:grid-flow-row sm:grid-cols-5 lg:grid-cols-10">
            {brands.map((brand, index) => (
              <Link
                key={brand}
                to={`/shop?search=${encodeURIComponent(brand)}`}
                className="brand-card"
              >
                <div className="brand-card-logo">
                  <span className="text-lg font-black text-primary-600">
                    {brand.charAt(0)}
                  </span>
                </div>
                <span className="brand-card-name">{brand}</span>
                <div className="brand-card-stand" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Products with Pet Type Pills ── */}
      <section className="bg-white py-8">
        <div className="page-container">
          {/* Section header with pet type pills */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
              {label('জনপ্রিয় বিভাগ', 'Popular Categories')}
            </h2>
            <div className="hide-scrollbar flex gap-2 overflow-x-auto">
              {petTypes.map(([type, Icon, bn, en]) => (
                <Link
                  key={type}
                  to={`/shop?category=${type}`}
                  className="pet-pill"
                >
                  <span className="pet-pill-icon">
                    <Icon size={16} />
                  </span>
                  {language === 'bn' ? bn : en}
                </Link>
              ))}
            </div>
          </div>

          {/* Product sections */}
          {sectionDefinitions.slice(0, 2).map(([title, banglaTitle, category, subCategory]) => (
            <ProductSection
              key={title}
              title={title}
              banglaTitle={banglaTitle}
              category={category}
              subCategory={subCategory}
              products={products}
            />
          ))}
        </div>
      </section>

      {/* ── Remaining Product Sections ── */}
      <section className="pb-5 pt-2">
        {sectionDefinitions.slice(2).map(([title, banglaTitle, category, subCategory]) => (
          <ProductSection
            key={title}
            title={title}
            banglaTitle={banglaTitle}
            category={category}
            subCategory={subCategory}
            products={products}
          />
        ))}
      </section>

      {/* ── NexGen Promise ── */}
      <section className="section-space bg-white">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="hero-chip">
              <ShieldCheck size={14} className="text-primary-600" />NEXGEN PROMISE
            </span>
            <h2 className="mt-4 section-heading">
              {label('একটি সুন্দর, নির্ভরযোগ্য কেয়ার অভিজ্ঞতা।', 'A brighter, dependable care experience.')}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Truck, t('fastDelivery'), label('ঢাকায় দ্রুত, সারাদেশে নির্ভরযোগ্য', 'Quick in Dhaka, reliable nationwide')],
              [ShieldCheck, t('originals'), label('ভেরিফাইড ব্র্যান্ড ও trusted sourcing', 'Verified brands and trusted sourcing')],
              [HeartPulse, label('বিনামূল্যে ডাক্তার সেবা', 'Free doctor service'), label('আবেদন, যাচাই, তারপর নিরাপদ চ্যাট', 'Apply, review, then a secure chat')],
              [Stethoscope, t('vetCare'), label('প্রয়োজনে বিশেষজ্ঞের সাহায্য', 'Expert support whenever needed')]
            ].map(([Icon, title, text]) => (
              <article className="feature-glass-card" key={title}>
                <span className="feature-icon"><Icon size={23} /></span>
                <span className="mt-5 text-lg font-black text-zinc-900">{title}</span>
                <p className="mt-1 text-sm text-zinc-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
