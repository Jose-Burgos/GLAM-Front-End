'use client';

import React, { FormEvent } from 'react';
import { LoginInfo } from '~/supabase/types/supabase.tables';
import { login, resetPass } from '~/supabase/helpers';
import Link from 'next/link';
import { styled } from '@mui/material';

const ResetPass = styled(Link)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
});

export default function newUser() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as LoginInfo;

    try {
      const { data } = await login(formData);
      console.log(data);
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
          <input type="email" name="email" defaultValue="Test@Email.com" />
        </div>
        <div>
          Contraseña:
          <input type="password" name="password" defaultValue="TestPass" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ResetPass href="/pass-reset">
        Olvidé mi contraseña
      </ResetPass>
    </div>
  );
}
