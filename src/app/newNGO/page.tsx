'use client';

import React, { FormEvent } from 'react';

export default function newNGO() {
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
      <h1>Nueva ONG.</h1>
      <h2>Necesitamos que llenes el siguiente formulario.</h2>
      <h2>Es para verificar que la ONG sea legitima.</h2>
      <form onSubmit={onSubmit}>
        <div>
          Nombre:
          <input type="text" name="Nombre" />
        </div>

        <div>
          Direccion:
          <input type="text" name="Direccion" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
