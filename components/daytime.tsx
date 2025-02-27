'use client';

import { cn } from '@/lib/utils/tailwind';
import { useEffect, useState } from 'react';

export function DayTime({
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const [dateTime, setDateTime] = useState(
    new Date().toLocaleDateString('he-IL', {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(
        new Date().toLocaleDateString('he-IL', {
          weekday: 'short',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        })
      );
    }, 900);

    return () => clearInterval(interval);
  }, []);

  let day = dateTime.split(',')[0];
  let date = dateTime.split(',')[1]?.replaceAll('.', '/');
  let time = dateTime.split(',')[2];

  return (
    <p className={cn('text-white px-12 text-center', className)} {...rest}>
      <b className="text-xl">{day}</b>, {date}, {time}
    </p>
  );
}
