'use client';

import React, { use, useState } from 'react';
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
} from '@chakra-ui/react';
import theme from '@/theme';
import Link from 'next/link';
import HelperFunctions from '~/supabase/helpers';

export default function OngRegisterFrom() {
  const [name, setName] = useState('Test Org Name');
  const [address, setAdress] = useState('calle pepito');
  const [email, setEmail] = useState('Test@Email.com');
  const [password, setPassword] = useState('TestPass');
  const toast = useToast();

  async function onSubmit() {
    const aux = { email, password, name, address };
    const log = JSON.stringify(aux);

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
        status: 'success',
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
          <FormControl marginBottom={5}>
            <FormLabel htmlFor="text" color="black">
              Nombre
            </FormLabel>
            <Input
              id="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              bg="inputbg"
              shadow="inner"
              type="text"
              maxLength={20}
            />
          </FormControl>

          <FormControl marginBottom={5}>
            <FormLabel htmlFor="text" color="black">
              Direccion
            </FormLabel>
            <Input
              id="text"
              placeholder="Direccion"
              value={address}
              onChange={(e) => {
                setAdress(e.target.value);
              }}
              bg="inputbg"
              shadow="inner"
              type="text"
              maxLength={50}
            />
          </FormControl>
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
          <FormControl>
            <FormLabel htmlFor="password" color="black">
              Contraseña
            </FormLabel>
            <Input
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              bg="inputbg"
              shadow="inner"
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" color="black">
              Repetir Contraseña:
            </FormLabel>
            <Input
              id="password"
              placeholder="Repetir Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              bg="inputbg"
              shadow="inner"
              type="password"
            />
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
              onClick={onSubmit}
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
