'use client';

import { Button } from '@/components/ui/button';
import {
  uploadMustFilesAction,
  uploadProfileImageAction
} from '@/lib/actions/filesActions';
import { DownloadIcon, ImagePlusIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useActionState, useRef, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/form/loading-spinner';
import { toast } from 'sonner';
import guardImage from '../../../../../assets/images/security-logo-no-slogen.png';
import exp from 'constants';
import { CardContent } from '@/components/ui/card';
import Modal from '@/components/modal';
import FormFieldDate from '@/components/ui/form/form-field-date';
import { Input } from '@/components/ui/input';
import { set } from 'date-fns';
import { cn } from '@/lib/utils/tailwind';
import { GuardMustFiles, Prisma } from '@prisma/client';
import { is } from 'date-fns/locale';

function MustFileUplaud({
  file,
  fileName
}: {
  file:
    | Prisma.GuardMustFilesGetPayload<{ include: { file: true } }>
    | undefined;
  fileName: string;
}) {
  const [state, formAction] = useActionState(uploadMustFilesAction, {
    success: false,
    message: undefined,
    data: undefined
  });
  const [opnemModal, setOpenModal] = useState(false);
  const [expDate, setExpDate] = useState('');

  const params = useParams();
  const employeeId = params.id as string;

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setOpenModal(true);
  };

  const handleDateChange = () => {
    setOpenModal(false);
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    console.log('state', state);
    if (state?.success) {
      toast.success(`${fileName} עודכן בהצלחה`);
    }
  }, [state]);

  const date2Month = new Date();
  date2Month.setMonth(date2Month.getMonth() + 2);

  const isExpiresSoon = (file?.experetionDate || new Date()) <= date2Month;

  return (
    <div
      className={`relative w-24 aspect-square border-2 ${isExpiresSoon ? 'border-destructive/50' : 'border-foreground/50'} rounded-2xl shadow-md group overflow-hidden`}
    >
      <Image
        src={file?.fileUrl || guardImage}
        alt={file?.file.name || `add file ${fileName}}`}
        fill
        sizes="100%"
        className="abolute w-full h-full object-cover relative  top-0 "
      />
      <div
        className={cn(
          'text-xs text-center truncate text-white bg-black/50 absolute bottom-0 left-0 w-full p-1 z-10 max-h-6 group-hover:max-h-24 transition-all duration-300'
        )}
      >
        <p className="text-ellipsis overflow-hidden whitespace-nowrap">
          {file?.file.name || fileName}
        </p>
        <p
          className={cn(
            'text-ellipsis overflow-hidden whitespace-nowrap font-bold'
          )}
        >
          {file?.experetionDate.toLocaleDateString('en-gb')}
        </p>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            inputRef.current?.click();
          }}
          className="p-1 h-fit w-fit"
        >
          <Plus className="w-4 h-4 text-background" />
        </Button>
        <Button
          variant="link"
          className={!file?.file.downloadUrl ? 'hidden' : ''}
        >
          <a
            href={file?.file.downloadUrl || ''}
            target="_blank"
            className="hover:scale-125 transition-all duration-300"
          >
            <DownloadIcon className="w-4 h-4 text-background" />
          </a>
        </Button>
      </div>

      <form
        ref={formRef}
        action={formAction}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
      >
        <LoadingSpinner />
        <input
          type="file"
          ref={inputRef}
          name="file"
          size={1}
          onChange={handleFileChange}
          className="absolute top-0 left-0 w-full h-full opacity-0"
        />
        <input type="hidden" name="id" value={employeeId} />
        <Modal
          title={'בחר תאריך תפוגה לטופס זה'}
          open={opnemModal}
          onOpenChange={setOpenModal}
        >
          <CardContent className="flex gap-2">
            <Input
              type="date"
              name="expDate"
              onChange={(e) => setExpDate(e.currentTarget.value)}
            />
            <Button onClick={handleDateChange}>שמור</Button>
          </CardContent>
        </Modal>
        <input type="hidden" name="expDate" value={expDate} />
        <input type="hidden" name="fileName" value={fileName} />
      </form>
    </div>
  );
}

export default MustFileUplaud;
