import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bird, Cat, CheckCircle2, ClipboardList, Dog, Fish, MessageSquareHeart, ShieldCheck, Stethoscope, Ticket } from 'lucide-react';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { petLabel } from '../config/taxonomy.js';
import { site } from '../config/site.js';

const petIcons = { cat: Cat, dog: Dog, bird: Bird, fish: Fish };
const statusStyles = {
  pending: 'bg-amber-100 text-amber-800',
  active: 'bg-green-100 text-green-800',
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
    pending: label('অপেক্ষমাণ', 'Pending'),
    active: label('চলমান চ্যাট', 'Live chat'),
    completed: label('সম্পন্ন', 'Completed'),
    cancelled: label('বাতিল', 'Cancelled')
  }[status] || status);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-green-900 text-white">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-700/40 blur-3xl" />
        <div className="page-container relative grid gap-8 py-14 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-green-100">
              <MessageSquareHeart size={16} /> {label('১০০% বিনামূল্যে', '100% free')}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              {label('বিনামূল্যে অনলাইন ভেট চ্যাট', 'Free online vet chat')}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-green-100">
              {label(
                `আবেদন করুন, আমাদের সাপোর্ট টিম যাচাই করে একজন অভিজ্ঞ ডাক্তারকে যুক্ত করবেন — সাধারণত ${site.responseWindow} ঘণ্টার মধ্যে। কোনো খরচ ছাড়াই সরাসরি চ্যাটে পরামর্শ নিন।`,
                `Apply, our support team reviews it and connects an experienced doctor — usually within ${site.responseWindow} hours. Chat directly, at no cost.`
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/consultation/apply" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-zinc-900 transition hover:bg-secondary">
                {label('ফ্রি পরামর্শ শুরু করুন', 'Start free consultation')} <ArrowRight size={18} />
              </Link>
              {tickets.length > 0 && (
                <a href="#my-tickets" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10">
                  {label('আমার টিকেট', 'My tickets')}
                </a>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-green-100">
              {[label('কোনো ফি নেই', 'No fees'), label('অভিজ্ঞ পশু চিকিৎসক', 'Experienced vets'), label('সরাসরি চ্যাট', 'Direct chat')].map((item) => (
                <span key={item} className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green-300" />{item}</span>
              ))}
            </div>
          </div>

          {/* Quick start by pet */}
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm font-bold text-green-100">{label('প্রাণী বেছে নিয়ে শুরু করুন', 'Start by choosing a pet')}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {['dog', 'cat', 'bird', 'fish'].map((type) => {
                const Icon = petIcons[type];
                return (
                  <Link key={type} to={`/consultation/apply?petType=${type}`} className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 p-5 transition hover:bg-white/20">
                    <Icon size={30} className="text-primary" />
                    <span className="font-bold">{petLabel(type, language)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* My tickets */}
      {user && tickets.length > 0 && (
        <section id="my-tickets" className="page-container section-space">
          <h2 className="section-heading">{label('আমার পরামর্শসমূহ', 'My consultations')}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <Link key={ticket._id} to={`/consultation/ticket/${ticket._id}`} className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-card transition hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-500"><Ticket size={13} />{ticket.ticketNumber}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyles[ticket.status] || 'bg-zinc-100'}`}>{statusLabel(ticket.status)}</span>
                </div>
                <p className="mt-3 font-bold text-zinc-800">{petLabel(ticket.petType, language)}{ticket.petName ? ` · ${ticket.petName}` : ''}</p>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{ticket.problem}</p>
                {ticket.assignedDoctor && <p className="mt-2 text-xs font-semibold text-green-700">{ticket.assignedDoctor.name}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="page-container section-space">
        <h2 className="section-heading text-center">{label('কীভাবে কাজ করে', 'How it works')}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            [ClipboardList, label('১. আবেদন করুন', '1. Apply'), label('প্রাণীর ধরন, বয়স, সমস্যা ও ছবি/ভিডিও দিয়ে সহজ ফর্মটি পূরণ করুন।', 'Fill the short form with pet type, age, problem and a photo/video.')],
            [ShieldCheck, label('২. যাচাই ও সংযোগ', '2. Review & connect'), label('সাপোর্ট টিম আবেদন নিশ্চিত করে একজন উপযুক্ত ডাক্তারকে যুক্ত করেন।', 'Support confirms your request and connects the right doctor.')],
            [Stethoscope, label('৩. লাইভ চ্যাট', '3. Live chat'), label('ডাক্তারের সাথে সরাসরি চ্যাটে আপনার প্রাণীর সমস্যা নিয়ে কথা বলুন।', 'Chat live with the doctor about your companion’s problem.')]
          ].map(([Icon, title, text]) => (
            <article key={title} className="rounded-2xl bg-white p-6 text-center shadow-card">
              <Icon className="mx-auto text-primary" size={36} />
              <h3 className="mt-3 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Our vets */}
      {doctors.length > 0 && (
        <section className="bg-white py-14">
          <div className="page-container">
            <h2 className="section-heading text-center">{label('আমাদের পশু চিকিৎসক দল', 'Our veterinary team')}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <article key={doctor._id} className="flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-5 shadow-card">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-green-100 text-lg font-bold text-green-800">
                    {doctor.name.replace('ডা. ', '').slice(0, 1)}
                  </span>
                  <div>
                    <p className="font-bold text-zinc-900">{doctor.name}</p>
                    <p className="text-sm text-zinc-500">{doctor.specialization}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold">
                      <span className={`h-2 w-2 rounded-full ${doctor.isOnline ? 'bg-green-500' : 'bg-zinc-300'}`} />
                      <span className={doctor.isOnline ? 'text-green-700' : 'text-zinc-400'}>{doctor.isOnline ? label('অনলাইন', 'Online') : label('অফলাইন', 'Offline')}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="page-container section-space max-w-3xl">
        <h2 className="section-heading text-center">{label('সাধারণ প্রশ্ন', 'FAQ')}</h2>
        <div className="mt-6 space-y-3">
          {[
            [label('এটি কি সত্যিই বিনামূল্যে?', 'Is it really free?'), label('হ্যাঁ, অনলাইন প্রাথমিক পরামর্শ সম্পূর্ণ বিনামূল্যে।', 'Yes, the initial online consultation is completely free.')],
            [label('কতক্ষণে ডাক্তার যুক্ত হবেন?', 'How soon does a doctor join?'), label(`সাধারণত ${site.responseWindow} ঘণ্টার মধ্যে সাপোর্ট টিম একজন ডাক্তারকে যুক্ত করেন।`, `Usually within ${site.responseWindow} hours the support team connects a doctor.`)],
            [label('জরুরি অবস্থায় কী করব?', 'What about emergencies?'), label('গুরুতর অবস্থায় দ্রুত নিকটস্থ পশু চিকিৎসালয়ে যান। এই চ্যাট জরুরি সেবার বিকল্প নয়।', 'For serious cases, visit the nearest vet clinic. This chat is not a substitute for emergency care.')]
          ].map(([q, a]) => (
            <details key={q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <summary className="cursor-pointer font-bold">{q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
