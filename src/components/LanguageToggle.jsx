import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function LanguageToggle({ compact = false }) {
  const { language, setLanguage, t } = useLanguage();
  return <div className={`flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-xs font-bold ${compact ? '' : 'gap-1'}`} aria-label={t('language')}>
    {!compact && <Languages size={14} className="ml-1 text-zinc-500" />}
    <button onClick={() => setLanguage('bn')} className={`rounded-lg px-2 py-1 transition ${language === 'bn' ? 'bg-[#f4c52a] text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}>বাং</button>
    <button onClick={() => setLanguage('en')} className={`rounded-lg px-2 py-1 transition ${language === 'en' ? 'bg-[#f4c52a] text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}>EN</button>
  </div>;
}
