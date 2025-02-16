import React from 'react'
import FileUploadInput from './file-upload-input';
import { getAllFiles } from '@/lib/actions/filesActions';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DownloadIcon, Trash2 } from 'lucide-react';
import FileItem from './file-item';
async function GuardFiles({id}:{id:string}) {


  const files = await getAllFiles(id);
  
  return (
    <div>
      <FileUploadInput />
      <div className='flex flex-wrap gap-2 py-4'>
        {files.map((file)=>(
          <FileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}

export default GuardFiles;