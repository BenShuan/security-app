'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="p-4 md:p-6">
          <div className="mb-8 space-y-4">
            <h1 className="font-semibold text-lg md:text-2xl">משהו השתבש</h1>

            <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
              <code>{error.message}</code>
            </pre>
          </div>
        </main>
      </body>
    </html>
  );
}
