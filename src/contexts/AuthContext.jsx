import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Using navigation instead of router

// Create auth context
const AuthContext = createContext();

// Mock users for the three personas
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

  // Only run localStorage operations on client side
  useEffect(() => {
    // Check for stored user on first load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (username, password) => {
    // In a real app, we would validate credentials against an API
    // For this demo, we'll just accept any password for the mock users
    const foundUser = MOCK_USERS.find((u) => u.username === username);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      
      // Redirect to the appropriate dashboard
      router.push(`/${foundUser.role}`);
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;