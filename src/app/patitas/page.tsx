'use client';

import React, { useEffect } from 'react';
import { getAnimals } from '~/supabase/helpers';

export default function PatitasGlew() {
  useEffect(() => {
    (async () => {
      const animals = await getAnimals();
      console.log(animals);
    })();
  }, []);
  return (
    <div>
      <h1>PatitasGlew</h1>
    </div>
  );
}
