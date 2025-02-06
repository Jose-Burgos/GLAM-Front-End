'use client';

import React, { FormEvent, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import {
  Flex,
  Button,
  useToast,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import logInImg1 from '../../../assets/images/signInImage1.png';
import validateResetPasswordForm from '@/hooks/validation/validateResetPasswordForm';
import useValidation from '@/hooks/useValidation';

export default function RecoverPassword() {
  const initialState = { email: '' };
  const toast = useToast();
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateResetPasswordForm, onSubmit);
  async function onSubmit() {
    try {
      const data = await HelperFunctions.sendForgotPassEmail(values.email);
      toast({
        title: 'Verifique su casilla de emails',
        description: '',
        status: 'success',
        duration: 4000,
        isClosable: true,
        variant: 'left-accent',
        position: 'top-left',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Intente nuevamente mas tarde.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'left-accent',
        position: 'top-left',
      });
    }
  }

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
              Recuperar contraseña
            </Heading>
            <form id="reset-password">
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                Ingrese email para recuperar su contraseña
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
                  id="reset_email"
                  borderRadius="15px"
                  name="email"
                  mb="24px"
                  fontSize="sm"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  value={values.email}
                  onChange={handleChange}
                  size="lg"
                />
                {errors.email && (
                  <FormErrorMessage mt="-15px" mb="10px" ml="10px">
                    {errors.email}
                  </FormErrorMessage>
                )}

                <Button
                  fontSize="15px"
                  type="submit"
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
                  form="reset-password"
                  onClick={handleSubmit}
                >
                  Reestablecer
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            />
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
