'use client';

import Loading from '@/components/loading';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { verifySession } from '~/supabase/helpers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const error = await verifySession();
      if (error == null) {
        router.push('/login');
      } else {
        setSuccess(true);
      }
    })();
  }, [router]);

  if (success) {
    return <main>{children}</main>;
  }
  return <Loading />;
}
