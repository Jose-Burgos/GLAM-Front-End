'use client';

import React, { useEffect, useState } from 'react';
import { Request } from '~/supabase/types/supabase.tables'; // Use the Request type
import supabase from '~/supabase/helpers';
import {
  Box,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import AdminSidebarResponsive from '@/components/adminSidebar';

export default function UserDashboard() {
  const bgCard = useColorModeValue('white', 'gray.700');

  // State to store the adoption requests with the correct type
  const [adoptionRequests, setAdoptionRequests] = useState<Request[]>([]);

  useEffect(() => {
    (async () => {
      // Fetch the adoption requests and set the state
      const data = await supabase.getOrgAdoptionRequestsForDashboard();
      setAdoptionRequests(data); // Now TypeScript knows it's a Request[] type
    })();
  }, []);

  // Handle the click event for the button using window.location
  const handleAddAnimalClick = () => {
    window.location.href = '/ong/auth/addAnimal';  // Correct path to addAnimal page
  };

  // Handle accept request
  const handleAcceptRequest = async (requestId: string, animalId: string) => {
    try {
      console.log(`Accepted request with ID: ${requestId}`);
      
      // Call the deleteAnimal function to delete the animal from the database
      await supabase.deleteAnimal(animalId); 
  
      // Optionally, you can update your UI state to reflect the changes
      setAdoptionRequests(adoptionRequests.filter(request => request.animal_id !== animalId));
  
      console.log(`Animal with ID: ${animalId} has been deleted.`);
      // Add other logic if needed (e.g., updating the request status)
    } catch (error) {
      console.error("Error accepting request:", error.message);
    }
  };

  // Handle reject request
// Handle reject request
const handleRejectRequest = async (requestId: string) => {
  console.log(`Rejected request with ID: ${requestId}`);

  try {
    // Delete the request from the database
    await supabase.deleteRequest(requestId); 

    // Remove the rejected request from the state
    setAdoptionRequests(adoptionRequests.filter(request => request.request_id !== requestId));

    console.log(`Request with ID: ${requestId} has been rejected and removed from the database.`);
  } catch (error) {
    console.error("Error rejecting request:", error.message);
  }
};


  return (
    <Flex p={8} flexDirection="column" justifyContent="center">
      <HStack>
        <Flex mt={{ lg: '-50%', xl: '-30%' }}>
          <AdminSidebarResponsive />
        </Flex>
        <Flex
          direction="column"
          w="100%"
          mb={8}
          px={{ base: 4, md: 8 }}
          pt={{ base: '120px', md: '14%', lg: '12%' }}
        >
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            {/* Render adoption request cards */}
            {adoptionRequests.length > 0 ? (
              adoptionRequests.map((request, index) => (
                <Box
                  key={request.request_id || index}  // Use 'request_id' as key or fallback to 'index'
                  h={250}  // Increase height to accommodate buttons
                  borderRadius="15px"
                  p={4}
                  bg={bgCard}
                  boxShadow="md"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <VStack spacing={4} align="start">
                    <Text fontWeight="bold" fontSize="lg">
                      {request.user_name || 'No Adopter Name'}  {/* Display adopter's name */}
                    </Text>
                    <Text color="gray.600">
                      {request.description || 'No Description'}  {/* Display description of the animal */}
                    </Text>
                    <Text>{'Pending'}</Text> {/* Display static 'Pending' as per your current logic */}
                  </VStack>

                  {/* Buttons at the bottom */}
                  <HStack justify="space-between" w="100%" mt="auto">
                  <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleAcceptRequest(request.request_id, request.animal_id)}  // Pass request ID and animal ID
                  w="48%"
                  >
                  Aceptar
                </Button>
                <Button
                colorScheme="red"
                size="sm"
                onClick={() => handleRejectRequest(request.request_id)}  // Pass request ID
                w="48%">
                Rechazar
                </Button>
                  </HStack>

                </Box>
              ))
            ) : (
              <Box h={200} borderRadius="15px" p={4} bg={bgCard} boxShadow="md">
                <Text>No hay pedidos de adopción disponibles.</Text>
              </Box>
            )}
          </SimpleGrid>

          {/* Add the button here */}
          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleAddAnimalClick}  // Trigger the redirection using window.location
            mt={6}  // Add some margin on top of the button
          >
            Nuevo Animal
          </Button>

          {/* Additional grid content */}
          <Grid
            templateColumns={{ md: '1fr', lg: '1.8fr 1.2fr' }}
            templateRows={{ md: '1fr auto', lg: '1fr' }}
            my="26px"
            gap="24px"
          >
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              <Text>Notificaciones</Text>
            </Box>
            <Box h={200} borderRadius="15px" p={2} bg={bgCard}>
              <Text>Historial de Donaciones</Text>
            </Box>
          </Grid>
        </Flex>
      </HStack>
    </Flex>
  );
}
