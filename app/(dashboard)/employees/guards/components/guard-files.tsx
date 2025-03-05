import React from 'react';
import FileUploadInput from './file-upload-input';
import { getAllFiles, getAllMustFiles } from '@/lib/actions/filesActions';
import FileItem from './file-item';
import MustFileUpload from './must-file-upload';
import { File } from '@prisma/client';

const mustFilesList: { name: string; }[] = [
  {
    name: 'תעודת-זהות',
  },
  {
    name: 'הצהרת-בריאות',
  },
  {
    name: 'הצהרת-מנבט',
  },
  {
    name: 'רישיון-נשק',
  }
];

async function GuardFiles({ id }: { id: string }) {
  const files = await getAllFiles(id);
  const mustFiles = await getAllMustFiles(id);
  console.log('mustFiles', mustFiles);
  return (
    <div className='text-right flex flex-col justify-between'>
      <h3 className='text-lg font-semibold '>קבצים חובה</h3>
      <div className="flex gap-2 py-4 overflow-y-scroll">
        {mustFilesList.map((file) => {
          const mustFile = mustFiles.findLast((f) => {
            return f.file.name.startsWith(file.name);
          });

          return <MustFileUpload key={file.name} file={mustFile} fileName={file.name} />;
        })}
      </div>
      <h3 className='text-lg font-semibold '>קבצים כללים</h3>
      <div className="flex flex-wrap overflow-y-scroll gap-2 py-4   ">

        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>
        <FileUploadInput />
    </div>
  );
}

export default GuardFiles;
