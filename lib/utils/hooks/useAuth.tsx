'use client';
import { checkManeger, requireAuth } from '@/lib/auth';
import { Role, User } from '@prisma/client';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isManager, setIsManager] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await requireAuth();
      console.log('user', user);
      setUser(user);
      setIsManager(user.role !== Role.guard);
    };

    getUser();
  }, []);

  return {
    isManager,
    user
  };
};

export default useAuth;
