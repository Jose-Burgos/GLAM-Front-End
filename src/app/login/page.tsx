'use client';

import React, { FormEvent, useEffect, useState, useRef } from 'react';
import supabase from '~/supabase/helpers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import theme from '@/theme';
import Image from 'next/image';
import {
  Button,
  useToast,
  Box,
  Center,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  HStack,
  FormErrorMessage
} from '@chakra-ui/react';
import validateLoginForm from '@/hooks/validation/validateLoginForm';
import useValidation from '@/hooks/useValidation';

export default function NewUser() {
  const router = useRouter();
  const toast = useToast();
  const useEffectExecuted = useRef(false);
  const initialState = {
    email : '',
    password : ''
  } 
  const {values,errors,submitForm,handleSubmit,handleChange} = useValidation(initialState,validateLoginForm,onSubmit);

  const checkSessionAndRedirect = async () => {
    try {
      const session = await supabase.getSession();
      if (session) {
        toast({
          title: 'Atencion',
          description: 'Ya ingreso a la cuenta',
          status: 'warning',
          duration: 4000,
          isClosable: true,
          variant: 'left-accent',
          position: 'top-left',
        });
        if (session.user.user_metadata.profile_type === 'Organizacion') {
          router.push('/ong/auth/home');
        } else {
          router.push('/user/auth/home');
        }
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudo crear la cuenta, intente más tarde.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'left-accent',
        position: 'top-left',
      });
    }
  };

  async function onSubmit() {
    const log = JSON.stringify(values);
    try {
      const { session, type } = await supabase.login(JSON.parse(log));
      if (type === 'RegularUser') {
        toast({
          title: 'Usted es un Usuario.',
          description: '',
          status: 'success',
          duration: 4000,
          isClosable: true,
          variant: 'left-accent',
          position: 'top-left',
        });
        router.push('/user/home');
      } else if (type === 'Organization') {
        toast({
          title: 'Usted es una ONG.',
          description: '',
          status: 'success',
          duration: 4000,
          isClosable: true,
          variant: 'left-accent',
          position: 'top-left',
        });
        router.push('/ong/auth/home');
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
  };

  useEffect(() => {
    if (!useEffectExecuted.current) {
      checkSessionAndRedirect();
      useEffectExecuted.current = true;
    }
  }, [toast, router, useEffectExecuted]);

  return (
    <Center style={{ height: '100vh' }}>
      <Box bg="bgcard" boxShadow="2xl" borderRadius="3xl" mt="10%" mb="10%">
        <Stack direction={['column', 'column', 'row', 'row']}>
          <Box
            boxShadow="2xl"
            shadow="inner"
            w={250}
            h="auto"
            borderRadius="3xl"
            style={{ position: 'relative' }}
            display={{ base: 'none', md: 'block' }}
          >
            <Image
              style={{ borderRadius: '1.5rem' }}
              alt="cat img"
              src="/assets/em.jpeg"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              priority
            />
          </Box>
          <form id="login-form">
            <Text align="center" color="black" fontSize="3xl" mt={10} mb={-5}>
              Iniciá sesión
            </Text>
            <Box padding={10} borderRadius="3xl">
              <FormControl marginBottom={5} isInvalid={errors.email}>
                <FormLabel htmlFor="email" color="black">
                  E-mail
                </FormLabel>
                <Input
                  placeholder="E-mail"
                  id="login_email"
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  bg="inputbg"
                  shadow="inner"
                  type="email"
                />
                {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password" color="black">
                  Contraseña
                </FormLabel>
                <Input
                  placeholder="Contraseña"
                  id="login_password"
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  bg="inputbg"
                  shadow="inner"
                  type="password"
                />
                {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <HStack mt={2}>
                  <Checkbox
                    bg="inputbg"
                    color="black"
                    borderColor="rgba(0,0,0,0.2)"
                  />
                  <FormLabel mt={2} color="black">
                    Recordar
                  </FormLabel>
                </HStack>
              </FormControl>
              <Center>
                <Button
                  as="a"
                  fontSize="sm"
                  fontWeight={500}
                  w={200}
                  mt={2}
                  color="black"
                  bg={theme.colors.accent}
                  href="/login"
                  _hover={{
                    textColor: 'gray',
                    borderColor: theme.colors.accent,
                  }}
                  form="login-form"
                  onClick={handleSubmit}
                >
                  Iniciá sesión
                </Button>
              </Center>
              <Stack mt={2} direction={['column', 'column', 'row', 'row']}>
                <Link href="/register">
                  <Text color="black">Todavia no tenes cuenta?</Text>
                </Link>
                <Link href="/login/password-reset">
                  <Text color="black">No recuerdo mi contraseña</Text>
                </Link>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Box>
    </Center>
  );
}
