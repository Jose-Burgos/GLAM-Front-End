'use client';

import React from 'react';
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
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react';
import validateContactForm from '@/hooks/validation/validateContactForm';
import useValidation from '@/hooks/useValidation';
import { Separator } from './separator';
import helpers from '~/supabase/helpers';
import { AdoptionRequestForm } from '~/supabase/types/supabase.tables';

export default function ContactForm({ animalId }: { animalId: string }) {
  const initialState: AdoptionRequestForm = {
    user_email: '',
    details: '',
  };
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateContactForm, onSubmit);
  async function onSubmit() {
    // console.log('Mensaje enviado');
    helpers.requestAdoption(animalId, values);
  }

  return (
    <Stack direction={['column', 'column', 'column', 'row']} mt={10} mb={5}>
      <Box>
        <form id="email-form">
          <FormControl marginBottom={5} isInvalid={errors.user_email}>
            {/* <FormLabel>E-mail</FormLabel> */}
            <Input
              borderRadius="15px"
              placeholder="E-mail"
              id="constact_email"
              name="user_email"
              value={values.user_email}
              onChange={handleChange}
              type="text"
              maxLength={20}
            />
            {errors.user_email && (
              <FormErrorMessage>{errors.user_email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl marginBottom={5} isInvalid={errors.details}>
            <Textarea
              p={3}
              borderRadius="15px"
              placeholder="Detalle... "
              value={values.details}
              onChange={handleChange}
              size="xl"
              maxLength={400}
              name="details"
            />
            {errors.details && (
              <FormErrorMessage>{errors.details}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            as="a"
            fontSize="sm"
            fontWeight={500}
            mb={-3}
            bg="teal.300"
            href="/login"
            form="registerUserForm"
            borderRadius="15px"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </form>
      </Box>
      <Box p={6} h="auto" display={{ base: 'none', md: 'flex' }}>
        <Flex
          display={{ sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}
          h="100%"
          w="1px"
          bg="linear-gradient(0deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)"
        />
      </Box>
      <Box p={6} display={{ base: 'flex', md: 'none' }}>
        <Separator />
      </Box>
      <Center>
        <Text>
          Nos puedes contactar por wpp al numero:{' '}
          <Text fontWeight="bold">xxx-xxxxxxx</Text>
        </Text>
      </Center>
    </Stack>
  );
}
