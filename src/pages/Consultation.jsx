import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Beef, Bird, CheckCircle2, ClipboardList, Egg, HeartPulse, MessageSquareHeart, ShieldCheck, Sprout, Stethoscope, Ticket } from 'lucide-react';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { consultationAnimalLabel } from '../config/taxonomy.js';
import { site } from '../config/site.js';

const animalCards = [
  ['cow', Beef, 'গরু', 'Cow', 'গরুর খাওয়া, জ্বর, দুধ উৎপাদন ও সাধারণ স্বাস্থ্য নিয়ে সাহায্য নিন।', 'Get help with feeding, fever, milk production and everyday cattle health.'],
  ['goat', Sprout, 'ছাগল', 'Goat', 'ছাগলের পুষ্টি, দুর্বলতা, পেটের সমস্যা ও পরিচর্যা বিষয়ে পরামর্শ নিন।', 'Ask about nutrition, weakness, digestive concerns and everyday goat care.'],
  ['duck', Bird, 'হাঁস', 'Duck', 'হাঁসের খাওয়া, চলাফেরা, পরিচ্ছন্নতা ও সাধারণ রোগের লক্ষণ নিয়ে কথা বলুন।', 'Discuss feeding, movement, hygiene and common signs of illness in ducks.'],
  ['chicken', Egg, 'মুরগি', 'Chicken', 'পোল্ট্রির দুর্বলতা, খাবার, ডিম দেওয়া ও সুস্থতার বিষয়ে পরামর্শ নিন।', 'Get advice on weakness, feed, egg laying and wellbeing for chickens.']
];

const statusStyles = {
  pending: 'bg-amber-100 text-amber-800',
  active: 'bg-violet-100 text-violet-800',
  completed: 'bg-zinc-200 text-zinc-600',
  cancelled: 'bg-red-100 text-red-700'
};

