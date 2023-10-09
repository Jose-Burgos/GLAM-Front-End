'use client';

import React, { FormEvent, useEffect } from 'react';
import { LoginInfo } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import Link from 'next/link';
import { styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import './login.css';

const ResetPass = styled(Link)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
});

export default function NewUser() {
  const router = useRouter();
  useEffect(() => {
    // redirectIfSignedIn()
    (async () => {
      try {
        const session = await supabase.getSession();
        if (session) {
          console.log('Signed session: ', session);
          alert('Already signed in');
        }
      } catch (err) {
        // Handle the error
        alert(`Some unexpected error: ${err}`);
      }
    })();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as LoginInfo;

    try {
      const { session, profile, type } = await supabase.login(formData);
      if (type === 'RegularUser') {
        router.push('/user/home');
        alert('Logueado como usuario.');
        // Do something
      } else if (type === 'Organization') {
        // Do something else
        alert('Logueado como ONG.');
        router.push('/ong/auth/home');
      }
      console.log('Login data: ', session, profile);
    } catch (err) {
      // Handle as you see fit
      alert(`Error: ${err}`);
    }
  }

  return (
    <div className="container">
      <div className="globalLogin">
        <h1 className="loginMessage">Ingrese a su cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="correoBox">
            Correo Electronico:
            <input
              className="correoInput"
              type="email"
              name="email"
              defaultValue="jrmalex_2002@outlook.com"
            />
          </div>
          <div className="passBox">
            Contraseña:
            <input
              className="passInput"
              type="password"
              name="password"
              minLength={8}
              defaultValue="123456"
            />
          </div>
          <button className="submitButton" type="submit">
            Entrar
          </button>
        </form>
        <ResetPass href="/login/password-reset">Olvidé mi contraseña</ResetPass>
      </div>
      <ResetPass href="/register">Todavía no tienes cuenta?</ResetPass>
    </div>
  );
}
