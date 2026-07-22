import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Beef, Bird, Egg, Info, Loader2, PawPrint, Sprout, Upload, X } from 'lucide-react';
import api from '../api/client.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { CONSULTATION_ANIMALS, PET_AGES } from '../config/taxonomy.js';
import { site } from '../config/site.js';
import Stepper from '../components/consultation/Stepper.jsx';

const petIcons = { cow: Beef, goat: Sprout, duck: Bird, chicken: Egg };
const MAX_SIZE = 20 * 1024 * 1024;

export default function ConsultationApply() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    petType: CONSULTATION_ANIMALS.some((p) => p.value === params.get('petType')) ? params.get('petType') : 'cow',
    petName: '',
    petAge: '1-2y',
    breed: '',
    gender: 'male',
    problem: ''
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  function addFiles(fileList) {
    const incoming = [...fileList];
    const tooBig = incoming.find((file) => file.size > MAX_SIZE);
    if (tooBig) { setError(language === 'bn' ? 'প্রতিটি ফাইল সর্বোচ্চ ২০MB হতে পারবে।' : 'Each file must be under 20MB.'); return; }
    setError('');
    setFiles((current) => [...current, ...incoming].slice(0, 4));
  }

  async function submit(event) {
    event.preventDefault();
    if (form.problem.trim().length < 10) { setError(language === 'bn' ? 'সমস্যাটি অন্তত ১০ অক্ষরে লিখুন।' : 'Describe the problem in at least 10 characters.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      files.forEach((file) => payload.append('attachments', file));
      const { data } = await api.post('/consultations', payload);
      navigate(`/consultation/ticket/${data.consultation._id}`);
    } catch (err) {
      setError(err.response?.data?.message || (language === 'bn' ? 'আবেদন পাঠানো যায়নি।' : 'Could not submit the application.'));
      setSubmitting(false);
    }
  }

  const label = (bn, en) => (language === 'bn' ? bn : en);

  return (
    <main className="bg-[#fbfaff] pb-16">
      <section className="consult-apply-top py-8 text-white">
        <div className="page-container">
          <p className="flex items-center justify-center gap-2 text-center text-sm font-bold text-violet-100">
            <PawPrint size={16} /> {label('বিনামূল্যে পশু চিকিৎসা পরামর্শ', 'Free veterinary consultation')}
          </p>
        </div>
      </section>

      <div className="page-container -mt-6">
        <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-card"><Stepper current={1} /></div>

        <form onSubmit={submit} className="mt-5 space-y-5">
          {/* Pet type */}
          <Panel icon={PawPrint} title={label('পোষা প্রাণীর ধরন', 'Pet type')}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CONSULTATION_ANIMALS.map((pet) => {
                const Icon = petIcons[pet.value];
                const selected = form.petType === pet.value;
                return (
                  <button
                    type="button"
                    key={pet.value}
                    onClick={() => set('petType', pet.value)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${selected ? 'border-violet-500 bg-violet-50' : 'border-zinc-200 hover:border-violet-200'}`}
                  >
                    <Icon size={28} className={selected ? 'text-violet-600' : 'text-zinc-500'} />
                    <span className={`text-sm font-bold ${selected ? 'text-zinc-900' : 'text-zinc-600'}`}>{language === 'bn' ? pet.bn : pet.en}</span>
                  </button>
                );
              })}
            </div>
          </Panel>

          {/* Pet info */}
          <Panel icon={Info} title={label('প্রাণীর তথ্য', 'Pet details')}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormRow label={label('নাম (ঐচ্ছিক)', 'Name (optional)')}>
                <input value={form.petName} onChange={(e) => set('petName', e.target.value)} placeholder={label('যেমন: টমি', 'e.g. Tommy')} className={inputClass} />
              </FormRow>
              <FormRow label={label('বয়স', 'Age')}>
                <select value={form.petAge} onChange={(e) => set('petAge', e.target.value)} className={inputClass}>
                  {PET_AGES.map((age) => <option key={age.value} value={age.value}>{language === 'bn' ? age.bn : age.en}</option>)}
                </select>
              </FormRow>
              <FormRow label={label('জাত / Breed', 'Breed')}>
                <input value={form.breed} onChange={(e) => set('breed', e.target.value)} placeholder={label('যেমন: Labrador', 'e.g. Labrador')} className={inputClass} />
              </FormRow>
              <FormRow label={label('লিঙ্গ', 'Gender')}>
                <select value={form.gender} onChange={(e) => set('gender', e.target.value)} className={inputClass}>
                  <option value="male">{label('পুরুষ', 'Male')}</option>
                  <option value="female">{label('মহিলা', 'Female')}</option>
                </select>
              </FormRow>
            </div>
          </Panel>

          {/* Problem + media */}
          <Panel icon={Info} title={label('সমস্যার বিবরণ', 'Problem details')}>
            <FormRow label={label('সমস্যাটি কী?', 'What is the problem?')}>
              <textarea
                value={form.problem}
                onChange={(e) => set('problem', e.target.value)}
                rows="4"
                placeholder={label('যেমন: গত ২ দিন ধরে খাচ্ছে না, দুর্বল মনে হচ্ছে...', 'e.g. Not eating for 2 days, seems weak...')}
                className={inputClass}
              />
            </FormRow>
            <div className="mt-4">
              <p className="mb-1.5 text-sm font-semibold text-zinc-700">{label('ছবি / ভিডিও আপলোড করুন', 'Upload photo / video')}</p>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-7 text-center transition hover:border-primary">
                <Upload size={22} className="text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-600">{label('ছবি বা ভিডিও বেছে নিন', 'Choose a photo or video')}</span>
                <span className="text-xs text-zinc-400">JPG, PNG, MP4 · {label('সর্বোচ্চ', 'max')} 20MB</span>
                <input type="file" multiple accept="image/*,video/mp4" className="hidden" onChange={(e) => addFiles(e.target.files)} />
              </label>
              {files.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <span key={index} className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600">
                      <span className="max-w-[160px] truncate">{file.name}</span>
                      <button type="button" onClick={() => setFiles(files.filter((_, i) => i !== index))} className="text-zinc-500 hover:text-red-500"><X size={13} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Panel>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

          <div className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-900">
            <Info size={15} className="mr-1 inline" />
            {label(
              `এই সেবাটি সম্পূর্ণ বিনামূল্যে। আবেদন পাওয়ার পর সাপোর্ট টিম যাচাই করে ${site.responseWindow} ঘণ্টার মধ্যে ডাক্তারকে চ্যাটে যুক্ত করবেন। জরুরি ক্ষেত্রে নিকটস্থ ভেটে যান।`,
              `This service is completely free. After you apply, a doctor joins the chat within ${site.responseWindow} hours. In an emergency, visit the nearest vet.`
            )}
          </div>

          <button disabled={submitting} className="btn-primary flex w-full items-center justify-center gap-2 py-3 text-base">
            {submitting && <Loader2 size={18} className="animate-spin" />}
            {label('আবেদন জমা দিন', 'Submit application')}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputClass = 'w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100';

function Panel({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-card sm:p-6">
      <h3 className="mb-4 flex items-center gap-2 font-bold text-zinc-900"><Icon size={18} className="text-violet-600" /> {title}</h3>
      {children}
    </section>
  );
}

function FormRow({ label, children }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-semibold text-zinc-700">{label}</span>{children}</label>;
}
