'use client';

import { InputGroup, InputRightElement } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState, useEffect } from 'react';
import {
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

function AnimalForm(props: { animal?: Animal; submitBtnText?: string }) {
  const [orgId, setOrgId] = useState<string>();
  const [species, setSpecies] = useState({} as SpeciesData[]);
  const [formData, setFormData] = useState(props.animal as Animal);
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(formData, validateOngRegisterForm, onSubmit);
  const [sliderValue, setSliderValue] = useState(50);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  useEffect(() => {
    (async () => {
      const id = await supabase.getCurrentUserId();
      const specie = await supabase.getSpecies();
      setOrgId(id);
      setSpecies(specie);
    })();
  }, []);

  useEffect(() => {
    console.log(values);
  }, [values]);

  async function onSubmit() {
    try {
      values.org_id = orgId as string;
      console.log(values);
      supabase.upsertAnimal(values as Animal);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Center>
      {orgId != null && (
        <Stack>
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
              >
                {species?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.species && (
                <FormErrorMessage>{errors.species}</FormErrorMessage>
              )}
            </FormControl>
            {/* Name */}
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
              {errors.species && (
                <FormErrorMessage>{errors.back_length}</FormErrorMessage>
              )}
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
              <RadioGroup
                onChange={(value) =>
                  handleChange({ target: { name: 'sex', value } })
                }
                value={values.sex}
              >
                <Stack direction="row">
                  <Radio value={false.toString()}>Hembra</Radio>
                  <Radio value={true.toString()}>Macho</Radio>
                </Stack>
              </RadioGroup>
              {errors.sex && <FormErrorMessage>{errors.sex}</FormErrorMessage>}
            </FormControl>
            {/* Rescue Date */}
            <FormControl marginBottom={5} isInvalid={errors.rescue_date}>
              <FormLabel color="black">Fecha de Rescate</FormLabel>
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
            {/* Health Rating */}
            <FormControl marginBottom={5} isInvalid={errors.health_rating}>
              <FormLabel color="black">Salud</FormLabel>
              <Slider
                colorScheme="gray"
                aria-label="slider-ex-6"
                step={10}
                onChange={(val) =>
                  handleChange({
                    target: { name: 'health_rating', value: val / 10 },
                  })
                }
              >
                <SliderMark value={25} {...labelStyles}>
                  25%
                </SliderMark>
                <SliderMark value={50} {...labelStyles}>
                  50%
                </SliderMark>
                <SliderMark value={75} {...labelStyles}>
                  75%
                </SliderMark>

                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
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
                  <Radio value={true.toString()}>Si</Radio>
                  <Radio value={false.toString()}>No</Radio>
                </Stack>
              </RadioGroup>
              {errors.sex && <FormErrorMessage>{errors.sex}</FormErrorMessage>}
            </FormControl>
            {/* Send */}
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
                href="./ong/auth/home"
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

export default AnimalForm;
