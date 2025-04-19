
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUserData } from '@/data/mockData';

type User = {
  id: string;
  name: string;
  email: string;
  cardBalance: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateCardBalance: (newBalance: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, you would validate credentials against a backend
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        const foundUser = mockUserData.find(u => u.email === email);
        
        if (foundUser && password === 'password') { // In a real app, you'd validate the password properly
          setUser(foundUser);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(foundUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // In a real app, you would register the user with a backend
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (mockUserData.some(u => u.email === email)) {
          reject(new Error('Email already in use'));
          return;
        }
        
        // Create a new user
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          cardBalance: 100 // Default starting balance
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateCardBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, cardBalance: newBalance };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateCardBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
