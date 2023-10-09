import AnimalForm from '@/components/animalform';
import React from 'react';
import './addAnimal.css';

export default function AddAnimal() {
  return (
    <>
      <h1 className="title">Agregar Animal</h1>
      <AnimalForm />
    </>
  );
}
