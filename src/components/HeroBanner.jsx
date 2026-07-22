import { useEffect, useState } from 'react';
import { Check, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    titleBn: 'আপনার পোষা প্রাণীর\nসুস্থতাই আমাদের লক্ষ্য',
    titleEn: 'Your pet\'s wellness\nis our mission',
    subtitleBn: 'প্রিমিয়াম পেট ফুড, ভেটেরিনারি সেবা ও যত্নের সবকিছু এক জায়গায়।',
    subtitleEn: 'Premium pet food, veterinary service & care essentials all in one place.',
    to: '/shop'
  },
  {
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
    titleBn: 'বিশ্বস্ত ব্র্যান্ডের\nপ্রিমিয়াম পেট ফুড',
    titleEn: 'Premium pet food\nfrom trusted brands',
    subtitleBn: 'Royal Canin, Whiskas, Me-O সহ সেরা ব্র্যান্ডের পণ্য।',
    subtitleEn: 'Products from top brands including Royal Canin, Whiskas, Me-O.',
    to: '/shop?subCategory=food'
  },
  {
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    titleBn: 'বিনামূল্যে পশু\nচিকিৎসা পরামর্শ',
    titleEn: 'Free veterinary\nconsultation',
    subtitleBn: 'অভিজ্ঞ পশু চিকিৎসকের কাছ থেকে বিনামূল্যে পরামর্শ নিন।',
    subtitleEn: 'Get free advice from experienced veterinarians.',
    to: '/consultation'
  }
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => setActive((current) => (current + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];
  const title = language === 'bn' ? slide.titleBn : slide.titleEn;
  const subtitle = language === 'bn' ? slide.subtitleBn : slide.subtitleEn;

  return (
    <section className="hero-banner">
      <div className="page-container relative z-10 grid min-h-[420px] items-center gap-8 py-10 lg:grid-cols-2 lg:py-14">
        {/* Left side */}
        <div className="max-w-xl">
          <h1 className="text-4xl font-black leading-tight text-zinc-900 sm:text-5xl whitespace-pre-line">
            {title}
          </h1>
          <p className="mt-4 text-base text-zinc-600 leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <div className="hero-check">
              <Check size={16} />
              {language === 'bn' ? '১০০% অরিজিনাল পণ্য' : '100% Original products'}
            </div>
            <div className="hero-check">
              <Check size={16} />
              {language === 'bn' ? 'বিশেষজ্ঞ পেট সাপোর্ট' : 'Expert pet support'}
            </div>
            <div className="hero-check">
              <Check size={16} />
              {language === 'bn' ? 'দ্রুত ও নিরাপদ ডেলিভারি' : 'Fast & safe delivery'}
            </div>
          </div>
          <Link to={slide.to} className="hero-cta mt-8">
            {language === 'bn' ? 'এখনই শপ করুন' : 'Shop now'} <ArrowRight size={18} />
          </Link>
        </div>
        {/* Right side */}
        <div className="relative">
          <img src={slide.image} alt="Hero image" className="rounded-3xl shadow-hero w-full object-cover max-h-[380px]" />
          {/* Discount badge */}
          <div className="hero-badge">
            <span className="text-[10px] tracking-wide">UP TO</span>
            <span className="text-2xl leading-none">25%</span>
            <span className="text-[10px]">OFF</span>
          </div>
        </div>
        {/* Dots at bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`hero-dot ${index === active ? 'hero-dot-active' : 'hero-dot-inactive'}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
