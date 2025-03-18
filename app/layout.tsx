import { Toaster } from '@/components/ui/toast';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'מחלקת ביטחון דקסל',
  description: 'A platform to manage security and safety in the company'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="he" dir="rtl">
      <body className="flex h-screen w-full flex-col">
        {children}
        <Toaster duration={3000} />

        <Analytics />
      </body>
    </html>
  );
}
