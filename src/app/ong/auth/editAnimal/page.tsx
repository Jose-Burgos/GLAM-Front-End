'use client';

import React, { useEffect, useState } from 'react';
import { Animal } from '~/supabase/types/supabase.tables';
import helpers from '~/supabase/helpers';
import AnimalForm from '@/components/animalform';
import './editAnimal.css';
import { useParams } from 'react-router-dom';

export default function EditAnimal() {
  const [userID, setUserID] = useState<string>();
  const [isOrg, setIsOrg] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>();

  useEffect(() => {}, []);
  useEffect(() => {
    (async () => {
      // Get user info
      const { type } = await helpers.getCurrentUser();
      const user = await helpers.getCurrentUserId();
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get('id');
      const animal_id = await helpers.getAnimalById(id as string);
      setSelectedAnimal(animal_id);
      setSelected(true);
      setUserID(user);
      if (type === 'Organization') {
        setIsOrg(true);
      }
    })();
  }, [userID]);

  return (
    <div className="container">
      <h1>Editar Animal</h1>
      {selected && (
        <AnimalForm animal={selectedAnimal} submitBtnText="Editar Animal" />
      )}
    </div>
  );
}
