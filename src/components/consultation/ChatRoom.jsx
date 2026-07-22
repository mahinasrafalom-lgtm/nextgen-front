import { useEffect, useRef, useState } from 'react';
import { Paperclip, Send, ShieldCheck, Stethoscope, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const timeFormat = (value) =>
  value ? new Intl.DateTimeFormat('bn-BD', { hour: '2-digit', minute: '2-digit' }).format(new Date(value)) : '';

export default function ChatRoom({ consultation, messages, sending, peerTyping, onSend, onTyping }) {
  const { language } = useLanguage();
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const bottomRef = useRef(null);
  const typingRef = useRef(null);

  const doctor = consultation.assignedDoctor;
  const waiting = consultation.status === 'pending';
  const closed = consultation.status === 'completed' || consultation.status === 'cancelled';

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length, peerTyping]);

  async function submit(event) {
    event.preventDefault();
    if ((!text.trim() && !file) || sending) return;
    try {
      await onSend({ text, file });
      setText('');
      setFile(null);
    } catch { /* error surfaced by the hook */ }
  }

  function handleType(value) {
    setText(value);
    onTyping?.(true);
    clearTimeout(typingRef.current);
    typingRef.current = setTimeout(() => onTyping?.(false), 1500);
  }

  return (
    <div className="mx-auto flex h-[70vh] max-w-3xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-card">
      {/* Doctor / support header */}
      <div className="flex items-center justify-between gap-3 bg-violet-900 px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-lg font-bold">
            {doctor ? doctor.name.replace('ডা. ', '').slice(0, 1) : <Stethoscope size={20} />}
          </span>
          <div>
            <p className="font-bold leading-tight">{doctor ? doctor.name : language === 'bn' ? 'সাপোর্ট টিম' : 'Support team'}</p>
            <p className="flex items-center gap-1.5 text-xs text-violet-200">
              <span className={`h-2 w-2 rounded-full ${doctor?.isOnline ? 'bg-pink-400' : 'bg-zinc-400'}`} />
              {doctor
                ? `${doctor.isOnline ? (language === 'bn' ? 'অনলাইন' : 'Online') : language === 'bn' ? 'অফলাইন' : 'Offline'} · ${doctor.specialization}`
                : language === 'bn' ? 'শীঘ্রই একজন ডাক্তার যুক্ত হবেন' : 'A doctor will join soon'}
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold sm:flex">
          <ShieldCheck size={14} /> {language === 'bn' ? 'ফ্রি কনসালটেশন' : 'Free consultation'}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-[#f4f7f4] px-4 py-5">
        {waiting && (
          <p className="mx-auto w-fit rounded-full bg-amber-100 px-4 py-1.5 text-center text-xs font-semibold text-amber-800">
            {language === 'bn'
              ? 'আপনার আবেদন যাচাই করা হচ্ছে। বার্তা লিখে রাখুন — ডাক্তার যুক্ত হলেই দেখতে পাবেন।'
              : 'Your application is being reviewed. Feel free to write — the doctor will see it once connected.'}
          </p>
        )}
        {messages.map((message) =>
          message.system ? (
            <p key={message._id} className="mx-auto w-fit max-w-[85%] rounded-full bg-violet-100 px-4 py-1.5 text-center text-xs font-medium text-violet-800">
              {message.text}
            </p>
          ) : (
            <MessageBubble key={message._id} message={message} mine={message.sender === 'user'} />
          )
        )}
        {peerTyping && (
          <div className="flex w-fit items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <form onSubmit={submit} className="border-t border-zinc-100 bg-white p-3">
        {file && (
          <div className="mb-2 flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600">
            <Paperclip size={13} /> <span className="max-w-[220px] truncate">{file.name}</span>
            <button type="button" onClick={() => setFile(null)} className="ml-auto text-zinc-500 hover:text-red-500"><X size={14} /></button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <label className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 ${closed ? 'pointer-events-none opacity-50' : ''}`}>
            <Paperclip size={19} />
            <input type="file" accept="image/*,video/mp4" className="hidden" disabled={closed} onChange={(event) => setFile(event.target.files?.[0] || null)} />
          </label>
          <input
            value={text}
            disabled={closed}
            onChange={(event) => handleType(event.target.value)}
            placeholder={closed ? (language === 'bn' ? 'এই পরামর্শটি বন্ধ হয়ে গেছে' : 'This consultation is closed') : language === 'bn' ? 'মেসেজ লিখুন...' : 'Type a message...'}
            className="min-w-0 flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={sending || closed || (!text.trim() && !file)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-white transition hover:bg-secondary disabled:opacity-50"
            aria-label={language === 'bn' ? 'পাঠান' : 'Send'}
          >
            <Send size={19} />
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageBubble({ message, mine }) {
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[78%] ${mine ? 'items-end' : 'items-start'}`}>
        {!mine && message.senderName && (
          <p className="mb-1 ml-1 text-[11px] font-bold text-violet-800">{message.senderName}</p>
        )}
        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${mine ? 'rounded-br-sm bg-violet-700 text-white' : 'rounded-bl-sm bg-white text-zinc-800'}`}>
          {message.attachment?.url && (
            message.attachment.type === 'video' ? (
              <video src={message.attachment.url} controls className="mb-1.5 max-h-60 rounded-lg" />
            ) : (
              <img src={message.attachment.url} alt="" className="mb-1.5 max-h-60 rounded-lg" />
            )
          )}
          {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
        </div>
        <p className={`mt-1 text-[10px] text-zinc-400 ${mine ? 'text-right' : 'text-left'}`}>{timeFormat(message.createdAt)}</p>
      </div>
    </div>
  );
}

function Dot({ delay = '0ms' }) {
  return <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: delay }} />;
}
