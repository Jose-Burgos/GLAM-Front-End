'use client';

import React, { useEffect, useState } from 'react';
import supabase from '~/supabase/helpers';
import { Box, Button, CSSReset, Center, ChakraProvider, Flex, FormControl, FormErrorMessage, FormLabel, Grid, HStack, Heading, Input, Radio, RadioGroup, Stack, VStack, useColorMode, useToast } from '@chakra-ui/react';
import validateOngSettingsForm from '@/hooks/validation/validateOngSettingsForm';
import useValidation from '@/hooks/useValidation';
import { OngInfo } from '~/supabase/types/supabase.tables';

export default function OngInformation(props: {ong ?: OngInfo}) {
    const [formData, setFormData] = useState(props.ong as OngInfo)
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast();
    const { values, errors, submitForm, handleSubmit, handleChange } = useValidation(formData, validateOngSettingsForm, onSubmit);
    async function onSubmit() {
        const toastId = toast({
        title: 'Actualizando Informacion',
        description: 'Por favor espere',
        status: 'info',
        duration: 1000,
        isClosable: false,
        position: 'top-left',
        });
        try {
            
        await supabase.updateOrganization(values);
 
        // Display success toast based on the operation type
        toast({
            title: 'Operación exitosa',
            description:'Información actualizada',
            status: 'success',
            duration: 5000,
            position: 'top-left',
        });
        window.location.href = '/ong/auth/home';
        } catch (error) {
        toast({
            title: 'Operación Fallida',
            description: 'Algo salió mal',
            status: 'error',
            duration: 5000,
            position: 'top-left',
        });
        } finally {
            toast.close(toastId);
        }
    }

    return (
        <Flex
        direction="column"
        w="100%"
        h="100%"
        mt={120}
        >
            <Box w='100%' h='100%'>
                <ChakraProvider>
                    <CSSReset />
                        <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                        background="gray.100"
                        bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
                        >
                        <VStack spacing={5} mt={120}>
                            <Heading mb={2}>
                                Tus Datos
                            </Heading>
                            <Box
                            width="md"
                            p={8}
                            boxShadow="md"
                            borderRadius="md"
                            bg={colorMode === 'light' ? 'white' : 'gray.600'}
                            >
                            <form id="updateOngInfo">
                                {/* Name input */}
                                <FormControl 
                                marginBottom={5} 
                                isInvalid={errors.name}
                                >
                                    <FormLabel>Nombre</FormLabel>
                                    <Input
                                        placeholder="Nombre"
                                        name="name"
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        shadow="inner"
                                        type="text"
                                        maxLength={20}
                                    />
                                    {errors.name && (
                                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                                    )}
                                </FormControl>
                                {/* User ID */}
                                <FormControl 
                                marginBottom={5} 
                                // isInvalid={errors.mp_user_id}
                                >
                                <FormLabel>User ID de Mercado Pago</FormLabel>
                                <Input
                                    placeholder="UID"
                                    name="mp_user_id"
                                    id="mp_user_id"
                                    value={values.mp_user_id || ''}
                                    onChange={handleChange}
                                    shadow="inner"
                                    type={'password'}
                                    maxLength={20}
                                />
                                {/* {errors.mp_user_id && (
                                    <FormErrorMessage>{errors.mp_user_id}</FormErrorMessage>
                                )} */}
                                </FormControl>
                                {/* Access Token */}
                                <FormControl 
                                marginBottom={5} 
                                // isInvalid={errors.mp_access_token}
                                >
                                <FormLabel>Access Token de Mercado Pago</FormLabel>
                                <Input
                                    placeholder="Token"
                                    name="mp_access_token"
                                    id="mp_access_token"
                                    value={values.mp_access_token || ''}
                                    onChange={handleChange}
                                    shadow="inner"
                                    type={'password'}
                                    maxLength={20}
                                />
                                {/* {errors.mp_access_token && (
                                    <FormErrorMessage>{errors.mp_access_token}</FormErrorMessage>
                                )} */}
                                </FormControl>
                                {/* Public Key */}
                                <FormControl 
                                marginBottom={5} 
                                // isInvalid={errors.mp_public_key}
                                >
                                <FormLabel>Public Key de Mercado Pago</FormLabel>
                                <Input
                                    placeholder="Key"
                                    name="mp_public_key"
                                    id="mp_public_key"
                                    value={values.mp_public_key || ''}
                                    onChange={handleChange}
                                    shadow="inner"
                                    type={'password'}
                                    maxLength={20}
                                />
                                {/* {errors.mp_public_key && (
                                    <FormErrorMessage>{errors.mp_public_key}</FormErrorMessage>
                                )} */}
                                </FormControl>
                                
                            {/* Submit Button */}
                            <Center>
                            <Button
                                mt={8}
                                colorScheme="teal"
                                type="submit"
                                form="updateOngInfo"
                                onClick={handleSubmit}
                            >
                                Actualizar
                            </Button>
                            </Center>
                        </form>
                        </Box>
                        </VStack>
                    </Box>
                    </ChakraProvider>
            </Box>
        </Flex>
    );
}
