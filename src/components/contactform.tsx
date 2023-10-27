'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import theme from '@/theme';
import validateContactForm from '@/hooks/validation/validateContactForm';
import useValidation from '@/hooks/useValidation';

export default function ContactForm() {
  const initialState = {
    email: '',
    message: '',
  };
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateContactForm, onSubmit);
  async function onSubmit() {
    console.log('Mensaje enviado');
  }

  return (
    <Stack direction={['column', 'column', 'row', 'row']} mt={10} mb={5}>
      <Box>
        <form id="email-form">
          <FormControl marginBottom={5} isInvalid={errors.email}>
            <FormLabel color="black">E-mail</FormLabel>
            <Input
              placeholder="E-mail"
              id="constact_email"
              name="email"
              value={values.email}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              type="text"
              maxLength={20}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl marginBottom={5} isInvalid={errors.message}>
            <Textarea
              borderRadius="md"
              placeholder="Detalle... "
              value={values.message}
              onChange={handleChange}
              bg="inputbg"
              shadow="inner"
              size="xl"
              maxLength={400}
            />
            {errors.message && (
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            )}
          </FormControl>
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
            Enviar
          </Button>
        </form>
      </Box>
      <Box p={6} h="auto" display={{ base: 'none', md: 'flex' }}>
        <Divider
          orientation="vertical"
          borderWidth="2px"
          borderColor="black"
          borderRadius="50px"
        />
      </Box>
      <Box p={6} display={{ base: 'flex', md: 'none' }}>
        <Divider borderWidth="2px" borderColor="black" borderRadius="50px" />
      </Box>
      <Center>
        <Text color="black">
          Nos puedes contactar por wpp al numero: xxx-xxxxxxx
        </Text>
      </Center>
    </Stack>
  );
}
