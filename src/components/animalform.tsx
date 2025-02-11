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
    const [formData, setFormData] = useState(props.animal || {
      sex: 'false', // Default to "Hembra"
      vaccinated: 'false', // Default to "No"
    });

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
            <form id="addAnimal">
              {/* Species selection */}
              <FormControl marginBottom={5} isInvalid={errors.species_id}>
                <FormLabel color="black">Especie</FormLabel>
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
                {errors.name && (
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                )}
              </FormControl>

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

              {/* Sex */}
              <FormControl marginBottom={5} isInvalid={errors.sex}>
                <FormLabel color="black">Sexo</FormLabel>
                <RadioGroup
                 onChange={(value) =>
                  handleChange({ target: { name: 'sex', value: value.toString() } } as React.ChangeEvent<HTMLInputElement>)
                }                
                  value={values.sex !== undefined ? values.sex.toString() : 'false'} // Default value
                >
                  <Stack direction="row">
                    <Radio value={false.toString()}>Hembra</Radio>
                    <Radio value={true.toString()}>Macho</Radio>
                  </Stack>
                </RadioGroup>
                {errors.sex && <FormErrorMessage>{errors.sex}</FormErrorMessage>}
              </FormControl>

              {/* Vaccinated Radio Group */}
              <FormControl marginBottom={5} isInvalid={errors.vaccinated}>
                <FormLabel color="black">Vacunas</FormLabel>
                <RadioGroup
                  onChange={(value) =>

                    handleChange({ target: { name: 'vaccinated', value } } as React.ChangeEvent<HTMLInputElement>)
                  }
                  value={values.vaccinated !== undefined ? values.vaccinated.toString() : 'false'} // Default value
                >
                  <Stack direction="row">
                    <Radio value={true.toString()}>Sí</Radio>
                    <Radio value={false.toString()}>No</Radio>
                  </Stack>
                </RadioGroup>
                {errors.vaccinated && (
                  <FormErrorMessage>{errors.vaccinated}</FormErrorMessage>
                )}
              </FormControl>

              {/* Height */}
              <FormControl marginBottom={5} isInvalid={errors.height}>
                <FormLabel color="black">Altura</FormLabel>
                <Input
                  placeholder="Altura en cm"
                  name="height"
                  id="height"
                  value={values.height}
                  onChange={handleChange}
                  bg="inputbg"
                  shadow="inner"
                  type="text"
                />
                {errors.height && <FormErrorMessage>{errors.height}</FormErrorMessage>}
              </FormControl>

              {/* Back Length */}
              <FormControl marginBottom={5} isInvalid={errors.back_length}>
                <FormLabel color="black">Longitud del lomo</FormLabel>
                <Input
                  placeholder="Longitud en cm"
                  name="back_length"
                  id="back_length"
                  value={values.back_length}
                  onChange={handleChange}
                  bg="inputbg"
                  shadow="inner"
                  type="text"
                />
                {errors.back_length && (
                  <FormErrorMessage>{errors.back_length}</FormErrorMessage>
                )}
              </FormControl>

              {/* Weight */}
              <FormControl marginBottom={5} isInvalid={errors.weight}>
                <FormLabel color="black">Peso</FormLabel>
                <Input
                  placeholder="Peso en kg"
                  name="weight"
                  id="weight"
                  value={values.weight}
                  onChange={handleChange}
                  bg="inputbg"
                  shadow="inner"
                  type="text"
                />
                {errors.weight && <FormErrorMessage>{errors.weight}</FormErrorMessage>}
              </FormControl>

              {/* Age */}
              <FormControl marginBottom={5} isInvalid={errors.age}>
                <FormLabel color="black">Edad</FormLabel>
                <Input
                  placeholder="Edad"
                  name="age"
                  id="age"
                  value={values.age}
                  onChange={handleChange}
                  bg="inputbg"
                  shadow="inner"
                  type="text"
                />
                {errors.age && <FormErrorMessage>{errors.age}</FormErrorMessage>}
              </FormControl>

              {/* Rescue Date */}
              <FormControl marginBottom={5} isInvalid={errors.rescue_date}>
                <FormLabel color="black">Fecha de rescate</FormLabel>
                <DatePicker
  selected={values.rescue_date ? new Date(values.rescue_date) : null}
  onChange={(date) =>
    handleChange({
      target: { name: 'rescue_date', value: date ? date.toISOString().split('T')[0] : '' },
    } as React.ChangeEvent<HTMLInputElement>)  // Cast the object to the expected type
  }
  placeholderText="Selecciona la fecha"
  dateFormat="dd/MM/yyyy"
  isClearable
/>
                {errors.rescue_date && (
                  <FormErrorMessage>{errors.rescue_date}</FormErrorMessage>
                )}
              </FormControl>

              {/* Health Rating */}
              <FormControl marginBottom={5} isInvalid={errors.health_rating}>
                <FormLabel color="black">Porcentaje de salud</FormLabel>
                <Slider
  value={values.health_rating}
  onChange={(value) => handleChange({ target: { name: 'health_rating', value: value.toString() } } as any)}  // Use 'any' to bypass type check
  min={0}
  max={100}
>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
  <SliderMark value={values.health_rating} mt={2} ml={2}>
    {values.health_rating}%
  </SliderMark>
</Slider>
                {errors.health_rating && (
                  <FormErrorMessage>{errors.health_rating}</FormErrorMessage>
                )}
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

  // Export the AnimalForm component
  export default AnimalForm;
