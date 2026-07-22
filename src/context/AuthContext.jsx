import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('petcare_token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('petcare_user') || 'null'));
  const [loading, setLoading] = useState(Boolean(token && !user));

  useEffect(() => {
    if (!token || user) return;
    api.get('/users/profile').then(({ data }) => setUser(data.user)).catch(() => { localStorage.removeItem('petcare_token'); setToken(null); }).finally(() => setLoading(false));
  }, [token, user]);

  const value = useMemo(() => ({
    user, token, loading, isAdmin: user?.role === 'admin',
    login: ({ user: nextUser, token: nextToken }) => { localStorage.setItem('petcare_token', nextToken); localStorage.setItem('petcare_user', JSON.stringify(nextUser)); setToken(nextToken); setUser(nextUser); },
    logout: () => { localStorage.removeItem('petcare_token'); localStorage.removeItem('petcare_user'); setToken(null); setUser(null); }
  }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
