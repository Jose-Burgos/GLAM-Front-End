'use client';

import React from 'react';
import './addAnimal.css';

export default function addAnimalPage() {
  return (
    <div className="globalCont">
      <h1 className="message">Poner en adopcion</h1>
      <div>
        <form className="genericForm">
          <label className="genericLabel">
            Tipo de animal
            <input className="textFieldInput" type="text" />
          </label>
          <div>
            <label>
              Edad
              <input className="textFieldInput" type="number" />
            </label>
          </div>
          <div>
            <label>
              Descripcion del animal
              <input className="textFieldInput" type="text" />
            </label>
          </div>
          <div>
            <label>
              Mas detalles
              <input className="textFieldInput" type="text" />
            </label>
          </div>
        </form>
      </div>
      <div>
        <button className="submitButton">Enviar</button>
      </div>
    </div>
  );
}
