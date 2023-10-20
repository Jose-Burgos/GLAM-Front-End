// Tiene que ser client para el password reset que necesita useEffect.
// Después igual se puede cambiar a dónde redirecciona el mail de confimación
// de cambio de clave y movemos el useEffect ahí y listo.

'use client';

// This is the landing
import React from 'react';
import '@/app/landing.css';
import { Stack, Text } from '@chakra-ui/react';
import ContactForm from '@/components/contactform';
import LandingContainter from '@/components/landingcontainter';
import askNewPassOnReset from '~/supabase/helpers';

interface DataStructure {
  position: boolean;
  path: string;
  subt: string;
  parag: string;
}
const Data: Array<DataStructure> = [
  {
    position: true,
    path: '/assets/fonod.jpg',
    subt: 'Quienes somos?',
    parag:
      'Somos una organización sin fines de lucro, con el objetivo de que todos los animales maltratados o en situación de calle tengan la posibilidad de encontrar un nuevo hogar.',
  },
  {
    position: false,
    path: '/assets/fonod.jpg',
    subt: 'Adopciones',
    parag:
      'Para adoptar un animal, crea una cuenta como usuario y luego ve a la página de ADOPCIONES, luego, haz clic en "Detalles" para ver los datos de un animal.',
  },
  {
    position: true,
    path: '/assets/fonod.jpg',
    subt: 'Detalles',
    parag:
      'Una vez en la página de detalles, busca el formulario de contacto y envía un mensaje. La ONG se pondrá en contacto contigo pronto.',
  },
  {
    position: false,
    path: '/assets/fonod.jpg',
    subt: 'ONG: Agregar',
    parag:
      'Para poner en adopción un animal, debes tener una cuenta de ONG. Una vez creada, podrás agregar animales desde tu página de inicio.',
  },
];

export default function Landing() {
  return (
    <Stack p={4}>
      <Text fontFamily="heading" fontSize="2xl" align="center" color="black">
        Grupo Latinoamericano de Ayuda a Mascotas
      </Text>
      {Data.map((d, idx) => (
        <LandingContainter
          left={d.position}
          path={d.path}
          subt={d.subt}
          parag={d.parag}
          key={idx}
        />
      ))}
    </Stack>
  );
}
