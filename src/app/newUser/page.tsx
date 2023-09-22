'use client';

import React, { FormEvent } from 'react';

export default function newUser() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    // ...
  }

  return (
    <div>
      <h1>Nuevo Usuario Adoptante.</h1>
      <h2>Vamos a necesitar algunos datos...</h2>
      <form onSubmit={onSubmit}>
        <div>
          Nombre:
          <input type="text" name="Nombre" />
        </div>

        <div>
          Direccion:
          <input type="text" name="Direccion" />
        </div>
        <div>
          Correo Electronico:
          <input type="text" name="Email" />
        </div>
        <div>
          Contraseña:
          <input type="text" name="Password" />
        </div>
        <div>
          Repetir Contraseña:
          <input type="text" name="PasswordRepeat" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
