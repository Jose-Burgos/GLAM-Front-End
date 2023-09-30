'use client';

import React, { useEffect, useState } from 'react';
import { getAnimals } from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import { supabase } from '../../../supabase/supabaseClient';


export default function PatitasGlew() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    (async () => {
      const animalsData = await getAnimals();
      setAnimals(animalsData);
    })()
  }, [])

  const AddAnimal = async (animal: Animal) => {
    const { data, error } = await supabase.from('animals').insert(animal).select() 
    if(error){
      console.log(error)
    }
    else{
      console.log('exito')
    }
  }

  return (
    <div>
      <h1>PatitasGlew</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>{animal.name}</li>
        ))}
      </ul>
      <a href="/updateAnimal">
        <span style={{ color: 'black' }}>Actualizar Animal</span>
      </a>
    </div>
  );
}
