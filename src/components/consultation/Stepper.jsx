import { Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const steps = [
  { bn: 'আবেদন ফর্ম', en: 'Application' },
  { bn: 'অপেক্ষা', en: 'Waiting' },
  { bn: 'চ্যাট শুরু', en: 'Chat' }
];

// current: 1 | 2 | 3
export default function Stepper({ current = 1 }) {
  const { language } = useLanguage();
  return (
    <ol className="mx-auto flex w-full max-w-3xl items-center">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const done = stepNumber < current;
        const active = stepNumber === current;
        return (
          <li key={step.en} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                  done ? 'bg-violet-600 text-white' : active ? 'bg-primary text-white ring-4 ring-violet-100' : 'bg-zinc-200 text-zinc-500'
                }`}
              >
                {done ? <Check size={18} /> : stepNumber}
              </span>
              <span className={`whitespace-nowrap text-sm font-bold ${active || done ? 'text-zinc-900' : 'text-zinc-400'}`}>
                {language === 'bn' ? step.bn : step.en}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span className={`mx-3 h-0.5 flex-1 rounded-full ${done ? 'bg-violet-500' : 'bg-zinc-200'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
