'use client';

import React, { useState } from 'react';
import { Button, Card, TextField, styled } from '@mui/material';
import '../style/contactform.css';

const Tf = styled(TextField)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
});

const Sbtn = styled(Button)({
  fontFamily: 'Shantell Sans',
  fontSize: '1.5rem',
  color: 'blue',
});

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement the logic to send the email here using a backend service or an API
    // console.log('Form data:', formData);
  };

  return (
    <Card className="contact-card">
      <form onSubmit={handleSubmit}>
        <div>
          <Tf
            className="contact-input"
            label="Nombre"
            type="text"
            id="name"
            variant="standard"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Tf
            className="contact-input"
            label="E-mail"
            type="email"
            id="email"
            name="email"
            variant="standard"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Tf
            className="contact-input msj"
            label="¿Cuál es tu consulta?"
            id="message"
            name="message"
            multiline
            variant="standard"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <Sbtn className="submit-btn" type="submit">
          Enviar
        </Sbtn>
      </form>
    </Card>
  );
}

export default ContactForm;
