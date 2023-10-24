'use client';

import React, { useEffect, useState } from 'react';
import { Animal } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';

export default function DeleteAnimal() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [userID, setUserID] = useState<string>();
  const [isOrg, setIsOrg] = useState(false);

  useEffect(() => {
    (async () => {
      // Get user info
      const { profile, type } = await supabase.getCurrentUser();
      setUserID(profile.public.id);
      if (type === 'Organization') {
        setIsOrg(true);
      }
      fetchAnimals();
    })();
  }, [userID]);

  async function fetchAnimals() {
    try {
      const animalsArray = await supabase.getAnimals();
      setAnimals(animalsArray);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  }

  const handleClick = (id: String) => {
    supabase.deleteAnimal(id as String);
  };

  return (
    <div>
      <h1>Eliminar Animal</h1>
      <p>Selecciona el animal a eliminar</p>
      {animals?.map(
        (animal: Animal) =>
          animal.org_id === userID && (
            <div key={animal.id}>
              <button onClick={() => handleClick(animal.id)}>
                {animal.name}
              </button>
              <br />
            </div>
          )
      )}
    </div>
  );
}
