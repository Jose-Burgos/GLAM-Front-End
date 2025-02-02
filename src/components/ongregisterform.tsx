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
  Switch,
} from '@chakra-ui/react';
import theme from '@/theme';
import Link from 'next/link';
import HelperFunctions from '~/supabase/helpers';
import validateOngRegisterForm from '@/hooks/validation/validateOngRegisterForm';
import useValidation from '@/hooks/useValidation';
import { Router } from 'react-router-dom';

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

  // TODO: Add inpout for code area
  // TODO: Add inputs for donation data

  return (
    <Stack>
      <form id="registerOngForm">
        <FormControl marginBottom={5} isInvalid={errors.name}>
          <FormLabel>Nombre</FormLabel>
          <Input
            placeholder="Nombre"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            maxLength={20}
            mb="24px"
            borderRadius="15px"
            fontSize="sm"
            size="lg"
          />
          {errors.name && (
            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
              {errors.name}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginBottom={5} isInvalid={errors.address}>
          <FormLabel>Direccion</FormLabel>
          <Input
            placeholder="Direccion"
            name="address"
            id="address"
            value={values.address}
            onChange={handleChange}
            type="text"
            maxLength={50}
            mb="24px"
            borderRadius="15px"
            fontSize="sm"
            size="lg"
          />
          {errors.address && (
            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
              {errors.address}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginBottom={5} isInvalid={errors.email}>
          <FormLabel>E-mail</FormLabel>
          <Input
            placeholder="E-mail"
            name="email"
            id="email"
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
            id="password"
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
            id="remember-login-ong-register"
            colorScheme="teal"
            me="10px"
          />
          <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal">
            Recuerdame
          </FormLabel>
        </FormControl>

        <Button
          as="a"
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
          form="registerOngForm"
          onClick={handleSubmit}
        >
          Crear Cuenta
        </Button>
      </form>
    </Stack>
  );
}
