'use client';

// This is the landing page
import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import PetCard from '@/components/petcard';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import NavBar from '@/components/navbar';
import { Separator } from '@/components/separator';


export default function Landing() {
  const [cardData, setCardData] = useState<Animal[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");

  useEffect(() => {
    const fetchAnimalData = async () => {
      if (!owner) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Obtener las solicitudes de adopción del usuario
        const requestData = await HelperFunctions.getRequestsByUser(owner);

        // Si no hay solicitudes, detener la carga y no continuar
        if (!requestData || requestData.length === 0) {
          setCardData([]);
          setLoading(false);
          return;
        }

        // Obtener detalles de cada animal de las solicitudes
        const animalDetailsPromises = requestData.map(async (request) => {
          console.log(request);
          return HelperFunctions.getAnimalById(request.animal_id);
        });

        const animals = await Promise.all(animalDetailsPromises);
        console.log("Fetched Animals: ", animals);

        setCardData(animals);
      } catch (err) {
        setError("Ocurrió un error al cargar las solicitudes.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, [owner]);

  const titleColor = useColorModeValue('black', 'teal.200');
  const bgColor = useColorModeValue('white', 'gray.700');
  
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
            <Heading color={titleColor}>Mis Solicitudes</Heading>
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
                    {loading ? ( 
                      // Muestra el spinner mientras se cargan los datos
                      <CircularProgress isIndeterminate color="teal.300" />
                    ) : error ? ( 
                      // Muestra un mensaje de error si ocurre un problema
                      <Text fontSize="xl" color="gray.500" >
                        Ocurrió un error al cargar las solicitudes.
                      </Text>
                    ) : cardData && cardData.length > 0 ? ( 
                      // Muestra la grilla con las solicitudes si hay datos
                      <Grid
                        gap={8}
                        templateColumns={{
                          sm: 'repeat(1, 1fr)',
                          md: 'repeat(1, 1fr)',
                          lg: 'repeat(4, 1fr)',
                        }}
                      >
                        {cardData.map((card, idx) => (
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
                        ))}
                      </Grid>
                    ) : ( 
                      // Si no hay solicitudes, muestra un mensaje indicando eso
                      <Text fontSize="xl" color="gray.500">
                        No tienes solicitudes de adopción en este momento.
                      </Text>
                    )}
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
