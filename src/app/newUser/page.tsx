'use client';

import React, { FormEvent } from 'react';
import { UserInfo } from '~/supabase/types/supabase.tables';
import { userSignUp } from '~/supabase/helpers';

export default function newUser() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Esto por qué lo están haciendo así y no con lo de useState de react? Onda es mejor así o solo pintó?
    // Porque el tema es que así me parece que no se pueden poner bien los tipos de ts
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as UserInfo;
    /*
     * formData verifications here
     */
    const res = await userSignUp(formData);
    console.log(res);
  }

  return (
    <div>
      <h1>Nuevo Usuario Adoptante.</h1>
      <h2>Vamos a necesitar algunos datos...</h2>
      <form onSubmit={onSubmit}>
        <div>
          Nombre:
          <input type="text" name="firstName" defaultValue="TestName" />
        </div>
        <div>
          Apellido:
          <input type="text" name="lastName" defaultValue="TestSurname" />
        </div>
        <div>
          DNI:
          <input type="text" name="identification" defaultValue="TestDNI" />
        </div>
        <div>
          Correo Electronico:
          <input type="email" name="email" defaultValue="Test@Email.com" />
        </div>
        <div>
          Contraseña:
          <input type="password" name="password" defaultValue="TestPass" />
        </div>
        <div>
          Repetir Contraseña:
          <input
            type="password"
            name="passwordRepeat"
            defaultValue="TestPassRep"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
