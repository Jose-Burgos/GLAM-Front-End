'use client';

import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import helpers from '~/supabase/helpers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const user = await helpers.getSession();
      if (user == null) {
        router.push('/login');
      }
      if (user?.user.user_metadata.profile_type === 'User') {
        router.push('/user/auth/home');
      } else {
        setSuccess(true);
      }
    })();
  }, [router]);

  if (success) {
    return <main>{children}</main>;
  }
  return <Spinner thickness="8px" speed="0.65s" color="teal.300" size="xl" />;
}
