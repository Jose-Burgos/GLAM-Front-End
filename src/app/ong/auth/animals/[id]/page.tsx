'use client';

import React, { useEffect, useState } from 'react';
import { Animal } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import AnimalForm from '@/components/animalform';
import './editAnimal.css';
import { useParams } from 'react-router-dom';

interface Params {
  params: {
    id: string;
  };
}

export default function EditAnimal({ params }: Params) {
  const [selected, setSelected] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>();

  useEffect(() => {}, []);
  useEffect(() => {
    (async () => {
      const animal_id = await supabase.getAnimalById(params.id);
      setSelectedAnimal(animal_id);
      setSelected(true);
    })();
  }, []);

  return (
    <div className="container">
      <h1>Editar Animal</h1>
      {selected && (
        <AnimalForm animal={selectedAnimal} submitBtnText="Editar Animal" />
      )}
    </div>
  );
}
