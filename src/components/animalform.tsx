'use client'
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
} from '@chakra-ui/react';
import theme from '@/theme';
import { Animal, SpeciesData } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import '../style/animalform.css';
import validateOngRegisterForm from '@/hooks/validation/validateAddAnimalForm';
import useValidation from '@/hooks/useValidation';

// Define the AnimalForm component
function AnimalForm(props: { animal?: Animal; submitBtnText?: string }) {
  // State variables
  const [orgId, setOrgId] = useState<string>();
  const [species, setSpecies] = useState({} as SpeciesData[]);
  const [formData, setFormData] = useState(props.animal as Animal);
<<<<<<< HEAD
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(formData, validateOngRegisterForm, onSubmit);
  const [sliderValue, setSliderValue] = useState(50);
=======
  const { values, errors, submitForm, handleSubmit, handleChange } = useValidation(
    formData,
    validateOngRegisterForm,
    onSubmit
  );
>>>>>>> main

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

<<<<<<< HEAD
  useEffect(() => {
    console.log(values);
  }, [values]);
=======
  // Toast hook for displaying notifications
  const toast = useToast();
>>>>>>> main

  // Function to handle form submission
  async function onSubmit() {
<<<<<<< HEAD
    try {
      values.org_id = orgId as string;
      console.log(values);
      supabase.upsertAnimal(values as Animal);
    } catch (error) {
      console.log(error);
    }
  }
=======
    // Display a loading toast
    const toastId = toast({
      title: 'Agregando Informacion',
      description: 'Por favor espere',
      status: 'info',
      duration: 1000,
      isClosable: false,
      position: 'top-left',
    });
>>>>>>> main

    try {
      // Perform asynchronous operation (replace with your logic)
      values.org_id = orgId as string;
      await supabase.upsertAnimal(values as Animal);

      // Display success toast based on the operation type
      toast({
        title: 'Operación exitosa',
        description:
          props.submitBtnText === 'Add Animal'
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
      console.error('Error:', error);
    } finally {
      // Close the loading toast
      toast.close(toastId);
    }
  }

  // Render the form
  return (
    <Center>
      {orgId != null && (
        <Stack>
<<<<<<< HEAD
          <form id="addAnimal">
            {/* Species */}
            <FormControl marginBottom={5} isInvalid={errors.species}>
              <FormLabel color="black">Especie</FormLabel>
              <Select
                placeholder="Selecciona una especie"
                onChange={handleChange}
                value={values.species}
                name="species_id"
                id="species_id"
=======
          <form id='addAnimal'>
            {/* Species selection */}
            <FormControl marginBottom={5} isInvalid={errors.species_id}>
              <FormLabel color="black">Especie</FormLabel>
              <Select
                placeholder='Selecciona una especie'
                onChange={handleChange}
                value={values.species_id}
                name='species_id'
                id='species_id'
>>>>>>> main
              >
                {species?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
<<<<<<< HEAD
              {errors.species && (
                <FormErrorMessage>{errors.species}</FormErrorMessage>
              )}
=======
              {errors.species_id && <FormErrorMessage>{errors.species_id}</FormErrorMessage>}
>>>>>>> main
            </FormControl>

            {/* Name input */}
            <FormControl marginBottom={5} isInvalid={errors.name}>
              <FormLabel color="black">Nombre</FormLabel>
              <Input
                placeholder="Nombre"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                bg="inputbg"
                shadow="inner"
                type="text"
                maxLength={20}
              />
<<<<<<< HEAD
              {errors.name && (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              )}
            </FormControl>
=======
              {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
            </FormControl>

>>>>>>> main
            {/* Breed */}
            <FormControl marginBottom={5} isInvalid={errors.breed}>
              <FormLabel color="black">Raza</FormLabel>
              <Input
                placeholder="Raza"
                name="breed"
                id="breed"
                value={values.breed}
                onChange={handleChange}
                bg="inputbg"
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
              <FormLabel color="black">Altura (cm)</FormLabel>
              <Input
                placeholder="Altura (cm)"
                name="height"
                id="height"
                value={values.height}
                onChange={handleChange}
                bg="inputbg"
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
              <FormLabel color="black">Longitud del lomo (cm)</FormLabel>
              <Input
                placeholder="Longitud (cm)"
                name="back_length"
                id="back_length"
                value={values.back_length}
                onChange={handleChange}
                bg="inputbg"
                shadow="inner"
                type="text"
                maxLength={20}
              />
<<<<<<< HEAD
              {errors.species && (
                <FormErrorMessage>{errors.back_length}</FormErrorMessage>
              )}
=======
              {errors.back_length && <FormErrorMessage>{errors.back_length}</FormErrorMessage>}
>>>>>>> main
            </FormControl>
            {/* Weight */}
            <FormControl marginBottom={5} isInvalid={errors.weight}>
              <FormLabel color="black">Peso (kg)</FormLabel>
              <Input
                placeholder="Peso (kg)"
                name="weight"
                id="weight"
                value={values.weight}
                onChange={handleChange}
                bg="inputbg"
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
              <FormLabel color="black">Edad (años)</FormLabel>
              <Input
                placeholder="Edad (años)"
                name="age"
                id="age"
                value={values.age}
                onChange={handleChange}
                bg="inputbg"
                shadow="inner"
                type="text"
                maxLength={20}
              />
              {errors.age && <FormErrorMessage>{errors.age}</FormErrorMessage>}
            </FormControl>
            {/* Sex */}
            <FormControl marginBottom={5} isInvalid={errors.sex}>
              <FormLabel color="black">Sexo</FormLabel>
<<<<<<< HEAD
              <RadioGroup
                onChange={(value) =>
                  handleChange({ target: { name: 'sex', value } })
                }
                value={values.sex}
              >
                <Stack direction="row">
=======
              <RadioGroup onChange={(value) => handleChange({ target: { name: 'sex', value } })} value={values.sex.toString()}>
                <Stack direction='row'>
>>>>>>> main
                  <Radio value={false.toString()}>Hembra</Radio>
                  <Radio value={true.toString()}>Macho</Radio>
                </Stack>
              </RadioGroup>
              {errors.sex && <FormErrorMessage>{errors.sex}</FormErrorMessage>}
            </FormControl>

            {/* Date of Rescue */}
            <FormControl marginBottom={5} isInvalid={errors.rescue_date}>
              <FormLabel color="black">Fecha de Rescate</FormLabel>
              <InputGroup>
                <DatePicker
<<<<<<< HEAD
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
=======
                  selected={values.rescue_date ? new Date(values.rescue_date) : null}
                  onChange={(date) =>
                    handleChange({ target: { name: 'rescue_date', value: date?.toISOString() } })
>>>>>>> main
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
              <FormLabel color="black">Salud</FormLabel>
              <Slider
<<<<<<< HEAD
                colorScheme="gray"
                aria-label="slider-ex-6"
                step={10}
                onChange={(val) =>
                  handleChange({
                    target: { name: 'health_rating', value: val / 10 },
                  })
                }
              >
=======
                colorScheme='gray'
                aria-label='slider-ex-6'
                step={10}
                value={values.health_rating * 10}
                onChange={(val) => handleChange({ target: { name: 'health_rating', value: val / 10 } })}
              >
                {/* Slider marks */}
>>>>>>> main
                <SliderMark value={25} {...labelStyles}>
                  25%
                </SliderMark>
                <SliderMark value={50} {...labelStyles}>
                  50%
                </SliderMark>
                <SliderMark value={75} {...labelStyles}>
                  75%
                </SliderMark>

<<<<<<< HEAD
=======
                {/* Slider track and thumb */}
>>>>>>> main
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
<<<<<<< HEAD
              {errors.health_rating && (
                <FormErrorMessage>{errors.health_rating}</FormErrorMessage>
              )}
            </FormControl>
            {/* Vaccinated */}
            <FormControl marginBottom={5} isInvalid={errors.vaccinated}>
              <FormLabel color="black">Vacunas</FormLabel>
              <RadioGroup
                onChange={(value) =>
                  handleChange({ target: { name: 'vaccinated', value } })
                }
                value={values.vaccinated}
              >
                <Stack direction="row">
=======
              {errors.health_rating && <FormErrorMessage>{errors.health_rating}</FormErrorMessage>}
            </FormControl>

            {/* Vaccinated Radio Group */}
            <FormControl marginBottom={5} isInvalid={errors.vaccinated}>
              <FormLabel color="black">Vacunas</FormLabel>
              <RadioGroup
                onChange={(value) => handleChange({ target: { name: 'vaccinated', value } })}
                value={values.vaccinated.toString()}
              >
                <Stack direction='row'>
>>>>>>> main
                  <Radio value={true.toString()}>Si</Radio>
                  <Radio value={false.toString()}>No</Radio>
                </Stack>
              </RadioGroup>
              {errors.vaccinated && <FormErrorMessage>{errors.vaccinated}</FormErrorMessage>}
            </FormControl>

            {/* Submit Button */}
            <Center>
              <Button
                as="a"
                fontSize="sm"
                fontWeight={500}
                w={200}
                mt={5}
                mb={-3}
                color="black"
                bg={theme.colors.accent}
                _hover={{
                  textColor: 'gray',
                  borderColor: theme.colors.accent,
                }}
                form="addAnimal"
                onClick={handleSubmit}
              >
                {props.submitBtnText || 'Submit'}
              </Button>
            </Center>
          </form>
        </Stack>
      )}
    </Center>
  );
}

<<<<<<< HEAD
=======
// Export the AnimalForm component
>>>>>>> main
export default AnimalForm;
