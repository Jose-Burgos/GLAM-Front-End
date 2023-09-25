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
    
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session)
    //   })

    //   supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session)
    // })
    // console.log(session)

    (async () => {
      const animalsData = await getAnimals();
      setAnimals(animalsData);
    })();
  }, []);

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
