'use client';

import React from 'react';
import './create-acc.css';

export default function NewAccLanding() {
  return (
    <div className="createBox">
      <h1 className="newAccTitle">Crear una nueva cuenta.</h1>
      <h2 className="newAccSubtitle">
        Necesitamos saber que tipo de usuario eres.
      </h2>
      <div className="buttonsBox">
        <a href="/newNGO" className="NGOButton">
          Soy ONG.
        </a>
        <a className="AdoptantButton" href="/newUser">
          Soy adoptante.
        </a>
      </div>
    </div>
  );
}
