'use client'

import { Button, Input, Stack, FormControl, FormLabel, Center, FormErrorMessage } from '@chakra-ui/react';
import useValidation from '@/hooks/useValidation';
import validateMonetaryDonationForm from '@/hooks/validation/validateMonetaryDonationForm';
import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'
// import { error } from 'console';
export default function MonetaryDonationForm () {
    useEffect(() => {
        initMercadoPago('TEST-f4ff05f0-9e8d-4fc3-a0e7-64bb29313733', {
            locale: 'es-MX',
        });
    }, []); // El segundo argumento es una lista de dependencias vacía para que se ejecute solo una vez.
    
    const initialState = {
        amount : 0
    };
    const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(initialState, validateMonetaryDonationForm, onSubmit);
    const [preferenceId, setPreferenceId] = useState(null)
    const createPreference = async () => {
        try{
            const response = await axios.post("http://localhost:3001/payment",{
                title : 'Donación',
                quantity : 1,
                price : values.amount,
            })
            const {id} = response.data
            return id
        }
        catch{
            console.log(errors)
        }
    }      
    async function onSubmit(){
        // Handle submit function
        // Conectar con Merado Pago 
        // console.log('Valor enviado',values.amount);   
        const id  = await createPreference()
        if (id) {
            setPreferenceId(id)
        }
    }
    
    return (
        <Center>
            <Stack spacing={4}>
                <form id="monetaryDonations" onSubmit={handleSubmit}>
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
                        onClick={() => handleChange({ target: { name: 'amount', value : 100 } })}
                        >
                            $100
                        </Button>
                        <Button 
                        size="sm" 
                        onClick={() => handleChange({ target: { name: 'amount', value : 250 } })}
                        >
                            $250
                        </Button>
                        <Button 
                        size="sm" 
                        onClick={() => handleChange({ target: { name: 'amount', value : 500 } })}
                        >
                            $500
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
                            // as="a"
                            fontWeight={500}
                            form="monetaryDonations"
                            // onClic   k={handleSubmit}
                        >
                            Donar
                        </Button>
                        {preferenceId &&
                            <Wallet initialization={{ preferenceId: preferenceId, redirectMode: 'blank'}}                            />
                        }
                    </Stack>
                </form>
            </Stack>
        </Center>
    );
};
