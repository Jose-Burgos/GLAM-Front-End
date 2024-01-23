'use client'

import { Button, Input, Stack, FormControl, FormLabel, Center, FormErrorMessage } from '@chakra-ui/react';
import useValidation from '@/hooks/useValidation';
import validateMonetaryDonationForm from '@/hooks/validation/validateMonetaryDonationForm';
import React, { useState, useEffect } from 'react';

export default function MonetaryDonationForm () {
    const initialState = {
        amount : 0
    };
    const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateMonetaryDonationForm, onSubmit);
    async function onSubmit(){
        // Handle submit function
        // Conectar con Merado Pago 
        // console.log('Valor enviado',values.amount);         
    }

    return (
        <Center>
            <Stack spacing={4}>
                <form id="monetaryDonations">
                    <FormControl isInvalid={errors.amount}>
                        <FormLabel>Monto a donar</FormLabel>
                        <Input 
                            type="number" 
                            name='amount'
                            placeholder="Ingrese el monto" 
                            borderRadius="15px"
                            fontSize="sm"
                            size="lg"
                            value={values.amount}
                            onChange={handleChange}
                        />
                        {errors.amount && (
                            <FormErrorMessage>{errors.amount}</FormErrorMessage>
                        )}
                        </FormControl> 
                        <Stack direction="row" spacing={2} marginTop={4}>
                        <Button 
                        size="sm" 
                        onClick={() => handleChange({ target: { name: 'amount', value : 1000 } })}
                        value={1000}
                        >
                            $1,000
                        </Button>
                        <Button 
                        size="sm" 
                        onClick={() => handleChange({ target: { name: 'amount', value : 2500 } })}
                        >
                            $2,500
                        </Button>
                        <Button 
                        size="sm" 
                        onClick={() => handleChange({ target: { name: 'amount', value : 5000 } })}
                        >
                            $5,000
                        </Button>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                        <Button
                            fontSize="15px"
                            type="submit"
                            bg="teal.300"
                            w="100%"
                            h="45"
                            color="white"
                            mt="20px"
                            _hover={{
                            bg: 'teal.200',
                            }}
                            _active={{
                            bg: 'teal.400',
                            }}
                            as="a"
                            fontWeight={500}
                            form="monetaryDonations"
                            onClick={handleSubmit}
                        >
                            Donar
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Center>
    );
};
