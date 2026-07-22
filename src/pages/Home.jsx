import { useEffect } from 'react';
import { ArrowRight, BadgeCheck, Gamepad2, HeartPulse, PackageCheck, ShieldCheck, Sparkles, Stethoscope, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner.jsx';
import ConsultancySection from '../components/ConsultancySection.jsx';
import PetTypeNavigator from '../components/PetTypeNavigator.jsx';
import ProductSection from '../components/ProductSection.jsx';
import { sectionDefinitions } from '../data/products.js';
import { useProducts } from '../hooks/useProducts.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const brands = ['Royal Canin', 'Whiskas', 'Pedigree', 'SmartHeart', 'Me-O', 'Drools', 'Reflex', 'Paws', 'Tetra', 'Vitapol'];

export default function Home({ onProducts }) {
  const { products } = useProducts({ limit: 50 });
  const { language, t } = useLanguage();

  useEffect(() => { onProducts(products); }, [products, onProducts]);

  const label = (bn, en) => (language === 'bn' ? bn : en);
  return <>
    <HeroBanner />
    <PetTypeNavigator />

    <section className="page-container pt-14">
      <div className="welcome-panel overflow-hidden rounded-[2rem] p-6 md:p-9">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="hero-chip"><Sparkles size={14} className="text-pink-500" />{label('প্রতিদিনের সুন্দর কেয়ার', 'A brighter everyday care routine')}</span>
            <h2 className="mt-4 text-3xl font-black text-zinc-900 md:text-4xl">{label('খাবার, কেয়ার আর ফ্রি ডাক্তার সেবা—সবই সহজ ও আনন্দময়।', 'Food, care and free doctor support—made easy and joyful.')}</h2>
            <p className="mt-3 max-w-xl text-zinc-600">{label('প্রাণীর জন্য প্রয়োজনীয় পণ্য পরিষ্কার ক্যাটাগরিতে সাজানো আছে। আর স্বাস্থ্য নিয়ে উদ্বেগ হলে আগে আবেদন করুন—সাপোর্ট টিম ডাক্তারকে চ্যাটে যুক্ত করে দেবে।', 'Find essentials in clear categories. For a health concern, apply first and our support team will match a doctor to your chat.')}</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link to="/shop" className="hero-cta">{label('পণ্য দেখুন', 'Explore products')} <ArrowRight size={18} /></Link><Link to="/consultation" className="hero-ghost"><HeartPulse size={18} />{label('বিনামূল্যে সেবা', 'Free doctor service')}</Link></div>
          </div>
          <div className="grid grid-cols-2 gap-3"><FeatureMini Icon={BadgeCheck} label={label('অরিজিনাল ব্র্যান্ড', 'Original brands')} /><FeatureMini Icon={Truck} label={label('দ্রুত ডেলিভারি', 'Fast delivery')} /><FeatureMini Icon={PackageCheck} label={label('বাছাই করা পণ্য', 'Curated products')} /><FeatureMini Icon={Stethoscope} label={label('ভেট সাপোর্ট', 'Vet support')} /></div>
        </div>
      </div>
    </section>

    <ConsultancySection />

    <section className="page-container pb-2">
      <div className="imported-toys-panel relative overflow-hidden rounded-[2rem] p-7 md:p-9">
        <div className="relative z-10 max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-violet-700"><Sparkles size={14} className="text-pink-500" />{label('এক্সক্লুসিভ কালেকশন', 'Exclusive collection')}</span><h2 className="mt-4 text-3xl font-black text-violet-950 md:text-4xl">{label('ইমপোর্টেড টয়স: খেলার মাঝে আরও ভালো থাকা।', 'Imported toys: more joy in every playtime.')}</h2><p className="mt-3 max-w-xl text-violet-900/75">{label('ইন্টারঅ্যাকটিভ, নিরাপদ ও আনন্দময় খেলনা দিয়ে আপনার পেটের দিনটাকে আরও প্রাণবন্ত করে তুলুন।', 'Give your companion a more stimulating day with safe, interactive and joyful toys.')}</p><Link to="/shop?subCategory=toys" className="hero-cta mt-6">{label('ইমপোর্টেড টয়স দেখুন', 'See imported toys')} <Gamepad2 size={18} /></Link></div><div className="toy-orb toy-orb-one" /><div className="toy-orb toy-orb-two" /><span className="toy-symbol toy-symbol-one">✦</span><span className="toy-symbol toy-symbol-two">●</span></div>
    </section>

    <section className="pb-5 pt-5">{sectionDefinitions.map(([title, banglaTitle, category, subCategory]) => <ProductSection key={title} title={title} banglaTitle={banglaTitle} category={category} subCategory={subCategory} products={products} />)}</section>

    <section className="section-space brand-section">
      <div className="page-container"><div className="text-center"><span className="hero-chip"><Sparkles size={14} className="text-pink-500" />{t('trustedBy').toUpperCase()}</span><h2 className="mt-4 section-heading">{label('বিশ্বস্ত ব্র্যান্ড, এক নির্ভরযোগ্য ঠিকানা।', 'Trusted brands, one reliable destination.')}</h2></div><div className="hide-scrollbar mt-7 flex gap-3 overflow-x-auto pb-3">{brands.map((brand, index) => <div className="brand-3d-pill" key={brand}><span className="brand-orb">{index + 1}</span>{brand}</div>)}</div></div>
    </section>

    <section className="section-space">
      <div className="page-container"><div className="mx-auto max-w-2xl text-center"><span className="hero-chip"><ShieldCheck size={14} className="text-violet-600" />NEXGEN PROMISE</span><h2 className="mt-4 section-heading">{label('একটি সুন্দর, নির্ভরযোগ্য কেয়ার অভিজ্ঞতা।', 'A brighter, dependable care experience.')}</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[Truck, t('fastDelivery'), label('ঢাকায় দ্রুত, সারাদেশে নির্ভরযোগ্য', 'Quick in Dhaka, reliable nationwide')], [ShieldCheck, t('originals'), label('ভেরিফাইড ব্র্যান্ড ও trusted sourcing', 'Verified brands and trusted sourcing')], [HeartPulse, label('বিনামূল্যে ডাক্তার সেবা', 'Free doctor service'), label('আবেদন, যাচাই, তারপর নিরাপদ চ্যাট', 'Apply, review, then a secure chat')], [Stethoscope, t('vetCare'), label('প্রয়োজনে বিশেষজ্ঞের সাহায্য', 'Expert support whenever needed')]].map(([Icon, title, text]) => <article className="feature-glass-card" key={title}><span className="feature-icon"><Icon size={23} /></span><span className="mt-5 text-lg font-black text-zinc-900">{title}</span><p className="mt-1 text-sm text-zinc-500">{text}</p></article>)}</div></div>
    </section>
  </>;
}

function FeatureMini({ Icon, label }) {
  return <div className="feature-mini-card"><Icon size={24} /><p className="mt-2 text-sm font-black text-zinc-800">{label}</p></div>;
}
