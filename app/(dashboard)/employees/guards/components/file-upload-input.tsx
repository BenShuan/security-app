'use client';
import { Button } from '@/components/ui/button';
import { uploadFilesAction } from '@/lib/actions/filesActions';
import { SaveIcon, Upload } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

function FileUploadInput() {

  const {id} = useParams()
  const [files, setFiles] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const openFileInput = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files?.length || 0);
  };

  return (
    <form className="flex gap-2" action={uploadFilesAction}>
      <div className="flex-grow relative border-2 bg-white border-gray-300 rounded-full px-4 py-2 w-full text-right">
        {files > 0 ? `${files} קבצים` : 'העלה קבצים'}
        <Button
          variant="link"
          onClick={openFileInput}
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <Upload className="w-6 h-6" />
        </Button>
      </div>
      <input
        type="file"
        ref={inputRef}
        hidden
        name="files"
        multiple={true}
        onChange={handleFileChange}
      />
      <input type="hidden" name="guardId" value={id } />
      <Button type="submit">
        <SaveIcon className="w-4 h-4" />
      </Button>
    </form>
  );
}

export default FileUploadInput;
