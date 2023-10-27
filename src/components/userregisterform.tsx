'use client';

import React, { FormEvent, use, useState } from 'react';
import {
  Button,
  useToast,
  Center,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  HStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import theme from '@/theme';
import Link from 'next/link';
import HelperFunctions from '~/supabase/helpers';
import validateUserRegisterForm from '@/hooks/validation/validateUserRegisterForm';
import useValidation from '@/hooks/useValidation';

export default function UserRegisterFrom() {
  // const [user_name, setName] = useState('TestName');
  // const [lastName, setSurname] = useState('TestSurname');
  // const [user, setUser] = useState('TestUsername');
  // const [identification, setDni] = useState(12345678);
  // const [user_email, setEmail] = useState('Test@Email.com');
  // const [user_password, setPassword] = useState('TestPass');
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
    <Center>
      <Stack>
        <form id="registerUserForm" onSubmit={onSubmit}>
          <FormControl marginBottom={5} isInvalid={errors.firstName}>
            <FormLabel color="black">Nombre</FormLabel>
            <Input
              placeholder="Nombre"
              name="firstName"
              id="firstName"
              value={values.firstName}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              type="text"
              maxLength={20}
            />
            {errors.firstName && (
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl marginBottom={5} isInvalid={errors.lastName}>
            <FormLabel color="black">Apellido</FormLabel>
            <Input
              placeholder="Apellido"
              name="lastName"
              id="lastName"
              value={values.lastName}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              type="text"
              maxLength={20}
            />
            {errors.lastName && (
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl marginBottom={5} isInvalid={errors.username}>
            <FormLabel color="black">Usuario</FormLabel>
            <Input
              placeholder="Nombre de Usuario"
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              type="text"
              maxLength={12}
            />
            {errors.username && (
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl marginBottom={5} isInvalid={errors.identification}>
            <FormLabel color="black">DNI</FormLabel>
            <Input
              placeholder="DNI"
              name="identification"
              id="identification"
              value={values.identification}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              type="number"
              minLength={8}
              maxLength={8}
            />
            {errors.identification && (
              <FormErrorMessage>{errors.identification}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl marginBottom={5} isInvalid={errors.email}>
            <FormLabel color="black">E-mail</FormLabel>
            <Input
              placeholder="E-mail"
              name="email"
              id="user_email"
              value={values.email}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              type="email"
            />
            {errors.email && (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel color="black">Contraseña</FormLabel>
            <Input
              placeholder="Contraseña"
              name="password"
              id="user_password"
              value={values.password}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              type="password"
            />
            {errors.password && (
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <HStack mt={2}>
              <Checkbox
                bg="inputbg"
                color="black"
                borderColor="rgba(0,0,0,0.2)"
              />
              <FormLabel mt={2} color="black">
                Acepto los terminos y condicones.
              </FormLabel>
            </HStack>
          </FormControl>

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
              href="/login"
              _hover={{
                textColor: 'gray',
                borderColor: theme.colors.accent,
              }}
              form="registerUserForm"
              onClick={handleSubmit}
            >
              Crear Cuenta
            </Button>
          </Center>
        </form>
        <Stack
          mt={10}
          mb={-10}
          w="inherit"
          align="start"
          direction={['column', 'column', 'row', 'row']}
        >
          <Link href="/login">
            <Text color="black">Ya tengo cuenta</Text>
          </Link>
        </Stack>
      </Stack>
    </Center>
  );
}
