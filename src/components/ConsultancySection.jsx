import { ArrowUpRight, Bird, Cat, Dog, Fish, HeartPulse, MessageSquareHeart, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const pets = [['cat', Cat, 'বিড়াল', 'Cat'], ['dog', Dog, 'কুকুর', 'Dog'], ['bird', Bird, 'পাখি', 'Bird'], ['fish', Fish, 'মাছ', 'Fish']];

export default function ConsultancySection() {
  const { language } = useLanguage();
  const label = (bn, en) => (language === 'bn' ? bn : en);
  return (
    <section className="section-space">
      <div className="page-container">
        <div className="consult-hero-grid overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-[0_22px_50px_rgba(20,80,40,.1)] sm:p-9">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-800">
              <MessageSquareHeart size={15} /> {label('১০০% বিনামূল্যে ডাক্তার সেবা', '100% free doctor service')}
            </span>
            <h2 className="mt-4 flex items-center gap-2 text-3xl font-bold leading-tight text-zinc-900 md:text-4xl">
              <Stethoscope className="text-green-700" />{label('বিনামূল্যে অনলাইন ভেট চ্যাট', 'Free online vet chat')}
            </h2>
            <p className="mt-3 max-w-xl text-zinc-600">
              {label(
                'আবেদন করুন → সাপোর্ট টিম ডাক্তার যুক্ত করবেন → সরাসরি চ্যাটে পরামর্শ নিন। প্রাণীর ধরন বেছে এখনই শুরু করুন।',
                'Apply → support connects a doctor → chat directly. Pick a pet type to begin now.'
              )}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {pets.map(([type, Icon, bn, en]) => (
              <Link
                key={type}
                to={`/consultation/apply?petType=${type}`}
                className="consult-3d-card group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-4 text-left transition hover:-translate-y-2"
              >
                <span className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-green-100 blur-xl" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-green-700"><Icon size={26} /></span>
                <span className="relative mt-4 block text-lg font-bold text-zinc-900">{language === 'bn' ? bn : en}</span>
                <span className="relative mt-1 flex items-center gap-1 text-[11px] font-semibold text-green-700"><HeartPulse size={12} />{label('ফ্রি পরামর্শ নিন', 'Get free advice')}</span>
                <span className="relative mt-4 flex w-full items-center justify-between rounded-xl bg-green-600 px-3 py-2 text-xs font-bold text-white transition group-hover:bg-green-700">
                  {label('শুরু করুন', 'Start')} <ArrowUpRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
