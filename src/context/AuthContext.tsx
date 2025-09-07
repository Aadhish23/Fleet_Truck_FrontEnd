import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/auth';
import { AuthService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (AuthService.isAuthenticated()) {
        const response = await AuthService.getProfile();
        if (response.success) {
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          AuthService.logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      AuthService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login({ email, password });
      if (response.success) {
        setUser(response.manager);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await AuthService.register({ name, email, password });
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
