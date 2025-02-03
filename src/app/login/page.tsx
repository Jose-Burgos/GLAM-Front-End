'use client';

import React, { useEffect, useRef, useContext } from 'react';
import supabase from '~/supabase/helpers';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  Flex,
  Button,
  useToast,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  FormErrorMessage,
  useColorModeValue,
  Heading,
  Switch,
  VStack,
  Spacer,
} from '@chakra-ui/react';
import validateLoginForm from '@/hooks/validation/validateLoginForm';
import useValidation from '@/hooks/useValidation';
import logInImg1 from '@/assets/images/signInImage1.png';
import AuthContext from '@/hooks/authContext';
import helpers from '~/supabase/helpers';

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { logIn } = useContext(AuthContext);
  const useEffectExecuted = useRef(false);
  const initialState = {
    email: '',
    password: '',
  };
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateLoginForm, onSubmit);

  const checkSessionAndRedirect = async () => {
    try {
      const session = await supabase.getSession();
      if (session) {
        logIn();
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
      const { session, user, error } = await helpers.supabase.auth.signInWithPassword({
        email: JSON.parse(log).email,
        password: JSON.parse(log).password,
      });
      
      if (error) {
        console.log('Login failed:', error.message);
        return;
      }
      
      // After login, ensure the session is available
      await helpers.supabase.auth.getSession(); // Re-fetch the session to confirm it's updated
      const { data: sessionData, error: sessionError } = await helpers.supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error fetching session:', sessionError.message);
      } else {
        console.log('Session data:', sessionData);
      }
      
      if (sessionData?.session) {
        // Session exists and is valid, proceed with the redirection
        console.log("Session data exists and is valid");
  
        // Access the user directly from sessionData
        const user = sessionData.session.user;  // Get the user from sessionData
        console.log("User object from session:", user);  // Log the user object
  
        const profile_type = user?.user_metadata?.profile_type;
        console.log("Profile Type:", profile_type);  // Log profile type to check
  
        if (user) {
          const userId = user.user_metadata.user_id;  // Check if you have user_id in user_metadata
          if (profile_type === 'RegularUser') {
            console.log("You are User");
            toast({
              title: 'Usted es un Usuario.',
              description: '',
              status: 'success',
              duration: 4000,
              isClosable: true,
              variant: 'left-accent',
              position: 'top-left',
            });
            try {
              router.push('/user/auth/home');
            } catch (error) {
              console.error("Redirection failed:", error);
              toast({
                title: 'Redirection Error',
                description: 'There was an issue redirecting after login.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                variant: 'left-accent',
                position: 'top-left',
              });
            }
          } else if (profile_type === 'Organization') {
            console.log("You are ONG");
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
          } else {
            console.log("Unknown user type?!");
          }
        }
      } else {
        toast({
          title: 'Error',
          description: 'No session found after login',
          status: 'error',
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
  
  

  useEffect(() => {
    if (!useEffectExecuted.current) {
      checkSessionAndRedirect();
      useEffectExecuted.current = true;
    }
  }, [toast, router, useEffectExecuted]);

  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.400', 'white');

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: 'initial', md: '75vh', lg: '85vh' }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: '100px', md: '0px' }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: 'none' }}
          w={{ base: '100%', md: '50%', lg: '42%' }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: '150px', lg: '80px' }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Bienvenido
            </Heading>
            <form id="login-form">
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                Ingrese email y contraseña para ingresar
              </Text>
              <FormControl isInvalid={errors.email || errors.password}>
                <FormLabel
                  htmlFor="email"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                >
                  E-mail
                </FormLabel>
                <Input
                  name="email"
                  id="login_email"
                  type="email"
                  placeholder="ejemplo@gmai.com"
                  onChange={handleChange}
                  value={values.email}
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
                <FormLabel
                  htmlFor="password"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                >
                  Contraseña
                </FormLabel>
                <Input
                  name="password"
                  id="login_password"
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="password"
                  placeholder="contraseña"
                  value={values.password}
                  onChange={handleChange}
                  size="lg"
                />
                {errors.password && (
                  <FormErrorMessage mt="-15px" mb="10px" ml="10px">
                    {errors.password}
                  </FormErrorMessage>
                )}
                <FormControl display="flex" alignItems="center">
                  <Switch id="remember-login" colorScheme="teal" me="10px" />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    ms="1"
                    fontWeight="normal"
                  >
                    Recuerdame
                  </FormLabel>
                </FormControl>
                <Button
                  fontSize="15px"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: 'teal.200',
                  }}
                  _active={{
                    bg: 'teal.400',
                  }}
                  form="login-form"
                  onClick={handleSubmit}
                >
                  Ingresar
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <VStack>
                <Text color={textColor} fontWeight="medium">
                  Todavia no tenes cuenta?
                  <Link
                    href="/register"
                    color={titleColor}
                    as="span"
                    ms="5px"
                    fontWeight="bold"
                  >
                    <NextLink href="/register">Crear cuenta</NextLink>
                  </Link>
                </Text>
                <Spacer />
                <Text color={textColor} ml={-5} fontWeight="medium">
                  Olvidaste tu contraseña?
                  <Link
                    href="/login/password-reset"
                    color={titleColor}
                    as="span"
                    ms="5px"
                    fontWeight="bold"
                  >
                    <NextLink href="/login/password-reset">Recuperar</NextLink>
                  </Link>
                </Text>
              </VStack>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: 'none', md: 'block' }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={`url(${logInImg1.src})`}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          />
        </Box>
      </Flex>
    </Flex>
  );
}
