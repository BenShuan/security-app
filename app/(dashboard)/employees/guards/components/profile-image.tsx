'use client';

import { Button } from '@/components/ui/button';
import { uploadProfileImageAction } from '@/lib/actions/filesActions';
import { ImagePlusIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useActionState, useRef, useEffect  } from 'react';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/form/loading-spinner';
import { toast } from 'sonner';

function ProfileImage({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  const [state, formAction] = useActionState(uploadProfileImageAction, null);


  const params = useParams();
  const employeeId = params.id as string;

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    console.log('state', state);
    if (state?.success) {
        toast.success('תמונת הפרופיל עודכנה בהצלחה');
    }
  }, [state]);

  return (
    <div className="relative w-full aspect-square border-2 border-foreground/50 rounded-2xl shadow-md group">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="100%"
        className="h-full object-contain relative  top-0 "
      />
      <form
        ref={formRef}
        action={formAction}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
      >
        <LoadingSpinner />
        <input
          type="file"
          ref={inputRef}
          name="image"
          onChange={handleFileChange}
          className="absolute top-0 left-0 w-full h-full opacity-0"
        />
        <input type="hidden" name="id" value={employeeId} />
      </form>
      <Button
        variant="link"
        onClick={() => {
          inputRef.current?.click();
        }}
        className="absolute bottom-0 left-0 group-hover:scale-100 scale-0 transition-all duration-300"
      >
        <ImagePlusIcon className="w-6 h-6" />
      </Button>
    </div>
  );
}

export default ProfileImage;
