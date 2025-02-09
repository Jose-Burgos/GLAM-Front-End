// Tiene que ser client para el password reset que necesita useEffect.
// Después igual se puede cambiar a dónde redirecciona el mail de confimación
// de cambio de clave y movemos el useEffect ahí y listo.

'use client';

// This is the landing
import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import IconBox from '@/assets/icons/iconBox';
import {
  AboutUsLogo,
  AdoptLogo,
  DonateLogo,
  OngLogo,
} from '@/assets/icons/icons';
import { Separator } from '@/components/separator';
import PetCard from '@/components/petcard';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import NavBar from '@/components/navbar';


export default function Landing() {
  const [cardData, setCardData] = useState<Animal[]>();
  const [success, setSuccess] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");

  useEffect(() => {
    (async () => {
      if (owner) {
        const data = await HelperFunctions.getAnimalsByOrg(owner);
        setCardData(data);
        setSuccess(true);
      }
    })();
  }, []);
  const titleColor = useColorModeValue('black', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const bgIcons = useColorModeValue('white', 'teal.200');
  return (
    <>
      <NavBar />
      <Flex pos="relative" mb="10%">
        <Flex
          mt={{ sm: '5%', md: '15%', lg: '15%', xl: '10%' }}
          w="100wh"
          mx="auto"
          pt={{ sm: '100px', md: '0px' }}
          direction="column"
        >
          <Box mt="5%">
            <Heading color={titleColor}>Mis Mascotas</Heading>
            <Separator mt="8px" />
            <Flex position="relative" mb="10%">
              <Flex
                mt={{ sm: '-10%', md: '12%', lg: '5%', xl: '5%' }}
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
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
