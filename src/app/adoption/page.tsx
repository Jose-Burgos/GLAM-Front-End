'use client';

import React, { useEffect, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import { Flex, CircularProgress, Grid, GridItem } from '@chakra-ui/react';
import PetCard from '@/components/petcard';
import NavBar from '@/components/navbar';

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
    <Flex position="relative" mb="10%">
      <Flex
        h={{ sm: 'initial', md: '75vh', lg: '85vh' }}
        mt={{ sm: '5%', md: '15%', lg: '10%', xl: '8%' }}
        w="100wh"
        maxW="1044px"
        mx="auto"
        pt={{ sm: '100px', md: '0px' }}
      >
        <Flex justifyContent="start" style={{ userSelect: 'none' }}>
          <Flex
            alignItems="center"
            justifyContent="center"
            w="100%"
            background="transparent"
          >
            <Grid
              gap={8}
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
                lg: 'repeat(4, 1fr)',
              }}
            >
              {success ? (
                cardData?.map((card, idx) => (
                  <GridItem key={idx}>
                    <PetCard
                      id={card.id}
                      img="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
                      name={card.name}
                      description={card.breed}
                      species_id={card.species_id}
                      isLoggedIn={true}
                    />
                  </GridItem>
                ))
              ) : (
                <CircularProgress isIndeterminate color="teal.300" />
              )}
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
