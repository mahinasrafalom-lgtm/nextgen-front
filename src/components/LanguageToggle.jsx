import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function LanguageToggle({ compact = false }) {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 p-0.5 text-xs font-bold" aria-label={t('language')}>
      {!compact && <Languages size={14} className="ml-2 text-zinc-500" />}
      <button
        onClick={() => setLanguage('bn')}
        className={`rounded-full px-3 py-1.5 transition ${language === 'bn' ? 'bg-primary-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
      >
        বাংলা
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1.5 transition ${language === 'en' ? 'bg-primary-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
      >
        EN
      </button>
    </div>
  );
}
