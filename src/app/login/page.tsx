'use client';

import React, { FormEvent, useEffect } from 'react';
import { LoginInfo } from '~/supabase/types/supabase.tables';
import { login, verifySession } from '~/supabase/helpers';
import Link from 'next/link';
import { styled } from '@mui/material';
import { useRouter } from 'next/navigation';

const ResetPass = styled(Link)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
});

export default function newUser() {
  const router = useRouter();
  useEffect(() => {
    // redirectIfSignedIn()
    (async () => {
      try {
        const session = await verifySession();
        if (session) {
          console.log('Signed session: ', session);
          alert('Already signed in');
        }
      } catch (err) {
        // Handle the error
        alert('Some unexpected error: ' + err);
      }
    })();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as LoginInfo;

    try {
      const { session, profile, type } = await login(formData);
      if (type === 'RegularUser') {
        router.push('/user-home');
        // Do something
      } else if (type === 'Organization') {
        // Do something else
      }
      console.log('Login data: ', session, profile);
      alert('Login successful');
    } catch (err) {
      // Handle as you see fit
      alert('Some unexpected error: ' + err);
    }
  }

  return (
    <div>
      <h1>Ingrese a su cuenta</h1>
      <form onSubmit={onSubmit}>
        <div>
          Correo Electronico:
          <input
            type="email"
            name="email"
            defaultValue="vomapa9028@bnovel.com"
          />
        </div>
        <div>
          Contraseña:
          <input type="password" name="password" defaultValue="asdf1234" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ResetPass href="/pass-forgot">Olvidé mi contraseña</ResetPass>
    </div>
  );
}
