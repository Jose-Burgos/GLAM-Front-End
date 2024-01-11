'use client';

import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Textarea,
  Button,
  Center,
  VStack,
  Heading,
  Stack,
  Text,
  useToast,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { SpeciesData } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import validateLostPetForm from '@/hooks/validation/validateLostPetForm';
import useValidation from '@/hooks/useValidation';

export default function LostPetReportView() {
  const [species, setSpecies] = useState({} as SpeciesData[]);
  const [speciesLoaded, setSpeciesLoaded] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const initialState = {
    species_id: '',
    location: '',
    description: '',
    details: '',
  };
  const toast = useToast();
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateLostPetForm, onSubmit);

  // Fetch organization ID and species data on component mount
  useEffect(() => {
    if (!speciesLoaded) {
      (async () => {
        const specie = await supabase.getSpecies();
        setSpecies(specie);
        setSpeciesLoaded(true);
      })();
    }
  }, [speciesLoaded]);

  // Function to handle form submission
  async function onSubmit() {
    // Display a loading toast
    const toastId = toast({
      title: 'Agregando Informacion',
      description: 'Por favor espere',
      status: 'info',
      duration: 1000,
      isClosable: false,
      position: 'top-left',
    });

    try {
      // Aquí va la función para que se envíe el formulario al backend

      // Display success toast based on the operation type
      toast({
        title: 'Operación exitosa',
        description: 'Reporte completado, se ha enviado correctamente',
        status: 'success',
        duration: 5000,
        position: 'top-left',
      });

      // Redirect to the desired page
      window.location.href = '/ong/auth/home';
    } catch (error) {
      // Display error toast if the operation fails
      toast({
        title: 'Operación Fallida',
        description: 'Algo salió mal',
        status: 'error',
        duration: 5000,
        position: 'top-left',
      });

      // Perform additional actions after the operation fails
      // console.error('Error:', error);
    } finally {
      // Close the loading toast
      toast.close(toastId);
    }
  }

  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.400', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const bgIcons = useColorModeValue('white', 'teal.200');

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <VStack spacing={5} mt="15%">
        <Heading mb={2} color={titleColor}>
          Reporte de Mascotas Perdidas
        </Heading>
        <Box width="md" p={8} boxShadow="md" borderRadius="md" bg={bgColor}>
          <form id="lostAnimalForm">
            {/* Type of Animal */}
            <FormControl marginBottom={5} isInvalid={errors.species_id}>
              <FormLabel>Tipo de animal</FormLabel>
              <Select
                borderRadius="15px"
                placeholder="Selecciona una especie"
                onChange={handleChange}
                value={values.species_id}
                name="species_id"
                id="species_id"
              >
                {Array.isArray(species) &&
                  species.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Select>
              {errors.species_id && (
                <FormErrorMessage>{errors.species_id}</FormErrorMessage>
              )}
            </FormControl>

            {/* Location */}
            <FormControl marginBottom={5} isInvalid={errors.location}>
              <FormLabel>Ubicacion</FormLabel>
              <Input
                placeholder="Ubicación"
                borderRadius="15px"
                name="location"
                id="location"
                value={values.location}
                onChange={handleChange}
                // shadow="inner"
                type="text"
                maxLength={50}
              />
              {errors.location && (
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              )}
            </FormControl>

            {/* Animal description */}
            <FormControl marginBottom={5} isInvalid={errors.description}>
              <FormLabel>Descripción:</FormLabel>
              <Textarea
                borderRadius="15px"
                value={values.description}
                onChange={handleChange}
                name="description"
                placeholder="Descripción del animal"
                size="sm"
              />
              {errors.description && (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              )}
            </FormControl>

            {/* More details */}
            <FormControl marginBottom={5} isInvalid={errors.details}>
              <FormLabel>Más detalles:</FormLabel>
              <Textarea
                borderRadius="15px"
                value={values.details}
                onChange={handleChange}
                name="details"
                placeholder="Más detalles"
                size="sm"
              />
              {errors.details && (
                <FormErrorMessage>{errors.details}</FormErrorMessage>
              )}
            </FormControl>

            {/* Submit Button */}
            <Center>
              <Button
                fontSize="15px"
                bg="teal.300"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: 'teal.200',
                }}
                _active={{
                  bg: 'teal.400',
                }}
                type="submit"
                form="lostAnimalForm"
                onClick={handleSubmit}
              >
                Enviar Reporte
              </Button>
            </Center>

            <Stack spacing={6} mt="5%">
              <Text />
              <Text textAlign="center" fontSize="lg" textColor="red.500">
                Recuerda que las ONGs no pueden confiscar mascotas.
              </Text>
              <Text textAlign="center" fontSize="lg" textColor="red.500">
                Si presencias un caso de abuso animal, llama al 911.
              </Text>
            </Stack>
          </form>
        </Box>
      </VStack>
    </Box>
  );
}
