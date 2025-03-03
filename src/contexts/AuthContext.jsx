'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext();
const MOCK_USERS = [
  {
    id: '1',
    username: 'initiator',
    role: 'initiator',
    name: 'Payment Initiator',
  },
  {
    id: '2',
    username: 'approver',
    role: 'approver',
    name: 'Payment Approver',
  },
  {
    id: '3',
    username: 'receiver',
    role: 'receiver',
    name: 'Payment Receiver',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // In a real app, we would validate credentials against an API
    // For this demo, we'll just accept any password for the mock users
    const foundUser = MOCK_USERS.find((u) => u.username === username);
    
    if (foundUser) {
      setUser(foundUser);
      Cookies.set('user', JSON.stringify(foundUser), { 
        expires: 1, // Expires in 1 day
        path: '/',
        sameSite: 'strict'
      });
      router.push(`/${foundUser.role}`);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user', { path: '/' });
    router.push('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext;