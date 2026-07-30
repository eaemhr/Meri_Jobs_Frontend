'use client';

import { useState, useEffect } from 'react';

export interface UserSession {
  firstName: string;
  email: string;
}

export function useSession() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
  }, []);

  return { user, isAuthenticated, setUser };
}