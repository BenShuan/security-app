'use client';
import { Spinner } from '@/components/icons';
import { useFormStatus } from 'react-dom';
export default function LoadingSpinner() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending && (
        <div className="flex justify-center w-full h-full absolute top-0 left-0 bg-white/50 backdrop-blur-sm rounded-2xl ">
          <Spinner />
        </div>
      )}
    </>
  );
}
