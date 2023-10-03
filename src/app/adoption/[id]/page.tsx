'use client';

import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAnimals } from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';

interface props {
  params: { id: string };
}

export default function animalDescription(pparam: props) {
  const [data, setData] = useState<Animal>();
  useEffect(() => {
    (async () => {
      const aux = await getAnimals();
      setData(aux?.find((animal) => animal.id === pparam.params.id));
    })();
  }, [pparam.params.id]);

  return (
    <div>
      <h1>{data?.name}</h1>
      <h1>{data?.age}</h1>
      <h1>{data?.breed}</h1>
      <Button>Contactame</Button>
    </div>
  );
}
