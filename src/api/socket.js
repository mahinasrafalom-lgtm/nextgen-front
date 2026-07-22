import { io } from 'socket.io-client';

// The realtime server shares the API origin (minus the /api suffix).
const resolveSocketUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) return import.meta.env.VITE_SOCKET_URL;
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  return api.replace(/\/api\/?$/, '');
};

let socket = null;

export function getSocket() {
  const token = localStorage.getItem('petcare_token');
  if (!socket) {
    socket = io(resolveSocketUrl(), {
      path: '/socket.io',
      autoConnect: false,
      transports: ['websocket', 'polling'],
      auth: { token }
    });
  }
  socket.auth = { token };
  if (!socket.connected) socket.connect();
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
