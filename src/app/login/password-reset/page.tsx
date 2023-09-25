'use client';

import React, { FormEvent } from 'react';
import { sendForgotPassEmail } from '~/supabase/helpers';

export default function newUser() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { email } = Object.fromEntries(new FormData(event.currentTarget)) as {
      email: string;
    };

    try {
      const data = await sendForgotPassEmail(email);
      console.log(data);
    } catch (err) {
      // Handle as you see fit
      alert(`Some unexpected error: ${err}`);
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
