// components/PrivateRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('fleetToken');
    if (token) {
      // Optional: validate token with /api/auth/me
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" />;

  return <>{children}</>;
}