import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth(); const location = useLocation();
  if (loading) return <div className="grid min-h-64 place-items-center">লোড হচ্ছে...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}
