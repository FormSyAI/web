import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { isAuthApiConfigured } from '@/lib/auth/api';
export type Session = {
  user: { id: string; displayName: string; emailVerified: boolean };
  workspace: { id: string; name: string };
};
type SessionState = {
  status: 'loading' | 'authenticated' | 'anonymous' | 'unavailable' | 'error';
  session: Session | null;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};
const SessionContext = createContext<SessionState | null>(null);
const base =
  import.meta.env.VITE_AURINOVA_AUTH_API_BASE_URL?.replace(/\/$/, '') ?? '';
export function SessionProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SessionState['status']>(
    isAuthApiConfigured ? 'loading' : 'unavailable',
  );
  const [session, setSession] = useState<Session | null>(null);
  const refresh = useCallback(async () => {
    if (!isAuthApiConfigured) return;
    await Promise.resolve();
    setStatus('loading');
    try {
      const response = await fetch(`${base}/api/auth/session`, {
        credentials: 'include',
        cache: 'no-store',
        signal: AbortSignal.timeout(12000),
      });
      if (response.status === 401) {
        setSession(null);
        setStatus('anonymous');
        return;
      }
      if (!response.ok) throw new Error('Session service unavailable');
      const data = await response.json();
      if (data.authenticated === false) {
        setSession(null);
        setStatus('anonymous');
        return;
      }
      if (
        !data.user?.id ||
        !data.workspace?.id ||
        typeof data.user.displayName !== 'string'
      )
        throw new Error('Invalid session');
      setSession(data);
      setStatus('authenticated');
    } catch {
      setSession(null);
      setStatus('error');
    }
  }, []);
  const logout = useCallback(async () => {
    const response = await fetch(`${base}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'X-AURINOVA-Auth-Request': 'auth-ui-v1' },
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error('Logout failed');
    setSession(null);
    setStatus('anonymous');
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => { void refresh(); }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);
  return (
    <SessionContext.Provider value={{ status, session, refresh, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error('SessionProvider is required');
  return value;
}
