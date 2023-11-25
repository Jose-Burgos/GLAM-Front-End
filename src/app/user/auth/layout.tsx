'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import { Spinner } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const auth = HelperFunctions;
  useEffect(() => {
    (async () => {
      const user = await auth.getSession();
      if (user == null) {
        router.push('/login');
      }
      if (user?.user.user_metadata.profile_type === 'Organization') {
        router.push('/ong/auth/home');
      } else {
        setSuccess(true);
      }
    })();
  }, [router, auth]);

  if (success) {
    return <main>{children}</main>;
  }
  return <Spinner thickness="8px" speed="0.65s" color="teal.300" size="xl" />;
}
