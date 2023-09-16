// This is the landing
import React from 'react';
import '@/app/landing.css';
import ContactForm from '@/components/contactform';
import LandingContainter from '@/components/landingcontainter';

const Data = [
  {
    position: true,
    path: '/assets/cat&dogs.png',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
    idx: 0,
  },
  {
    position: false,
    path: '/assets/cat&dogs.png',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
    idx: 1,
  },
  {
    position: true,
    path: '/assets/cat&dogs.png',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
    idx: 2,
  },
  {
    position: false,
    path: '/assets/cat&dogs.png',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
    idx: 3,
  },
];

export default function Landing() {
  return (
    <div className="content">
      <h1 className="tittle">Grupo Latinoamericano de ayuda a mascotas</h1>
      {Data.map((d) => (
        <LandingContainter
          left={d.position}
          path={d.path}
          subt={d.subt}
          parag={d.parag}
        />
      ))}
      <h1 className="tittle">Contactanos</h1>
      <ContactForm />
    </div>
  );
}
