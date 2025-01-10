'use client';

import React from 'react';
import {
  Button,
  useToast,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Switch,
} from '@chakra-ui/react';
import HelperFunctions from '~/supabase/helpers';
import validateUserRegisterForm from '@/hooks/validation/validateUserRegisterForm';
import useValidation from '@/hooks/useValidation';

export default function UserRegisterFrom() {
  const toast = useToast();
  const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    identification: '',
    email: '',
    password: '',
  };
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateUserRegisterForm, onSubmit);

  async function onSubmit() {
    const log = JSON.stringify(values);
    try {
      const { data, existingAccount } = await HelperFunctions.userSignUp(
        JSON.parse(log)
      );
      console.log("Creating the user");
      if (existingAccount) {
        toast({
          title: 'Error',
          description: 'Ya existe una cuenta asociada al user_email ingresado.',
          status: 'success',
          duration: 4000,
          isClosable: true,
          variant: 'left-accent',
          position: 'top-left',
        });
      } else {
        toast({
          title: 'Exito',
          description:
            'Registro exitoso, revise su casilla electrónica para verificar la dirección de user_email.',
          status: 'success',
          duration: 4000,
          isClosable: true,
          variant: 'left-accent',
          position: 'top-left',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: `${err}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'left-accent',
        position: 'top-left',
      });
    }
  }

  return (
    <Stack>
      <form id="registerUserForm" onSubmit={onSubmit}>
        <FormControl marginBottom={5} isInvalid={errors.firstName}>
          <FormLabel>Nombre</FormLabel>
          <Input
            placeholder="Nombre"
            name="firstName"
            id="firstName"
            value={values.firstName}
            onChange={handleChange}
            maxLength={20}
            type="text"
            mb="24px"
            borderRadius="15px"
            fontSize="sm"
            size="lg"
          />
          {errors.firstName && (
            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
              {errors.firstName}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginBottom={5} isInvalid={errors.lastName}>
          <FormLabel>Apellido</FormLabel>
          <Input
            placeholder="Apellido"
            name="lastName"
            id="lastName"
            value={values.lastName}
            onChange={handleChange}
            type="text"
            maxLength={20}
            mb="24px"
            borderRadius="15px"
            fontSize="sm"
            size="lg"
          />
          {errors.lastName && (
            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
              {errors.lastName}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginBottom={5} isInvalid={errors.username}>
          <FormLabel htmlFor="name">Usuario</FormLabel>
          <Input
            placeholder="Nombre de Usuario"
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange}
            type="text"
            maxLength={12}
            mb="24px"
            borderRadius="15px"
            fontSize="sm"
            size="lg"
          />
          {errors.username && (
            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
              {errors.username}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginBottom={5} isInvalid={errors.identification}>
          <FormLabel>DNI</FormLabel>
          <Input
            placeholder="DNI"
            name="identification"
            id="identification"
            value={values.identification}
            onChange={handleChange}
            type="number"
            minLength={8}
            maxLength={8}
            mb="24px"
            borderRadius="15px"
            fontSize="sm"
            size="lg"
          />
          {errors.identification && (
            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
              {errors.identification}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginBottom={5} isInvalid={errors.email}>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input
            placeholder="E-mail"
            name="email"
            id="user_email"
            value={values.email}
            onChange={handleChange}
            type="email"
            mb="24px"
            borderRadius="15px"
            fontSize="sm"
            size="lg"
          />
          {errors.email && (
            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
              {errors.email}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            placeholder="Contraseña"
            name="password"
            id="user_password"
            value={values.password}
            onChange={handleChange}
            type="password"
            mb="24px"
            borderRadius="15px"
            fontSize="sm"
            size="lg"
          />
          {errors.password && (
            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
              {errors.password}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <Switch
            id="remember-login-register-user"
            colorScheme="teal"
            me="10px"
          />
          <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal">
            Recuerdame
          </FormLabel>
        </FormControl>

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
          form="registerUserForm"
          onClick={handleSubmit}
        >
          Crear Cuenta
        </Button>
      </form>
    </Stack>
  );
}
