'use client';

import React, { FormEvent } from 'react';
import { UserInfo } from '~/supabase/types/supabase.tables';
import { userSignUp } from '~/supabase/helpers';
import './newUser.css';

export default function newUser() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Esto por qué lo están haciendo así y no con lo de useState de react? Onda es mejor así o solo pintó?
    // Porque el tema es que así me parece que no se pueden poner bien los tipos de ts
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as UserInfo;

    /*
     * formData verifications here like password repeate matching, etc
     */

    try {
      console.log('Form data: ', formData);
      const { data, existingAccount } = await userSignUp(formData);
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
    <div className="globalDiv">
      <h1>Nuevo Usuario Adoptante.</h1>
      <h2>Vamos a necesitar algunos datos...</h2>
      <form onSubmit={onSubmit}>
        <div>
          Nombre:
          <input
            type="text"
            name="firstName"
            defaultValue="TestName"
            className="textFieldInput"
          />
        </div>
        <div>
          Apellido:
          <input
            type="text"
            name="lastName"
            defaultValue="TestSurname"
            className="textFieldInput"
          />
        </div>
        <div>
          Usuario:
          <input
            type="text"
            name="username"
            defaultValue="TestUsername"
            className="textFieldInput"
          />
        </div>
        <div>
          DNI:
          <input
            type="text"
            name="identification"
            defaultValue="TestDNI"
            className="textFieldInput"
          />
        </div>
        <div>
          Correo Electronico:
          <input
            type="email"
            name="email"
            defaultValue="Test@Email.com"
            className="textFieldInput"
          />
        </div>
        <div>
          Contraseña:
          <input
            type="password"
            name="password"
            defaultValue="TestPass"
            className="textFieldInput"
          />
        </div>
        <div>
          Repetir Contraseña:
          <input
            type="password"
            name="passwordRepeat"
            defaultValue="TestPassRep"
            className="textFieldInput"
          />
        </div>
        <button type="submit" className="submitButton">
          Crear
        </button>
      </form>
    </div>
  );
}
