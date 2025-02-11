import { Department, Employee } from '@prisma/client';
import Papa from 'papaparse';

export async function readCsvFile(file: File,cb:(employees:any)=>any) {
  const text = await file.text();
  const csv =  Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    encoding: 'utf-8',
    complete:cb
  });

}
