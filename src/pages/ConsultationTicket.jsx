import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useConsultationChat } from '../hooks/useConsultationChat.js';
import Stepper from '../components/consultation/Stepper.jsx';
import WaitingRoom from '../components/consultation/WaitingRoom.jsx';
import ChatRoom from '../components/consultation/ChatRoom.jsx';

export default function ConsultationTicket() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { consultation, queuePosition, messages, loading, error, sending, peerTyping, sendMessage, emitTyping } = useConsultationChat(id);
  const [entered, setEntered] = useState(false);

  // Auto-advance to the chat once the ticket goes live (doctor assigned / staff replied).
  useEffect(() => {
    if (consultation && consultation.status !== 'pending') setEntered(true);
  }, [consultation]);

  if (loading) {
    return <main className="grid min-h-[60vh] place-items-center"><Loader2 className="animate-spin text-primary" size={32} /></main>;
  }
  if (error || !consultation) {
    return (
      <main className="page-container grid min-h-[60vh] place-items-center text-center">
        <div>
          <p className="text-lg font-bold text-zinc-800">{error || (language === 'bn' ? 'টিকেটটি পাওয়া যায়নি।' : 'Ticket not found.')}</p>
          <Link to="/consultation" className="btn-primary mt-4 inline-block">{language === 'bn' ? 'পরামর্শ পেজে ফিরুন' : 'Back to consultation'}</Link>
        </div>
      </main>
    );
  }

  const inChat = entered || consultation.status !== 'pending';

  return (
    <main className="bg-[#f6f8f6] pb-16">
      <div className="page-container pt-6">
        <Link to="/consultation" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-zinc-800">
          <ArrowLeft size={16} /> {language === 'bn' ? 'আমার পরামর্শসমূহ' : 'My consultations'}
        </Link>
        <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-card"><Stepper current={inChat ? 3 : 2} /></div>

        <div className="mt-6">
          {inChat ? (
            <ChatRoom
              consultation={consultation}
              messages={messages}
              sending={sending}
              peerTyping={peerTyping}
              onSend={sendMessage}
              onTyping={emitTyping}
            />
          ) : (
            <WaitingRoom consultation={consultation} queuePosition={queuePosition} onEnterChat={() => setEntered(true)} />
          )}
        </div>
      </div>
    </main>
  );
}
