import { ArrowRight, ClipboardList, HeartPulse, MessageSquareHeart, ShieldCheck, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ConsultancySection() {
  const { language } = useLanguage();
  const label = (bn, en) => (language === 'bn' ? bn : en);
  return (
    <section className="section-space">
      <div className="page-container">
        <div className="consult-hero-grid overflow-hidden rounded-[2rem] border border-violet-100 p-6 shadow-[0_22px_50px_rgba(104,72,190,.12)] sm:p-9">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className="max-w-2xl">
              <span className="free-care-pill"><MessageSquareHeart size={16} /> {label('১০০% বিনামূল্যে ডাক্তার সেবা', '100% free doctor service')}</span>
              <h2 className="mt-5 flex items-center gap-3 text-3xl font-black leading-tight text-zinc-900 md:text-4xl">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pink-100 text-pink-600"><HeartPulse size={27} /></span>{label('প্রথমে আবেদন করুন, তারপর ডাক্তার চ্যাটে।', 'Apply first, then meet your doctor in chat.')}
              </h2>
              <p className="mt-4 max-w-xl text-zinc-600">
                {label(
                  'এই সেবাটি বিনামূল্যে। বুক নাউ থেকে আবেদন পাঠান—আমাদের সাপোর্ট টিম প্রয়োজন যাচাই করে উপযুক্ত ডাক্তারকে আপনার ব্যক্তিগত চ্যাটে যুক্ত করবেন।',
                  'This service is free. Use Book now to apply; our support team reviews the need and connects the right doctor to your private chat.'
                )}
              </p>
              <Link to="/consultation" className="hero-cta mt-6">{label('বুক নাউ', 'Book now')} <ArrowRight size={18} /></Link>
            </div>
            <ol className="grid gap-3">
              {[
                [ClipboardList, label('১. আবেদন ফর্ম পূরণ করুন', '1. Submit an application'), label('প্রাণী ও সমস্যার সংক্ষিপ্ত তথ্য দিন।', 'Tell us briefly about the animal and concern.')],
                [ShieldCheck, label('২. সাপোর্ট টিম নিশ্চিত করবে', '2. Support confirms it'), label('অ্যাডমিন প্যানেল থেকে আপনার আবেদন যাচাই হবে।', 'Your request is reviewed from the admin panel.')],
                [Stethoscope, label('৩. ডাক্তার চ্যাটে যুক্ত হবেন', '3. A doctor joins chat'), label('নিশ্চিত হলে সরাসরি নিরাপদ চ্যাট শুরু হবে।', 'Once confirmed, your secure chat opens directly.')]
              ].map(([Icon, title, text]) => <li key={title} className="consult-process-step"><span><Icon size={20} /></span><div><p>{title}</p><small>{text}</small></div></li>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
