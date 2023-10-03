import React from 'react';
import './lost.css';

export default function LostPetReportView() {
  return (
    <div className="globalDiv">
      <h1>Pagina de mascotas perdidas.</h1>
      <form className="pure-form pure-form-aligned">
        <label className="genericLabel">
          Tipo de animal
          <input className="textFieldInput" />
        </label>
        <div>
          <label>
            Ubicacion
            <input className="textFieldInput" />
          </label>
        </div>
        <div>
          <label>
            Descripcion del animal
            <input className="textFieldInput" />
          </label>
        </div>
        <div>
          <label>
            Mas detalles
            <input className="textFieldInput" />
          </label>
        </div>
      </form>
      <button className="submitButton">Reportar</button>
      <h2>Recuerda que las ONGs no pueden confiscar mascotas.</h2>
      <h3>Si presencias un caso de abuso animal, llama al 911.</h3>
    </div>
  );
}
