import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Stack,
  Text,
  Center,
} from '@chakra-ui/react';

import helpers from '~/supabase/helpers';
import HelperFunctions from '~/supabase/helpers';  // Ensure you have the right import path

interface ContactFormProps {
  animalId: string; // Accept animalId as a prop
}

export default function ContactForm({ animalId }: ContactFormProps) {
  // State to hold form values
  const [values, setValues] = useState({ email: '', message: '' });
  // State to hold error messages
  const [errors, setErrors] = useState({ email: '', message: '' });
  // State to handle the form submission status
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  // Validation function
  const validate = () => {
    let tempErrors = { email: '', message: '' };
    let isValid = true;

    // Validate message
    if (!values.message) {
      tempErrors.message = 'Debe escribir algún mensaje';
      isValid = false;
    }

    setErrors(tempErrors); // Update error state
    return isValid; // Return validation result
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value }); // Update the state with the new value
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validate()) {
      setSubmitStatus('Submitting...');

      try {
        // Use the animalId passed down via props
        const description = values.message; // Message as description

        // Call the helper function to create the adoption request
        const response = await HelperFunctions.createAdoptionRequest(animalId, description);

        // Show success message
        setSubmitStatus(response.message);
        setValues({ email: '', message: '' }); // Reset form
      } catch (error) {
        // Handle errors
        setSubmitStatus(`Error: ${error}`);
      }
    }
  };

  return (
    <Stack spacing={4} width={['100%', '50%', '40%']} margin="auto" mt={10}>
      <Box>
        <form onSubmit={handleSubmit}>
          {/* Message Field */}
          <FormControl isInvalid={!!errors.message}>
            <FormLabel>Mensaje</FormLabel>
            <Textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje"
            />
            <FormErrorMessage>{errors.message}</FormErrorMessage>
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="teal" mt={4}>
            Enviar
          </Button>
        </form>

        {/* Submit Status */}
        {submitStatus && (
          <Text mt={4} color={submitStatus.startsWith('Error') ? 'red.500' : 'green.500'}>
            {submitStatus}
          </Text>
        )}
      </Box>

      {/* Contact information */}
      <Center>
        <Text>
          Puedes contactarnos por WhatsApp al número:{' '}
          <Text fontWeight="bold">xxx-xxxxxxx</Text>
        </Text>
      </Center>
    </Stack>
  );
}
