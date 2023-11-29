'use client';

import React, { useEffect, useState } from 'react';

import { Animal, AdoptionRequest } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import AnimalCard from '@/components/animalCard';
import DonationHistory from '@/components/donations';
import NotificationsHistory from '@/components/notifications';
import {
  Box,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import UserDashboardSidebar from '@/components/UserDashboardSidebar';

/* export default function animalInfo() {
  const [data, setData] = useState<Animal[]>();
  // const [userID, setUserID] = useState<string>();
  // const [requests, setRequests] = useState<Request[]>();
  useEffect(() => {
    (async () => {
      const aux = await supabase.getAnimals();
      // const request = await supabase.getUserAdoptionRequests();
      // const user  = await supabase.getCurrentUser();
      setData(aux);
      // setUserID(user?.profile.public.id);
      // setRequests(request);
    })();
  }, []);

  // getUserAdoptionRequests te devuelve solo las requests del usuario...
  // const adopctions = requests?.filter(request => request.user_id === userID);
  return <h1>Soon</h1>;
}
*/
/*  
      {data?.filter(animal => adopctions?.filter(request => animal.id === request.animal_id )).map((animal) => (
      <AnimalCard key={animal.id} {...animal} />))}
*/

export default function UserDashboard() {
  const bgCard = useColorModeValue('white', 'gray.700');
  return (
    <Flex p={8} flexDirection="column" justifyContent="center">
      <HStack>
        <Flex mt={{ lg: '-50%', xl: '-30%' }}>
          <UserDashboardSidebar />
        </Flex>
        <Flex
          direction="column"
          w="100%"
          mb={8}
          px={{ base: 4, md: 8 }}
          pt={{ base: '120px', md: '14%', lg: '12%' }}
        >
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Hola
            </Box>
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Hola
            </Box>
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Hola
            </Box>
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Hola
            </Box>
          </SimpleGrid>
          <Grid
            templateColumns={{ md: '1fr', lg: '1.8fr 1.2fr' }}
            templateRows={{ md: '1fr auto', lg: '1fr' }}
            my="26px"
            gap="24px"
          >
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Hola
            </Box>
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Mundo
            </Box>
          </Grid>
          <Grid
            templateColumns={{ sm: '1fr', lg: '1.3fr 1.7fr' }}
            templateRows={{ sm: 'repeat(2, 1fr)', lg: '1fr' }}
            gap="24px"
            mb={{ lg: '26px' }}
          >
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Hola
            </Box>
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Mundo
            </Box>
          </Grid>
          <Grid
            templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '2fr 1fr' }}
            templateRows={{ sm: '1fr auto', md: '1fr', lg: '1fr' }}
            gap="24px"
          >
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Hola
            </Box>
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              Mundo
            </Box>
          </Grid>
        </Flex>
      </HStack>
    </Flex>
  );
}
