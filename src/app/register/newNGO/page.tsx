'use client';

import React, { FormEvent } from 'react';
import { OrgSignupInfo } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import './newNGO.css';

export default function newNGO() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Esto por qué lo están haciendo así y no con lo de useState de react? Onda es mejor así o solo pintó?
    // Porque el tema es que así me parece que no se pueden poner bien los tipos de ts
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as OrgSignupInfo;

    /*
     * formData verifications here like password repeate matching, etc
     */

    try {
      console.log('Form data: ', formData);
      const { data, existingAccount } = await supabase.orgSignUp(formData);
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
      alert(`Some unexpected error: ${err}`);
    }
  }

  return (
    <div className="globalContainter">
      <h1 className="newNGOtitle">Nueva ONG.</h1>
      <h2 className="newNGOSubtitle1">
        Necesitamos que llenes el siguiente formulario.
      </h2>
      <h2 className="newNGOSubtitle2">
        Es para verificar que la ONG sea legitima.
      </h2>
      <form className="submissionForm" onSubmit={onSubmit}>
        <div>
          Correo Electronico:
          <input
            className="emailInput"
            type="email"
            name="email"
            defaultValue="Test@Email.com"
            required
          />
        </div>
        <div>
          Contraseña:
          <input
            className="passwordInput"
            type="password"
            name="password"
            defaultValue="TestPass"
            minLength={8}
            required
          />
        </div>
        <div>
          Nombre:
          <input
            className="nameInput"
            type="text"
            name="name"
            defaultValue="Test Org Name"
            required
          />
        </div>
        <div>
          Direccion:
          <input className="addressInput" type="text" name="address" />
        </div>
        <button className="submitButton" type="submit">
          Siguiente
        </button>
      </form>
    </div>
  );
}
