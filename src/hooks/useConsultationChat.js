import { useCallback, useEffect, useRef, useState } from 'react';
import api from '../api/client.js';
import { getSocket } from '../api/socket.js';

// Manages a single consultation's live thread: loads detail + messages, joins the
// socket room for realtime pushes, and polls periodically as a safety net.
export function useConsultationChat(consultationId) {
  const [consultation, setConsultation] = useState(null);
  const [queuePosition, setQueuePosition] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [peerTyping, setPeerTyping] = useState(false);
  const typingTimer = useRef(null);

  // Merge helper: dedupe by _id, keep chronological order.
  const mergeMessages = useCallback((incoming) => {
    setMessages((current) => {
      const map = new Map(current.map((message) => [message._id, message]));
      incoming.forEach((message) => map.set(message._id, message));
      return [...map.values()].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });
  }, []);

  const loadDetail = useCallback(async () => {
    const { data } = await api.get(`/consultations/${consultationId}`);
    setConsultation(data.consultation);
    setQueuePosition(data.queuePosition || 0);
  }, [consultationId]);

  const loadMessages = useCallback(async () => {
    const { data } = await api.get(`/consultations/${consultationId}/messages`);
    mergeMessages(Array.isArray(data) ? data : []);
  }, [consultationId, mergeMessages]);

  useEffect(() => {
    if (!consultationId) return undefined;
    let active = true;
    setLoading(true);
    setError('');
    Promise.all([loadDetail(), loadMessages()])
      .catch((err) => active && setError(err.response?.data?.message || 'কথোপকথন লোড করা যায়নি।'))
      .finally(() => active && setLoading(false));

    const socket = getSocket();
    const join = () => socket.emit('consultation:join', consultationId);
    join();
    socket.on('connect', join);
    socket.on('message:new', (message) => { if (message.consultation === consultationId) mergeMessages([message]); });
    socket.on('consultation:update', (payload) => setConsultation((current) => (current ? { ...current, ...payload } : current)));
    socket.on('typing', ({ isTyping }) => {
      setPeerTyping(isTyping);
      clearTimeout(typingTimer.current);
      if (isTyping) typingTimer.current = setTimeout(() => setPeerTyping(false), 3500);
    });

    // Polling fallback keeps the thread fresh even if the socket drops.
    const poll = setInterval(() => { loadMessages().catch(() => {}); loadDetail().catch(() => {}); }, 8000);

    return () => {
      active = false;
      clearInterval(poll);
      clearTimeout(typingTimer.current);
      socket.emit('consultation:leave', consultationId);
      socket.off('connect', join);
      socket.off('message:new');
      socket.off('consultation:update');
      socket.off('typing');
    };
  }, [consultationId, loadDetail, loadMessages, mergeMessages]);

  const sendMessage = useCallback(async ({ text, file, as } = {}) => {
    if (!text?.trim() && !file) return;
    setSending(true);
    setError('');
    try {
      const payload = new FormData();
      if (text?.trim()) payload.append('text', text.trim());
      if (file) payload.append('attachment', file);
      if (as) payload.append('as', as);
      const { data } = await api.post(`/consultations/${consultationId}/messages`, payload);
      mergeMessages([data]);
    } catch (err) {
      setError(err.response?.data?.message || 'বার্তা পাঠানো যায়নি।');
      throw err;
    } finally {
      setSending(false);
    }
  }, [consultationId, mergeMessages]);

  const emitTyping = useCallback((isTyping) => {
    getSocket().emit('typing', { consultationId, isTyping });
  }, [consultationId]);

  return { consultation, queuePosition, messages, loading, error, sending, peerTyping, sendMessage, emitTyping, reload: loadDetail };
}
