'use client';

import React, { useEffect, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import {
  Flex,
  CircularProgress,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import PetCard from '@/components/petcard';
import LoadingSpinner from '@/components/loadingpinner';

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
    <Flex p={8} flexDirection="column" justifyContent="center">

        <Flex position="relative" mb="10%" mx="auto" >
          <Flex
            h={{ sm: 'initial'}}
            mt={{ sm: '2%', md: '15%', lg: '12.5%', xl: '12.5%' }}
            w="100wh"
            maxW="1044px"
            pt={{ sm: '100px', md: '0px' }}
          >
            <Flex justifyContent="start" style={{ userSelect: 'none' }}>
              <Flex
                alignItems="center"
                justifyContent="center"
                w="100%"
                background="transparent"
              > { success ? (<Grid
                gap={8}
                templateColumns={{
                  sm: 'repeat(1, 1fr)',
                  md: 'repeat(1, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
              >
                {(
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
                )}
              </Grid>) : (<LoadingSpinner/>) }
              </Flex>
            </Flex>
          </Flex>
        </Flex>
    </Flex>
  );
}
