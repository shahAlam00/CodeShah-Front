import React, { createContext, useContext, useState } from 'react';
import api from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('codefront_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  // Called by LoginPage/RegisterPage after successful API response
  // Accepts the user object and token returned from the backend
  const login = (userData, token) => {
    const normalized = {
      name: userData?.fullName || userData?.name || 'User',
      email: userData?.email || '',
      role: userData?.role || 'user',
      avatar: userData?.avatar || null,
      username: userData?.username || '',
      isAuthenticated: true,
    };

    setUser(normalized);
    localStorage.setItem('codefront_user', JSON.stringify(normalized));

    if (token) {
      localStorage.setItem('token', token);
    }
  };

  // Called by RegisterPage after successful API response
  const register = (userData, token) => {
    login(userData, token); // same shape
  };

  // Calls backend logout to clear the httpOnly cookie, then clears local state
  const logout = async () => {
    try {
      await api.post('/user/logout');
    } catch (_) {
      // even if the request fails, clear local state
    } finally {
      setUser(null);
      localStorage.removeItem('codefront_user');
      localStorage.removeItem('token');
    }
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('codefront_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user?.isAuthenticated,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
