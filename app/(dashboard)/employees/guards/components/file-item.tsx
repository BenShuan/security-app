import { DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteFileAction } from '@/lib/actions/filesActions';
import { File } from '@prisma/client';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

async function FileItem({ file }: { file: File }) {
  const deleteFile = deleteFileAction.bind(null, file.id);

  return (
      <div className="w-24 aspect-square relative overflow-hidden rounded-md group shadow-lg">
      <Image
        src={file.url}
        alt={file.name}
        fill
        sizes="100px"
        className="object-cover absolute"
      />
      <p className='text-xs text-center truncate text-white bg-black/50 absolute bottom-0 left-0 w-full p-1 z-10'>{file.name}</p>
      <div className="absolute top-0 left-0 w-full h-full flex bg-white/50 items-center opacity-0 justify-center group-hover:opacity-100 transition-opacity duration-300">
        <form action={deleteFile} >
          <Button variant='link' type="submit" className=" hover:scale-125 transition-all duration-300">
            <Trash2 className="w-4 h-4 text-red-500 " />
          </Button>
        </form>
        <Button variant='link'  >
              <a href={file.downloadUrl || ''} target='_blank' className='hover:scale-125 transition-all duration-300'>
                <DownloadIcon className='w-4 h-4 ' />
              </a>
            </Button> 
      </div>
    </div>
  );
}

export default FileItem;
