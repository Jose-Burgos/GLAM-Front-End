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
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react';
import theme from '@/theme';
import Link from 'next/link';
import HelperFunctions from '~/supabase/helpers';
import validateOngRegisterForm from '@/hooks/validation/validateOngRegisterForm';
import useValidation from '@/hooks/useValidation';

export default function OngRegisterFrom() {
  const initialState = {
    name: '',
    address: '',
    email: '',
    password: '',
  };
  const toast = useToast();
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateOngRegisterForm, onSubmit);

  async function onSubmit() {
    const log = JSON.stringify(values);
    try {
      const { data, existingAccount } = await HelperFunctions.orgSignUp(
        JSON.parse(log)
      );
      if (existingAccount) {
        toast({
          title: 'Error',
          description: 'Ya existe una cuenta asociada al email ingresado.',
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
            'Registro exitoso, revise su casilla electrónica para verificar la dirección de email.',
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
        <form id="registerOngForm">
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
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl marginBottom={5} isInvalid={errors.address}>
            <FormLabel color="black">Direccion</FormLabel>
            <Input
              placeholder="Direccion"
              name="address"
              id="address"
              value={values.address}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              type="text"
              maxLength={50}
            />
            {errors.address && (
              <FormErrorMessage>{errors.address}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl marginBottom={5} isInvalid={errors.email}>
            <FormLabel color="black">E-mail</FormLabel>
            <Input
              placeholder="E-mail"
              name="email"
              id="email"
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
              id="password"
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
          <FormControl isRequired>
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
              form="registerOngForm"
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