export default function Consultation() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [doctors, setDoctors] = useState([]);
  const [tickets, setTickets] = useState([]);
  const label = (bn, en) => (language === 'bn' ? bn : en);

  useEffect(() => { api.get('/doctors/public').then(({ data }) => setDoctors(data)).catch(() => setDoctors([])); }, []);
  useEffect(() => { if (user) api.get('/consultations/mine').then(({ data }) => setTickets(data)).catch(() => setTickets([])); }, [user]);

  const statusLabel = (status) => ({
    pending: label('অপেক্ষমাণ', 'Pending'), active: label('চলমান চ্যাট', 'Live chat'), completed: label('সম্পন্ন', 'Completed'), cancelled: label('বাতিল', 'Cancelled')
  }[status] || status);

  return <main className="consultation-page">
    <section className="consultation-hero relative overflow-hidden">
      <div className="consultation-hero-orb consultation-hero-orb-one" /><div className="consultation-hero-orb consultation-hero-orb-two" />
      <div className="page-container relative py-14 text-center lg:py-20">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-black text-violet-700 shadow-sm"><HeartPulse size={17} className="text-pink-500" /> {label('১০০% বিনামূল্যে পশু চিকিৎসা সেবা', '100% free veterinary care')}</span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight text-violet-950 sm:text-5xl">{label('বুক নাউ থেকে আপনার প্রাণীর জন্য কনসালটেশন বেছে নিন।', 'Choose a consultation for your animal from Book now.')}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-violet-950/70">{label(`আবেদন পাঠান, আমাদের সাপোর্ট টিম যাচাই করে ${site.responseWindow} ঘণ্টার মধ্যে উপযুক্ত ডাক্তারকে চ্যাটে যুক্ত করবে।`, `Send an application. Our support team reviews it and connects the right doctor in chat, usually within ${site.responseWindow} hours.`)}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-violet-800">{[label('কোনো ফি নেই', 'No fees'), label('অভিজ্ঞ পশু চিকিৎসক', 'Experienced vets'), label('সরাসরি ব্যক্তিগত চ্যাট', 'Private direct chat')].map((item) => <span key={item} className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-pink-500" />{item}</span>)}</div>
      </div>
    </section>

    <section className="page-container -mt-6 pb-5">
      <div className="consultation-picker rounded-[2rem] border border-violet-100 bg-white p-5 shadow-[0_20px_45px_rgba(83,60,167,.12)] sm:p-7">
        <div className="mb-6 text-center"><p className="text-xs font-black uppercase tracking-[.16em] text-pink-500">BOOK NOW</p><h2 className="mt-2 text-2xl font-black text-zinc-900">{label('কোন প্রাণীর জন্য পরামর্শ চান?', 'Which animal needs care?')}</h2><p className="mt-2 text-sm text-zinc-500">{label('একটি অপশন বেছে নিন, তারপর সংক্ষিপ্ত আবেদন ফর্মটি পূরণ করুন।', 'Choose one option, then complete the short application form.')}</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{animalCards.map(([type, Icon, bn, en, descriptionBn, descriptionEn]) => <Link key={type} to={`/consultation/apply?petType=${type}`} className="animal-consult-card group"><span className="animal-consult-icon"><Icon size={33} /></span><h3>{language === 'bn' ? bn : en}</h3><p>{language === 'bn' ? descriptionBn : descriptionEn}</p><span className="animal-consult-action">{label('বুক নাউ', 'Book now')} <ArrowRight size={16} /></span></Link>)}</div>
      </div>
    </section>

    {user && tickets.length > 0 && <section id="my-tickets" className="page-container section-space"><h2 className="section-heading">{label('আমার আবেদনসমূহ', 'My applications')}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{tickets.map((ticket) => <Link key={ticket._id} to={`/consultation/ticket/${ticket._id}`} className="rounded-2xl border border-violet-100 bg-white p-4 shadow-card transition hover:-translate-y-1"><div className="flex items-center justify-between"><span className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-500"><Ticket size={13} />{ticket.ticketNumber}</span><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyles[ticket.status] || 'bg-zinc-100'}`}>{statusLabel(ticket.status)}</span></div><p className="mt-3 font-bold text-zinc-800">{consultationAnimalLabel(ticket.petType, language)}{ticket.petName ? ` · ${ticket.petName}` : ''}</p><p className="mt-1 line-clamp-2 text-sm text-zinc-500">{ticket.problem}</p>{ticket.assignedDoctor && <p className="mt-2 text-xs font-semibold text-violet-700">{ticket.assignedDoctor.name}</p>}</Link>)}</div></section>}

    <section className="page-container section-space"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-black uppercase tracking-[.16em] text-pink-500">HOW IT WORKS</p><h2 className="mt-2 section-heading">{label('আবেদন থেকে ডাক্তার চ্যাট—তিনটি সহজ ধাপ।', 'From application to doctor chat in three simple steps.')}</h2></div><div className="mt-8 grid gap-4 md:grid-cols-3">{[[ClipboardList, label('১. আবেদন করুন', '1. Apply'), label('প্রাণীর ধরন, বয়স, সমস্যা ও প্রয়োজন হলে ছবি বা ভিডিও দিয়ে সহজ ফর্মটি পূরণ করুন।', 'Complete the short form with animal type, age, concern and an optional photo or video.')], [ShieldCheck, label('২. যাচাই ও সংযোগ', '2. Review & connect'), label('সাপোর্ট টিম আবেদন নিশ্চিত করে একজন উপযুক্ত ডাক্তারকে যুক্ত করেন।', 'The support team confirms the request and matches the right doctor.')], [Stethoscope, label('৩. লাইভ চ্যাট', '3. Live chat'), label('নিশ্চিত হওয়ার পর সরাসরি চ্যাটে আপনার প্রাণীর সমস্যা নিয়ে কথা বলুন।', 'Once confirmed, discuss your animal’s concern directly in chat.')]].map(([Icon, title, text]) => <article key={title} className="how-it-works-card"><span><Icon size={31} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    {doctors.length > 0 && <section className="bg-violet-50/70 py-14"><div className="page-container"><h2 className="section-heading text-center">{label('আমাদের পশু চিকিৎসক দল', 'Our veterinary team')}</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{doctors.map((doctor) => <article key={doctor._id} className="flex items-center gap-4 rounded-2xl border border-violet-100 bg-white p-5 shadow-card"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-pink-100 text-lg font-black text-pink-700">{doctor.name.replace('ডা. ', '').slice(0, 1)}</span><div><p className="font-bold text-zinc-900">{doctor.name}</p><p className="text-sm text-zinc-500">{doctor.specialization}</p><p className="mt-1 flex items-center gap-1.5 text-xs font-semibold"><span className={`h-2 w-2 rounded-full ${doctor.isOnline ? 'bg-violet-500' : 'bg-zinc-300'}`} /><span className={doctor.isOnline ? 'text-violet-700' : 'text-zinc-400'}>{doctor.isOnline ? label('অনলাইন', 'Online') : label('অফলাইন', 'Offline')}</span></p></div></article>)}</div></div></section>}

    <section className="page-container section-space max-w-3xl"><h2 className="section-heading text-center">{label('সাধারণ প্রশ্ন', 'FAQ')}</h2><div className="mt-6 space-y-3">{[[label('এটি কি সত্যিই বিনামূল্যে?', 'Is it really free?'), label('হ্যাঁ, অনলাইন প্রাথমিক পরামর্শ সম্পূর্ণ বিনামূল্যে।', 'Yes, the initial online consultation is completely free.')], [label('কতক্ষণে ডাক্তার যুক্ত হবেন?', 'How soon does a doctor join?'), label(`সাধারণত ${site.responseWindow} ঘণ্টার মধ্যে সাপোর্ট টিম একজন ডাক্তারকে যুক্ত করেন।`, `Usually within ${site.responseWindow}, the support team connects a doctor.`)], [label('জরুরি অবস্থায় কী করব?', 'What about emergencies?'), label('গুরুতর অবস্থায় দ্রুত নিকটস্থ পশু চিকিৎসালয়ে যান। এই চ্যাট জরুরি সেবার বিকল্প নয়।', 'For serious cases, visit the nearest vet clinic. This chat is not a substitute for emergency care.')]].map(([q, a]) => <details key={q} className="rounded-xl border border-violet-100 bg-white p-4"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-2 text-sm text-zinc-600">{a}</p></details>)}</div></section>
  </main>;
}
