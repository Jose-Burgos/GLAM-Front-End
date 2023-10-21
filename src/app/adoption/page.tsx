'use client';

import React, { useEffect, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import Loading from '@/components/loading';
import { Center, Grid, GridItem } from '@chakra-ui/react';
import PetCard from '@/components/petcard';

export default function AdoptView() {
  const [cardData, setCardData] = useState<Animal[]>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await HelperFunctions.getAnimals();
      setCardData(data);
      setSuccess(true);
    })();
  }, []);

  return (
    <Center mr={['-1%']}>
      <Grid
        templateColumns={[
          'repeat(1, fr)',
          'repeat(2, fr)',
          'repeat(3, 3fr)',
          'repeat(4, 4fr)',
          'repeat(5, 5fr)',
        ]}
        gap={8}
        padding={5}
      >
        {success ? (
          cardData?.map((card, idx) => (
            <GridItem key={idx}>
              <PetCard
                id={card.id}
                img="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
                name={card.name}
                description={card.breed}
              />
            </GridItem>
          ))
        ) : (
          <Loading />
        )}
      </Grid>
    </Center>
  );
}
