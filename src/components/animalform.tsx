'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import {
  InputGroup,
  Button,
  useToast,
  Center,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  RadioGroup,
  Radio,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  ChakraProvider,
  CSSReset,
  VStack,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { Animal, SpeciesData } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import '../style/animalform.css';
import validateOngRegisterForm from '@/hooks/validation/validateAddAnimalForm';
import useValidation from '@/hooks/useValidation';

// Define the AnimalForm component
function AnimalForm(props: { animal?: Animal; submitBtnText?: string }) {
  // State variables
  const [orgId, setOrgId] = useState<string | null>();
  const [species, setSpecies] = useState({} as SpeciesData[]);
  const [formData, setFormData] = useState(props.animal as Animal);
  const { colorMode, toggleColorMode } = useColorMode();
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(formData, validateOngRegisterForm, onSubmit);

  // Styles for labels
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  // Fetch organization ID and species data on component mount
  useEffect(() => {
    (async () => {
      const id = await supabase.getCurrentUserId();
      const specie = await supabase.getSpecies();
      setOrgId(id);
      setSpecies(specie);
    })();
  }, []);

  // Toast hook for displaying notifications
  const toast = useToast();

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
      // Perform asynchronous operation (replace with your logic)
      values.org_id = orgId as string;
      await supabase.upsertAnimal(values as Animal);

      // Display success toast based on the operation type
      toast({
        title: 'Operación exitosa',
        description:
          props.submitBtnText === 'Agregar Animal'
            ? 'Animal agregado exitosamente'
            : 'Animal editado exitosamente',
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

  // Render the form
  return (
    <ChakraProvider>
      <CSSReset />
      {orgId != null && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          background="gray.100"
          bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
        >
          <VStack spacing={5} mt={120}>
            <Heading mb={2}>
              {props.submitBtnText === 'Agregar Animal'
                ? 'Agregar Animal'
                : 'Editar Animal'}
            </Heading>
            <Box
              width="md"
              p={8}
              boxShadow="md"
              borderRadius="md"
              bg={colorMode === 'light' ? 'white' : 'gray.600'}
            >
              <form id="addAnimal">
                {/* Species selection */}
                <FormControl marginBottom={5} isInvalid={errors.species_id}>
                  <FormLabel>Especie</FormLabel>
                  <Select
                    placeholder="Selecciona una especie"
                    onChange={handleChange}
                    value={values.species_id}
                    name="species_id"
                    id="species_id"
                  >
                    {species?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  {errors.species_id && (
                    <FormErrorMessage>{errors.species_id}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Name input */}
                <FormControl marginBottom={5} isInvalid={errors.name}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre"
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    //
                    shadow="inner"
                    type="text"
                    maxLength={20}
                  />
                  {errors.name && (
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Breed */}
                <FormControl marginBottom={5} isInvalid={errors.breed}>
                  <FormLabel>Raza</FormLabel>
                  <Input
                    placeholder="Raza"
                    name="breed"
                    id="breed"
                    value={values.breed}
                    onChange={handleChange}
                    shadow="inner"
                    type="text"
                    maxLength={20}
                  />
                  {errors.breed && (
                    <FormErrorMessage>{errors.breed}</FormErrorMessage>
                  )}
                </FormControl>
                {/* Height */}
                <FormControl marginBottom={5} isInvalid={errors.height}>
                  <FormLabel>Altura (cm)</FormLabel>
                  <Input
                    placeholder="Altura (cm)"
                    name="height"
                    id="height"
                    value={values.height}
                    onChange={handleChange}
                    shadow="inner"
                    type="text"
                    maxLength={20}
                  />
                  {errors.height && (
                    <FormErrorMessage>{errors.height}</FormErrorMessage>
                  )}
                </FormControl>
                {/* Back Length */}
                <FormControl marginBottom={5} isInvalid={errors.back_length}>
                  <FormLabel>Longitud del lomo (cm)</FormLabel>
                  <Input
                    placeholder="Longitud (cm)"
                    name="back_length"
                    id="back_length"
                    value={values.back_length}
                    onChange={handleChange}
                    shadow="inner"
                    type="text"
                    maxLength={20}
                  />
                  {errors.back_length && (
                    <FormErrorMessage>{errors.back_length}</FormErrorMessage>
                  )}
                </FormControl>
                {/* Weight */}
                <FormControl marginBottom={5} isInvalid={errors.weight}>
                  <FormLabel>Peso (kg)</FormLabel>
                  <Input
                    placeholder="Peso (kg)"
                    name="weight"
                    id="weight"
                    value={values.weight}
                    onChange={handleChange}
                    shadow="inner"
                    type="text"
                    maxLength={20}
                  />
                  {errors.weight && (
                    <FormErrorMessage>{errors.weight}</FormErrorMessage>
                  )}
                </FormControl>
                {/* Age */}
                <FormControl marginBottom={5} isInvalid={errors.age}>
                  <FormLabel>Edad (años)</FormLabel>
                  <Input
                    placeholder="Edad (años)"
                    name="age"
                    id="age"
                    value={values.age}
                    onChange={handleChange}
                    shadow="inner"
                    type="text"
                    maxLength={20}
                  />
                  {errors.age && (
                    <FormErrorMessage>{errors.age}</FormErrorMessage>
                  )}
                </FormControl>
                {/* Sex */}
                <FormControl marginBottom={5} isInvalid={errors.sex}>
                  <FormLabel>Sexo</FormLabel>
                  <RadioGroup
                    onChange={(value) =>
                      handleChange({ target: { name: 'sex', value } })
                    }
                    value={values.sex.toString()}
                  >
                    <Stack direction="row">
                      <Radio value={false.toString()}>Hembra</Radio>
                      <Radio value={true.toString()}>Macho</Radio>
                    </Stack>
                  </RadioGroup>
                  {errors.sex && (
                    <FormErrorMessage>{errors.sex}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Date of Rescue */}
                <FormControl marginBottom={5} isInvalid={errors.rescue_date}>
                  <FormLabel>Fecha de Rescate</FormLabel>
                  <InputGroup>
                    <DatePicker
                      selected={
                        values.rescue_date ? new Date(values.rescue_date) : null
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: 'rescue_date',
                            value: date?.toISOString(),
                          },
                        })
                      }
                      dateFormat="dd/MM/yyyy"
                    />
                  </InputGroup>
                  {errors.rescue_date && (
                    <FormErrorMessage>{errors.rescue_date}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Health Rating Slider */}
                <FormControl marginBottom={5} isInvalid={errors.health_rating}>
                  <FormLabel>Salud</FormLabel>
                  <Slider
                    colorScheme="gray"
                    aria-label="slider-ex-6"
                    step={10}
                    value={values.health_rating * 10}
                    onChange={(val) =>
                      handleChange({
                        target: { name: 'health_rating', value: val / 10 },
                      })
                    }
                  >
                    {/* Slider marks */}
                    <SliderMark value={25} {...labelStyles}>
                      25%
                    </SliderMark>
                    <SliderMark value={50} {...labelStyles}>
                      50%
                    </SliderMark>
                    <SliderMark value={75} {...labelStyles}>
                      75%
                    </SliderMark>

                    {/* Slider track and thumb */}
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {errors.health_rating && (
                    <FormErrorMessage>{errors.health_rating}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Vaccinated Radio Group */}
                <FormControl marginBottom={5} isInvalid={errors.vaccinated}>
                  <FormLabel>Vacunas</FormLabel>
                  <RadioGroup
                    onChange={(value) =>
                      handleChange({ target: { name: 'vaccinated', value } })
                    }
                    value={values.vaccinated.toString()}
                  >
                    <Stack direction="row">
                      <Radio value={true.toString()}>Si</Radio>
                      <Radio value={false.toString()}>No</Radio>
                    </Stack>
                  </RadioGroup>
                  {errors.vaccinated && (
                    <FormErrorMessage>{errors.vaccinated}</FormErrorMessage>
                  )}
                </FormControl>

            {/* Adopted Radio Group */}
            <FormControl marginBottom={5} isInvalid={errors.adopted}>
              <FormLabel >Estado</FormLabel>
              <RadioGroup
                onChange={(value) => handleChange({ target: { name: 'adopted', value } })}
                value={values.adopted.toString()}
              >
                <Stack direction='row'>
                  <Radio value={false.toString()}>No Adoptado</Radio>
                  <Radio value={true.toString()}>Adoptado</Radio>
                </Stack>
              </RadioGroup>
              {errors.adopted && <FormErrorMessage>{errors.adopted}</FormErrorMessage>}
            </FormControl>

            {/* Submit Button */}
            <Center>
              <Button
                mt={8}
                colorScheme="teal"
                type="submit"
                form="addAnimal"
                onClick={handleSubmit}
              >
                {props.submitBtnText || 'Submit'}
              </Button>
            </Center>
          </form>
          </Box>
        </VStack>
      </Box>
      )}
    </ChakraProvider>
  );
}

// Export the AnimalForm component
export default AnimalForm;
