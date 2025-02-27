'use client';
import ModalButton from '@/components/modal-button';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import UserForm from './user-form';
import { useSearchParams } from 'next/navigation';

const AddUserButton = () => {
  const params = useSearchParams();

  const isOpen = Boolean(params.get('edit'));

  const [openModal, setOpenModal] = useState(isOpen);

  return (
    <ModalButton
      title="הוספת משתמש"
      icon={<PlusIcon />}
      open={openModal}
      onOpenChange={setOpenModal}
    >
      <UserForm />
    </ModalButton>
  );
};

export default AddUserButton;
