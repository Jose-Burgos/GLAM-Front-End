import AnimalForm from '~/src/components/animalform';
import React from 'react';
import './addAnimal.css';
import { Animal } from '~/supabase/types/supabase.tables';

export default function AddAnimal() {
  const opcionesFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const initialAnimal = {
    adopted: false,
    age: 0,
    back_length: 0,
    breed: '',
    health_rating: 0,
    height: 0,
    name: '',
    rescue_date: new Date().toISOString(),
    sex: false,
    species_id: 0,
    vaccinated: false,
    weight: 0,
  };
  return (
    <>
      <h1 className="title">Agregar Animal</h1>
      <AnimalForm
        animal={initialAnimal as Animal}
        submitBtnText="Agregar Animal"
      />
    </>
  );
}
