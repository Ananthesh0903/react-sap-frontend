import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { loginUser, logoutUser, checkAuthStatus } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (customerId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const currentUser = await checkAuthStatus();
        setUser(currentUser);
      } catch (err) {
        console.error("Authentication check failed:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (customerId: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedInUser = await loginUser(customerId, password);
      setUser(loggedInUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};