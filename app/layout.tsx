import useGeoLocation from '@/lib/utils/hooks/useGeoLocation';
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
  
  await useGeoLocation();

  return (
    <html lang="he" dir="rtl">
      <body className="flex min-h-screen w-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
