'use client';

import React, { FormEvent, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import {
  Button,
  useToast,
  Box,
  Center,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import theme from '@/theme';

export default function newUser() {
  const [email, setEmail] = useState('Test@Email.com');
  const toast = useToast();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const data = await HelperFunctions.sendForgotPassEmail(JSON.parse(email));
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

  return (
    <Center style={{ height: '79vh', overflowY: 'hidden' }} mt="5%" mb="5%">
      <Box
        bg="bgcard"
        boxShadow="2xl"
        borderRadius="3xl"
        p={10}
        w={['80%', '80%', '60%', '40%']}
      >
        <VStack>
          <Text align="center" color="black" fontSize="3xl" p={3}>
            Ingrese a su cuenta
          </Text>
          <form id="reset-password" onSubmit={onSubmit}>
            <FormControl marginBottom={5}>
              <FormLabel htmlFor="email" color="black">
                E-mail
              </FormLabel>
              <Input
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                bg="inputbg"
                shadow="inner"
                type="email"
              />
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
                form="reset-password"
                onClick={onSubmit}
              >
                Reestablecer
              </Button>
            </Center>
          </form>
        </VStack>
      </Box>
    </Center>
  );
}
