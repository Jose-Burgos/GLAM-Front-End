'use client'

import React, { useEffect, useState } from 'react';
import { Request } from '~/supabase/types/supabase.tables'; // Use the Request type
import supabase from '~/supabase/helpers';
import {
  Box,
  Flex,
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
  const [animalNames, setAnimalNames] = useState<{ [key: string]: string }>({}); // New state to store animal names

  useEffect(() => {
    (async () => {
      // Fetch the adoption requests and set the state
      const data = await supabase.getOrgAdoptionRequestsForDashboard();
      setAdoptionRequests(data); // Now TypeScript knows it's a Request[] type

      // Fetch animal names for each request
      const animalNamePromises = data.map(async (request) => {
        const animal = await supabase.getAnimalById(request.animal_id);
        return { animalId: request.animal_id, animalName: animal.name };
      });

      // Wait for all animal names to be fetched
      const animalNamesData = await Promise.all(animalNamePromises);

      // Map the results to the state
      const animalNamesMap = animalNamesData.reduce((acc, { animalId, animalName }) => {
        acc[animalId] = animalName;
        return acc;
      }, {} as { [key: string]: string });

      setAnimalNames(animalNamesMap); // Set the state with animal names
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
      setAdoptionRequests(
        adoptionRequests.filter((request: any) => request.animal_id !== animalId)
      );
      
  
      console.log(`Animal with ID: ${animalId} has been deleted.`);
      // Add other logic if needed (e.g., updating the request status)
    } catch (error) {
      console.error("Error accepting request:", error.message);
    }
  };

  // Handle reject request
  const handleRejectRequest = async (requestId: string) => {
    console.log(`Rejected request with ID: ${requestId}`);

    try {
      // Delete the request from the database
      await supabase.deleteRequest(requestId); 

      // Remove the rejected request from the state
      console.log(`Request with ID: ${requestId} has been rejected.`);
      setAdoptionRequests(adoptionRequests.filter((request:any) => request.request_id !== requestId));
    } catch (error) {
      console.error("Error rejecting request:", error.message);
    }
  };

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
          pt={{ base: '120px', md: '14%', lg: '12%' }}
        >
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            {/* Render adoption request cards */}
            {adoptionRequests.length > 0 ? (
              adoptionRequests.map((request:any, index) => (
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
                      Adoptante: {request.user_name || 'Error'}  {/* Display adopter's name */}
                    </Text>
                    <Text color="gray.600">
                      Descripción del pedido: {request.description || 'Sin descripción'}  {/* Display description of the animal */}
                    </Text>
                    <Text fontWeight="bold" fontSize="lg">
                      Mascota: {animalNames[request.animal_id] || 'Animal sin nombre'}  {/* Display animal's name */}
                    </Text>
                    <Text>Pendiente</Text> {/* Display static 'Pending' as per your current logic */}
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
                      w="48%"
                    >
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
        </Flex>
      </HStack>
    </Flex>
  );
}
