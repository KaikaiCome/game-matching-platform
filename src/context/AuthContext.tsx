import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { User } from '../types';

interface AuthContextValue {
  user: User | null;
  login: (payload: { username: string; password: string }) => Promise<void>;
  register: (payload: { username: string; password: string; nickname: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('auth:user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('auth:user', JSON.stringify(user));
    else localStorage.removeItem('auth:user');
  }, [user]);

  const login = useCallback(async ({ username, password }: { username: string; password: string }) => {
    await new Promise(r => setTimeout(r, 500));
    setUser({ id: 'u_' + username, username, nickname: '玩家' + username, games: ['Valorant', 'LOL'], rank: 'Gold' });
  }, []);

  const register = useCallback(async ({ username, password, nickname }: { username: string; password: string; nickname: string }) => {
    await new Promise(r => setTimeout(r, 500));
    setUser({ id: 'u_' + username, username, nickname, games: ['Valorant'], rank: 'Silver' });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 