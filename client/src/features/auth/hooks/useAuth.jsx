import { createContext, useContext, useState, useCallback } from 'react';
import * as authApi from '../api/authApi.js';
import { getToken, setToken as persistToken } from '../../../shared/lib/apiClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);

  const applySession = useCallback((result) => {
    persistToken(result.token);
    setTokenState(result.token);
    setUser(result.user);
  }, []);

  const signup = useCallback(
    async (payload) => {
      const result = await authApi.signup(payload);
      applySession(result);
      return result;
    },
    [applySession]
  );

  const login = useCallback(
    async (payload) => {
      const result = await authApi.login(payload);
      applySession(result);
      return result;
    },
    [applySession]
  );

  const loginWithGoogle = useCallback(
    async (idToken) => {
      const result = await authApi.loginWithGoogle(idToken);
      applySession(result);
      return result;
    },
    [applySession]
  );

  const logout = useCallback(() => {
    persistToken(null);
    setTokenState(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
