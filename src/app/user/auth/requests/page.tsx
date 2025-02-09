'use client';

// This is the landing page
import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
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
  const [cardData, setCardData] = useState<Animal[] | null>(null); // Updated to reflect when we fetch animal data
  const [success, setSuccess] = useState<boolean>(false); // Indicator of success

  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");

  useEffect(() => {
    const fetchAnimalData = async () => {
      if (owner) {
        // Fetch the requests by user (which should return animal IDs or references)
        const requestData = await HelperFunctions.getRequestsByUser(owner) as Animal[];
        console.log("Requests: ", requestData);

        // If there are requests, fetch the full animal details for each request ID
        if (requestData?.length > 0) {
          const animalDetailsPromises = requestData.map(async (request) => {
            // Fetch full animal data based on the ID in each request
            console.log(request);
            const fullAnimal = await HelperFunctions.getAnimalById(request.animal_id);
            return fullAnimal;
          });

          // Wait for all animal details to be fetched
          const animals = await Promise.all(animalDetailsPromises);
          console.log("Fetched Animals: ", animals);

          // Set the fetched animal details to state
          setCardData(animals);
          setSuccess(true); // Mark the fetching process as successful
        }
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
