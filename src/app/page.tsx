// Tiene que ser client para el password reset que necesita useEffect.
// Después igual se puede cambiar a dónde redirecciona el mail de confimación
// de cambio de clave y movemos el useEffect ahí y listo.

'use client';

// This is the landing
import React, { useEffect } from 'react';
import '@/app/landing.css';
import ContactForm from '@/components/contactform';
import LandingContainter from '@/components/landingcontainter';
import { askNewPassOnReset } from '~/supabase/helpers';

const Data = [
  {
    position: true,
    path: '/assets/cat&dogs.png',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
  },
  {
    position: false,
    path: '/assets/cat&dogs.png',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
  },
  {
    position: true,
    path: '/assets/cat&dogs.png',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
  },
  {
    position: false,
    path: '/assets/cat&dogs.png',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
  },
];

export default function Landing() {
  useEffect(() => {
    try {
      askNewPassOnReset();
    } catch (err) {
      // Handle the error
    }
  }, []);

  return (
    <div className="content">
      <h1 className="tittle">Grupo Latinoamericano de Ayuda a Mascotas</h1>
      {Data.map((d, idx) => (
        <LandingContainter
          left={d.position}
          path={d.path}
          subt={d.subt}
          parag={d.parag}
          key={idx}
        />
      ))}
      <h1 className="tittle">Contactanos</h1>
      <ContactForm />
    </div>
  );
}
