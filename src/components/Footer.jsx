import { BadgeCheck, Bell, CreditCard, Facebook, Gift, Mail, MapPin, MessageSquareHeart, PawPrint, Phone, RotateCcw, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../config/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <>
      {/* Feature Strip + Newsletter */}
      <div className="feature-strip py-10">
        <div className="page-container grid gap-8 lg:grid-cols-12 items-center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:col-span-8">
            <div className="feature-strip-item">
              <div className="feature-strip-icon">
                <BadgeCheck size={20} />
              </div>
              <div>
                <h4 className="feature-strip-title">
                  {language === 'bn' ? '১০০% অরিজিনাল পণ্য' : '100% Original products'}
                </h4>
                <p className="feature-strip-text">
                  {language === 'bn' ? 'সরাসরি ব্র্যান্ড থেকে সংগ্রহ' : 'Sourced directly from brands'}
                </p>
              </div>
            </div>

            <div className="feature-strip-item">
              <div className="feature-strip-icon">
                <CreditCard size={20} />
              </div>
              <div>
                <h4 className="feature-strip-title">
                  {language === 'bn' ? 'নিরাপদ পেমেন্ট' : 'Secure Payment'}
                </h4>
                <p className="feature-strip-text">
                  {language === 'bn' ? 'SSL এনক্রিপশন সুরক্ষা' : 'SSL encryption protected'}
                </p>
              </div>
            </div>

            <div className="feature-strip-item">
              <div className="feature-strip-icon">
                <RotateCcw size={20} />
              </div>
              <div>
                <h4 className="feature-strip-title">
                  {language === 'bn' ? 'সহজ রিটার্ন' : 'Easy Return'}
                </h4>
                <p className="feature-strip-text">
                  {language === 'bn' ? '৭ দিনের মধ্যে রিটার্ন' : 'Return within 7 days'}
                </p>
              </div>
            </div>

            <div className="feature-strip-item">
              <div className="feature-strip-icon">
                <Gift size={20} />
              </div>
              <div>
                <h4 className="feature-strip-title">
                  {language === 'bn' ? 'লয়্যালটি পয়েন্ট' : 'Loyalty Points'}
                </h4>
                <p className="feature-strip-text">
                  {language === 'bn' ? 'প্রতি কেনাকাটায় পয়েন্ট অর্জন' : 'Earn points on every purchase'}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="newsletter-box">
              <div className="flex items-center gap-2 text-white mb-2">
                <Bell size={20} />
                <span className="font-bold">
                  {language === 'bn' ? 'নতুন অফার পেতে চান?' : 'Want new offers?'}
                </span>
              </div>
              <p className="text-primary-200 text-sm mb-3">
                {language === 'bn' ? 'আমাদের নিউজলেটারে সাবস্ক্রাইব করুন' : 'Subscribe to our newsletter'}
              </p>
              <div className="flex">
                <input
                  className="newsletter-input"
                  placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                />
                <button className="newsletter-btn">
                  {language === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer id="about" className="site-footer bg-zinc-900">
        {/* Free consultation highlight strip */}
        <div className="bg-primary-900">
          <div className="page-container flex flex-wrap items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-pink-500 text-white">
                <MessageSquareHeart size={22} />
              </span>
              <div>
                <p className="font-bold text-white">
                  {language === 'bn' ? 'বিনামূল্যে অনলাইন ভেট চ্যাট' : 'Free Online Vet Chat'}
                </p>
                <p className="text-sm text-primary-200">
                  {language === 'bn'
                    ? 'আগে আবেদন করুন, সাপোর্ট টিম নিশ্চিত হলে ডাক্তার চ্যাটে যুক্ত হবেন — সম্পূর্ণ ফ্রি।'
                    : 'Apply first; once support team confirms, doctor will join the chat — completely free.'}
                </p>
              </div>
            </div>
            <Link
              to="/consultation"
              className="rounded-xl bg-pink-500 px-5 py-2.5 font-bold text-white transition hover:bg-pink-600"
            >
              {language === 'bn' ? 'বুক নাউ' : 'Book Now'}
            </Link>
          </div>
        </div>

        <div className="page-container grid gap-9 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <PawPrint size={30} /> {site.name}
            </Link>
            <p className="mt-4 text-sm text-zinc-400">
              {language === 'bn'
                ? 'প্রাণীর সুস্থতার জন্য বিনামূল্যে ডাক্তার পরামর্শ ও বিশ্বস্ত পণ্য—সব এক জায়গায়।'
                : 'Free doctor consultation and trusted products for pet health—all in one place.'}
            </p>
          </div>

          <FooterList
            title={language === 'bn' ? 'ফ্রি সেবা' : 'Free Services'}
            links={[
              ['/consultation', language === 'bn' ? 'ফ্রি ভেট চ্যাট' : 'Free Vet Chat'],
              ['/consultation/apply', language === 'bn' ? 'নতুন আবেদন' : 'New Application'],
              ['/shop', language === 'bn' ? 'পেট শপ' : 'Pet Shop']
            ]}
          />

          <FooterList
            title={language === 'bn' ? 'কুইক লিংক' : 'Quick Links'}
            links={[
              ['/', language === 'bn' ? 'হোম' : 'Home'],
              ['/shop', language === 'bn' ? 'শপ' : 'Shop'],
              ['/orders', language === 'bn' ? 'আমার অর্ডার' : 'My Orders'],
              ['/login', language === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account']
            ]}
          />

          <div>
            <h3 className="font-bold text-white">
              {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </h3>
            <div className="mt-3 space-y-2 text-sm text-zinc-400">
              <p className="flex gap-2">
                <Phone size={16} />
                {site.hotline}
              </p>
              <p className="flex gap-2">
                <Mail size={16} />
                {site.email}
              </p>
              <p className="flex gap-2">
                <MapPin size={16} />
                {site.address}
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <a href="#about" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#about" aria-label="YouTube">
                <Youtube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} {site.name}. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}

function FooterList({ title, links }) {
  return (
    <div>
      <h3 className="font-bold text-white">{title}</h3>
      <div className="mt-3 space-y-2 text-sm text-zinc-400">
        {links.map(([to, name]) => (
          <Link className="block transition hover:text-primary-400" to={to} key={name}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
