'use client';

import React, { useEffect, useState } from 'react';

import { Animal, Request } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import AnimalCard from '@/components/animalCard';
import DonationHistory from '@/components/donations';
import NotificationsHistory from '@/components/notifications';
import { Text } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import AdminSidebarResponsive from '@/components/adminSidebar';

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
        <Flex>
          <AdminSidebarResponsive />
        </Flex>
        <Flex
          direction="column"
          w="100%"
          mb={8}
          px={{ base: 4, md: 8 }}
          pt={{ base: '100px', md: '12%', lg: '10%' }}
        >
          <Text fontSize="4xl" fontWeight="bold" mb={4}>Dashboard</Text>
          
          <Box mb={6} p={4} borderRadius="15px" bg={bgCard} boxShadow="md">
            Solicitud 1
          </Box>
          
          <Box mb={6} p={4} borderRadius="15px" bg={bgCard} boxShadow="md">
          Solicitud 2
          </Box>
          
          <Box mb={6} p={4} borderRadius="15px" bg={bgCard} boxShadow="md">
            Solicitud 3
          </Box>
          
          <Box mb={6} p={4} borderRadius="15px" bg={bgCard} boxShadow="md">
          Solicitud 4
          </Box>
        </Flex>
      </HStack>
    </Flex>
  );
}