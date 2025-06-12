'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

interface User {
  is_profile_complete: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const publicPaths = [
    '/',
    '/sign-in',
    '/sign-in/forgot-password',
    '/sign-in/check-email',
    '/sign-in/link-expired',
    '/sign-in/as-employee',
    '/sign-in/set-new-password',
    '/sign-in/success-set-password',
    '/sign-up',
  ];
  const fetchUser = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        if (!publicPaths.includes(pathname)) {
          router.replace('/sign-in');
        }
        setLoading(false);
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 403 || res.status === 401) {
        Cookies.remove('token');
        if (pathname !== '/' && pathname !== '/sign-up' && pathname !== '/sign-in/as-employee') {
          router.replace('/sign-in');
        }
        return;
      }

      if (!res.ok) {
        throw data;
      }

      if (!data.is_profile_complete && pathname !== '/sign-up/complete-registration') {
        router.replace('/sign-up/complete-registration');
        return;
      }

      if (data.is_profile_complete && (
        pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/sign-up/complete-registration'
      )) {
        router.replace('/dashboard');    
        return;
      }

      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);