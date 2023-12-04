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
  Textarea,
} from '@chakra-ui/react';
import theme from '@/theme';
import supabase from '~/supabase/helpers';
import validateInKindDonationForm from '@/hooks/validation/validateInKindDonationForm';
import useValidation from '@/hooks/useValidation';
import {
  Org,
  InKindDonation,
  ProfileType,
} from '~/supabase/types/supabase.tables';
// Define the inKindDonations component
export default function InKindDonationForm() {
  // State variables
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [ONGs, setONGs] = useState({} as Org[]);

  const initialState = {
    type: '',
    ong: '',
    description: '',
    quantity: 0,
    condition: '',
    availability: new Date(),
  };
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateInKindDonationForm, onSubmit);

  // Fetch organization ID and species data on component mount
  useEffect(() => {
    (async () => {
      const ongs = await supabase.getOrganizations();
      const loggedUser = await supabase.getCurrentUser();
      setONGs(ongs);
      setUserType(loggedUser.type);
      setUserId(loggedUser.profile.public.id);
      // console.log(loggedUser)
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
      // Perform asynchronous operation 
      values.user = userId as string;
      await supabase.submitInKindDonation(values as InKindDonation);
      // Display success toast based on the operation type
      toast({
        title: 'Operación exitosa',
        description:
          'Formulario enviado, se notificara sobre su donativo a la ONG',
        status: 'success',
        duration: 5000,
        position: 'top-left',
      });

      // Redirect to the home page
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
        <Stack>
          <form id="inKindDonations">
            {/* Species selection */}
            <FormControl marginBottom={5} isInvalid={errors.ong}>
              <FormLabel>ONG</FormLabel>
              <Select
                placeholder="Selecciona la ONG a la que desea donar"
                onChange={handleChange}
                value={values.ong}
                name="ong"
                id="ong"
                mb="24px"
                borderRadius="15px"
                fontSize="sm"
                size="lg"
              >
                {ONGs?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.ong && <FormErrorMessage>{errors.ong}</FormErrorMessage>}
            </FormControl>

            {/* Donations Type */}
            <FormControl marginBottom={5} isInvalid={errors.type}>
              <FormLabel>Tipo de donativo</FormLabel>
              <Select
                placeholder="Selecciona el tipo de donativo"
                onChange={handleChange}
                value={values.type}
                name="type"
                id="type"
                mb="24px"
                borderRadius="15px"
                fontSize="sm"
                size="lg"
              >
                <option key="food" value="Alimentos">
                  Alimentos
                </option>
                <option key="medic" value="Suministros Medicos">
                  Suministros Medicos
                </option>
                <option key="cleaning" value="Articulos de Limpieza">
                  Articulos de Limpieza
                </option>
                <option key="home" value="Suministros para el Refugio">
                  Suministros para el Refugio
                </option>
              </Select>
              {errors.type && (
                <FormErrorMessage>{errors.type}</FormErrorMessage>
              )}
            </FormControl>

            {/* Item description */}
            <FormControl marginBottom={5} isInvalid={errors.description}>
              <FormLabel>Descripción:</FormLabel>
              <Textarea
                value={values.description}
                onChange={handleChange}
                name="description"
                placeholder="Descripción de el/los articulo(s) a donar"
                mb="24px"
                borderRadius="15px"
                fontSize="sm"
                size="lg"
              />
              {errors.description && (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              )}
            </FormControl>

            {/* Quantity */}
            <FormControl marginBottom={5} isInvalid={errors.quantity}>
              <FormLabel>Cantidad</FormLabel>
              <Input
                placeholder="Unidades"
                name="quantity"
                id="quantity"
                value={values.quantity}
                onChange={handleChange}
                type="text"
                maxLength={20}
                mb="24px"
                borderRadius="15px"
                fontSize="sm"
                size="lg"
              />
              {errors.quantity && (
                <FormErrorMessage>{errors.quantity}</FormErrorMessage>
              )}
            </FormControl>

            {/* State */}
            <FormControl marginBottom={5} isInvalid={errors.condition}>
              <FormLabel>Estado del donativo</FormLabel>
              <Select
                placeholder="Selecciona el estado del donativo"
                onChange={handleChange}
                value={values.condition}
                name="condition"
                id="condition"
                mb="24px"
                borderRadius="15px"
                fontSize="sm"
                size="lg"
              >
                <option key="new" value="nuev@(s)">
                  Nuevo
                </option>
                <option key="used" value="usad@(s)">
                  Usado
                </option>
                <option key="good_conditions" value="en buenas condiciones">
                  En buen estado
                </option>
              </Select>
              {errors.condition && (
                <FormErrorMessage>{errors.condition}</FormErrorMessage>
              )}
            </FormControl>

            {/* Date of Rescue */}
            <FormControl marginBottom={5} isInvalid={errors.availability}>
              <FormLabel>Disponibilidad de entrega</FormLabel>
              <InputGroup
                mb="24px"
                borderRadius="15px"
                fontSize="sm"
                size="lg">
                <DatePicker
                  selected={
                    values.availability ? new Date(values.availability) : null
                  }
                  onChange={(date) =>
                    handleChange({
                      target: {
                        name: 'availability',
                        value: date?.toISOString(),
                      },
                    })
                  }
                  dateFormat="dd/MM/yyyy"
                />
              </InputGroup>
              {errors.availability && (
                <FormErrorMessage>{errors.availability}</FormErrorMessage>
              )}
            </FormControl>

            {/* Submit Button */}
            <Center>
              <Button
                fontSize="15px"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                color="white"
                mt="20px"
                _hover={{
                  bg: 'teal.200',
                }}
                _active={{
                  bg: 'teal.400',
                }}
                as="a"
                fontWeight={500}
                form="inKindDonations"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </Center>
          </form>
        </Stack>
    </Center>
  );
}
