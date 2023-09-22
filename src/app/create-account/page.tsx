'use client';

import React from 'react';

export default function NewAccLanding() {
  return (
    <div>
      <h1>Crear una nueva cuenta.</h1>
      <h2>Necesitamos saber que tipo de usuario eres.</h2>
      <div>
        <a href="/newNGO">
          <span style={{ color: 'black' }}>Soy ONG.</span>
        </a>
        <a href="/newUser">
          <span style={{ color: 'black' }}>Soy adoptante.</span>
        </a>
      </div>
    </div>

  );
}
