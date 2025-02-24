import KeyLogForm from './components/key-log-form';
import KeysHistoryTable from './components/keys-history-table';
import KeysStatusTable from './components/keys-status-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function KeyLogPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 hidden md:block">מפתחות</h1>

      <div className="flex gap-4">
        <div className="paper w-1/4">
          <h1 className="text-2xl font-bold">השאלה מפתח</h1>

          <KeyLogForm/>
        </div>
        <Tabs defaultValue="status" className='flex-grow ' >
            <TabsList className='justify-around w-full '>
              <TabsTrigger value="history">הסטורית הנפקות</TabsTrigger>
              <TabsTrigger value="status">סטטוס מפתוחת</TabsTrigger>
            </TabsList>
            <TabsContent value="history" dir='rtl'>
              <KeysHistoryTable/>
            </TabsContent>
            <TabsContent value="status" dir='rtl' >
            <KeysStatusTable />
            </TabsContent>
          </Tabs>
      </div>
    </>
  );
}
