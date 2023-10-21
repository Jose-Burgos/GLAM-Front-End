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
} from '@chakra-ui/react';
import theme from '@/theme';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <Stack direction={['column', 'column', 'row', 'row']} mt={10} mb={5}>
      <Box>
        <form id="email-form">
          <FormControl marginBottom={5}>
            <FormLabel color="black">E-mail</FormLabel>
            <Input
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              bg="inputbg"
              shadow="inner"
              type="text"
              maxLength={20}
            />
          </FormControl>
          <FormControl marginBottom={5}>
            <Textarea
              borderRadius="md"
              placeholder="Detalle... "
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              bg="inputbg"
              shadow="inner"
              size="xl"
              maxLength={400}
            />
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
          >
            Enivar
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
