import { ArrowRight, CheckCircle2, Clock, Ticket, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const bnNumber = (value) => new Intl.NumberFormat('bn-BD').format(value);

export default function WaitingRoom({ consultation, queuePosition, onEnterChat }) {
  const { language } = useLanguage();
  const estimateMinutes = Math.max(2, (queuePosition || 1) * 3);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-b from-green-50 to-white p-8 text-center shadow-card">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-600 text-white shadow-lg">
          <CheckCircle2 size={34} />
        </span>
        <h2 className="mt-4 text-2xl font-bold text-green-900">
          {language === 'bn' ? 'আবেদন সফলভাবে জমা হয়েছে' : 'Application submitted successfully'}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">{language === 'bn' ? 'আপনার টিকেট নম্বর' : 'Your ticket number'}</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2 font-mono text-lg font-bold tracking-wide text-green-800">
          <Ticket size={18} /> {consultation.ticketNumber}
        </div>
        <p className="mt-4 text-zinc-600">
          {language === 'bn'
            ? 'আমাদের সাপোর্ট টিম আবেদনটি যাচাই করে শীঘ্রই একজন ডাক্তারকে যুক্ত করবেন।'
            : 'Our support team will review your application and connect a doctor shortly.'}
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-card">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-amber-700">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
          </span>
          {language === 'bn' ? 'ডাক্তারের সংযোগের অপেক্ষায়…' : 'Waiting for a doctor to connect…'}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-zinc-50 p-4 text-center">
            <Clock className="mx-auto text-zinc-400" size={20} />
            <p className="mt-2 text-2xl font-bold text-zinc-900">
              {language === 'bn' ? `~${bnNumber(estimateMinutes)}` : `~${estimateMinutes}`}
              <span className="ml-1 text-sm font-semibold text-zinc-500">{language === 'bn' ? 'মিনিট' : 'min'}</span>
            </p>
            <p className="text-xs text-zinc-500">{language === 'bn' ? 'আনুমানিক অপেক্ষা' : 'Estimated wait'}</p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 text-center">
            <Users className="mx-auto text-zinc-400" size={20} />
            <p className="mt-2 text-2xl font-bold text-zinc-900">{language === 'bn' ? bnNumber(queuePosition || 1) : queuePosition || 1}</p>
            <p className="text-xs text-zinc-500">{language === 'bn' ? 'লাইনে আপনার অবস্থান' : 'Your place in line'}</p>
          </div>
        </div>
        <button onClick={onEnterChat} className="btn-primary mt-6 flex w-full items-center justify-center gap-2">
          {language === 'bn' ? 'চ্যাট রুমে যান' : 'Go to chat room'} <ArrowRight size={18} />
        </button>
        <p className="mt-3 text-center text-xs text-zinc-400">
          {language === 'bn'
            ? 'চ্যাট রুমে গিয়ে আপনি এখনই আপনার সমস্যার বিস্তারিত লিখে রাখতে পারেন।'
            : 'You can start describing your problem in the chat room right away.'}
        </p>
      </div>
    </div>
  );
}
