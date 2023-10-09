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
    path: '/assets/AdoptionsTutorial.png',
    subt: 'Adopciones',
    parag:
      'Para adoptar un animal, crea una cuenta como usuario y luego ve a la página de ADOPCIONES, luego, haz clic en "Detalles" para ver los datos de un animal.',
  },
  {
    position: true,
    path: '/assets/ContactFormTutorial.png',
    subt: 'Detalles',
    parag:
      'Una vez en la página de detalles, busca el formulario de contacto y envía un mensaje. La ONG se pondrá en contacto contigo pronto.',
  },
  {
    position: false,
    path: '/assets/addTutorial.png',
    subt: 'ONG: Agregar',
    parag:
      'Para poner en adopción un animal, debes tener una cuenta de ONG. Una vez creada, podrás agregar animales desde tu página de inicio.',
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
