'use client';

import React from 'react';
import './NGOHome.css';

export default function ongHome() {
  return (
    <div>
      <h1 className="name">Nombre de la ONG</h1>
      <div className="buttonContainer">
        <a href="./addAnimalPage" className="addButton">
          Poner en adopcion
        </a>
      </div>
    </div>
  );
}
