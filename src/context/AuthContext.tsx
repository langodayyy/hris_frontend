'use client';
// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
interface User {
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (userData: User) => boolean;
  logout: () => void;
  register: (userData: User) => boolean;
  isAuthenticated: () => boolean;
}

// Create the Auth Context with default values
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Create a provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Check for existing authentication on mount
  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        // Handle potential JSON parse error
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData: User): boolean => {
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Registration function
  const register = (userData: User): boolean => {
    // You would typically make an API call here
    // For now, we'll just set the user in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    return !!currentUser;
  };

  // Values to be provided to consumers
  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    register,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};