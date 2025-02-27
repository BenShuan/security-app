'use client';
import { requireAuth } from '@/lib/auth';
import { checkManeger } from '@/lib/actions/auth';
import { RoleArray, RoleArrayType } from '@/lib/schemes';
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

  function getRoleByUserRole(): RoleArrayType[] {
    const position = RoleArray.options.indexOf(user?.role || 'guard');

    return RoleArray.options.filter(
      (val, ind) => ind <= position
    ) as RoleArrayType[];
  }

  return {
    getRoleByUserRole,
    isManager,
    user
  };
};

export default useAuth;
