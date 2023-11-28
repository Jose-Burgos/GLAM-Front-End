'use client'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import {
InputGroup,
Button,
useToast,
Center,
Stack,
FormControl,
FormLabel,
Input,
FormErrorMessage,
Select,
Textarea,
} from '@chakra-ui/react';
import theme from '@/theme';
import supabase from '~/supabase/helpers';
import validateInKindDonationForm from '@/hooks/validation/validateInKindDonationForm';
import useValidation from '@/hooks/useValidation';
import { Org , InKindDonation, ProfileType } from '~/supabase/types/supabase.tables';
// Define the AnimalForm component
function inKindDonations() {
    // State variables
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('')
    const [ONGs, setONGs] = useState({} as Org[]);

    const initialState = { 
        type : '',
        ong : '',
        description : '',
        quantity : 0,
        condition : '',
        availability : new Date(),
    }
    const { values, errors, submitForm, handleSubmit, handleChange } = useValidation(
        initialState, 
        validateInKindDonationForm,
        onSubmit
    );


    // Fetch organization ID and species data on component mount
    useEffect(() => {
        (async () => {
        const ongs = await supabase.getOrganizations();
        const loggedUser = await supabase.getCurrentUser();
        setONGs(ongs);
        setUserType(loggedUser.type)
        setUserId(loggedUser.profile.public.id);
        // console.log(loggedUser)
        })();
    }, []);



    // Toast hook for displaying notifications
    const toast = useToast();

    // Function to handle form submission
    async function onSubmit() {
        // Display a loading toast
        const toastId = toast({
        title: 'Agregando Informacion',
        description: 'Por favor espere',
        status: 'info',
        duration: 1000,
        isClosable: false,
        position: 'top-left',
        });

        try {
        // Perform asynchronous operation (replace with your logic)
        values.user = userId as string;
        await supabase.submitInKindDonation(values as InKindDonation);
            // console.log('done')
        // Display success toast based on the operation type
        toast({
            title: 'Operación exitosa',
            description:'Formulario enviado, se notificara sobre su donativo a la ONG',
            status: 'success',
            duration: 5000,
            position: 'top-left',
        });

        // Redirect to the desired page
        window.location.href = '/ong/auth/home';
        } catch (error) {
        // Display error toast if the operation fails
        toast({
            title: 'Operación Fallida',
            description: 'Algo salió mal',
            status: 'error',
            duration: 5000,
            position: 'top-left',
        });

        // Perform additional actions after the operation fails
        console.error('Error:', error);
        } finally {
        // Close the loading toast
        toast.close(toastId);
        }
    }

    // Render the form
    return (
        <Center>
        {userType === 'RegularUser' && (
            <Stack>
            <form id='inKindDonations'>

                {/* Species selection */}
                <FormControl marginBottom={5} isInvalid={errors.ong}>
                <FormLabel color="black">ONG</FormLabel>
                <Select
                    placeholder='Selecciona la ONG a la que desea donar'
                    onChange={handleChange}
                    value={values.ong}
                    name='ong'
                    id='ong'
                >
                    {ONGs?.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                    ))}
                </Select>
                {errors.ong && <FormErrorMessage>{errors.ong}</FormErrorMessage>}
                </FormControl>

                {/* Donations Type */}
                <FormControl marginBottom={5} isInvalid={errors.type}>
                <FormLabel color="black">Tipo de donativo</FormLabel>
                <Select
                    placeholder='Selecciona el tipo de donativo'
                    onChange={handleChange}
                    value={values.type}
                    name='type'
                    id='type'
                >
                    <option key="food" value="food">Alimentos</option>
                    <option key="medic" value="medic">Suministros Medicos</option>
                    <option key="cleaning" value="cleaning">Articulos de Limpieza</option>
                    <option key="home" value="home">Suministros para el Refugio</option>
                
                </Select>
                {errors.type && <FormErrorMessage>{errors.type}</FormErrorMessage>}
                </FormControl>

                {/* Item description */}
                <FormControl marginBottom={5} isInvalid={errors.description}>
                <FormLabel color="black">Descripción:</FormLabel>
                    <Textarea
                        value={values.description}
                        onChange={handleChange}
                        name='description'
                        placeholder='Descripción de el/los articulo(s) a donar'
                        size='sm'
                    />
                {errors.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
                </FormControl>

                {/* Quantity */}
                <FormControl marginBottom={5} isInvalid={errors.quantity}>
                    <FormLabel color="black">Cantidad</FormLabel>
                    <Input
                        placeholder="Unidades"
                        name="quantity"
                        id="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        bg="inputbg"
                        shadow="inner"
                        type="text"
                        maxLength={20}
                    />
                    {errors.quantity && (
                        <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                    )}
                </FormControl>

                {/* State */}
                <FormControl marginBottom={5} isInvalid={errors.condition}>
                <FormLabel color="black">Estado del donativo</FormLabel>
                <Select
                    placeholder='Selecciona el estado del donativo'
                    onChange={handleChange}
                    value={values.condition}
                    name='condition'
                    id='condition'
                >
                    <option key="new" value="new">Nuevo</option>
                    <option key="used" value="used">Usado</option>
                    <option key="good_conditions" value="good_conditions">En buen estado</option>                
                </Select>
                {errors.condition && <FormErrorMessage>{errors.condition}</FormErrorMessage>}
                </FormControl>
                
                {/* Date of Rescue */}
                <FormControl marginBottom={5} isInvalid={errors.availability}>
                <FormLabel color="black">Disponibilidad de entrega</FormLabel>
                <InputGroup>
                    <DatePicker
                    selected={values.availability ? new Date(values.availability) : null}
                    onChange={(date) =>
                        handleChange({ target: { name: 'availability', value: date?.toISOString() } })
                    }
                    dateFormat="dd/MM/yyyy"
                    />
                </InputGroup>
                {errors.availability && (
                    <FormErrorMessage>{errors.availability}</FormErrorMessage>
                )}
                </FormControl>

                {/* Submit Button */}
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
                    _hover={{
                    textColor: 'gray',
                    borderColor: theme.colors.accent,
                    }}
                    form="inKindDonations"
                    onClick={handleSubmit}
                >
                    Enviar
                </Button>
                </Center>
            </form>
            </Stack>
        )}
        </Center>
    );
    }

    // Export the AnimalForm component
    export default inKindDonations;
