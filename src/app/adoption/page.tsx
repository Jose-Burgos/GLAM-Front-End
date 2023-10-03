'use client';

import React, { useEffect, useState } from 'react';
import './adoption.css';
import Card from '@/components/card';
import { getAnimals } from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import { Grid } from '@mui/material';

export default function AdoptView() {
  const [cardData, setCardData] = useState<Animal[]>();
  useEffect(() => {
    (async () => {
      const data = await getAnimals();
      setCardData(data);
    })();
  }, []);

  return (
    <div className="container">
      <h1 className="tittle">Adopciones</h1>
      <div className="grid">
        <Grid container spacing={1} justifyContent="center">
          {cardData?.map((card, idx) => (
            <Grid key={idx} item justifyContent="flex">
              <Card
                id={card.id}
                img="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
                name={card.name}
                description={card.breed}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
