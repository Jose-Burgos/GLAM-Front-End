'use client';

import React, { FormEvent } from 'react';
import { OrgInfo } from '~/supabase/types/supabase.tables';
import { orgSignUp } from '~/supabase/helpers';

export default function newNGO() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Esto por qué lo están haciendo así y no con lo de useState de react? Onda es mejor así o solo pintó?
    // Porque el tema es que así me parece que no se pueden poner bien los tipos de ts
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as OrgInfo;

    /*
     * formData verifications here like password repeate matching, etc
     */

    try {
      console.log('Form data: ', formData);
      const { data, existingAccount } = await orgSignUp(formData);
      console.log('Res: ', data);
      if (existingAccount) {
        // Handle as you see fit
        alert('Ya existe una cuenta asociada al email ingresado.');
      } else {
        // Handle as you see fit
        alert(
          'Registro exitoso, revise su casilla electrónica para verificar la dirección de email.'
        );
      }
    } catch (err) {
      // Handle as you see fit
      alert('Some unexpected error: ' + err);
    }
  }

  return (
    <div>
      <h1>Nueva ONG.</h1>
      <h2>Necesitamos que llenes el siguiente formulario.</h2>
      <h2>Es para verificar que la ONG sea legitima.</h2>
      <form onSubmit={onSubmit}>
        <div>
          Correo Electronico:
          <input type="email" name="email" defaultValue="Test@Email.com" required />
        </div>
        <div>
          Contraseña:
          <input type="password" name="password" defaultValue="TestPass" required />
        </div>
        <div>
          Nombre:
          <input type="text" name="name" defaultValue="Test Org Name" required />
        </div>
        <div>
          Direccion:
          <input type="text" name="address" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
