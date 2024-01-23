'use client';

import ContactForm from '@/components/contactform';
import GoogleMapsView from '@/components/googlemaps';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import './carousel.css';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Box,
  Center,
  Stack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Heading,
  useColorModeValue,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Checkbox,
} from '@chakra-ui/react';
import theme from '@/theme';
import { Separator } from '@/components/separator';
import { AdoptLogo, ContactLogo, LocationLogo, SignUpLogo } from '@/assets/icons/icons';
import { Modal } from '@chakra-ui/react';
import { Form } from 'react-router-dom';

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({
      delay: 4000,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
      stopOnLastSnap: true,
    }),
  ]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div
          style={{
            position: 'relative',
            width: '80vw',
            height: '40vh',
          }}
          className="embla__slide"
        >
          <Image
            alt="pet"
            style={{
              borderRadius: '15px',
              aspectRatio: '16/9',
            }}
            sizes="(max-width: 768px) 100vw, 700px"
            src="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
            fill
            priority
          />
        </div>
        <div
          style={{
            position: 'relative',
          }}
          className="embla__slide"
        >
          <Image
            alt="pet"
            style={{
              borderRadius: '15px',
              aspectRatio: '16/9',
            }}
            sizes="(max-width: 768px) 100vw, 700px"
            src="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
            fill
            priority
          />
        </div>
        <div
          style={{ position: 'relative' }}
          className="embla__slide"
        >
          <Image
            alt="pet"
            style={{
              borderRadius: '15px',
              aspectRatio: '16/9',
            }}
            sizes="(max-width: 768px) 100vw, 700px"
            src="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
            fill
            priority
          />
        </div>
      </div>
    </div>
  );
}

interface Params {
  params: { id: string };
}

export default function animalDescription({params}: Params) {
  const [animal, setAnimal] = useState<Animal>();
  const dataService = HelperFunctions;
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.700');
  useEffect(() => {
    (async () => {
      const aux = await dataService.getAnimals();
      setAnimal(aux?.find((animalId) => animalId.id === params.id));
    })();
  }, [params.id, dataService]);

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const [formValues, setFormValues] = useState({
    nombreApellido: '',
    numeroCelular: '',
    edad: '',
    domicilio: '',
    localidad: '',
    tipoLocacion: [] as string[],
    exterior: [] as string[], 
    animalesTransitante: '',
  });  

  const handleSubmit = () => {
    dataService.requestAdoption(params.id, formValues);
    handleCloseFormModal();
  };

  const handleInputChange = (field:any, value:any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    };
  

    const handleCheckboxChange = (option: string) => {
      setFormValues((prevValues) => {
        const opcionesSeleccionadas = prevValues.exterior.includes(option)
          ? prevValues.exterior.filter((item) => item !== option)
          : [...prevValues.exterior, option];
    
        return {
          ...prevValues,
          exterior: opcionesSeleccionadas,
        };
      });

    };

    const handleCheckboxHouseTypeChange = (option: string) => {
      setFormValues((prevValues) => {
        const opcionesSeleccionadas = prevValues.tipoLocacion.includes(option)
          ? prevValues.tipoLocacion.filter((item) => item !== option)
          : [...prevValues.tipoLocacion, option];
    
        return {
          ...prevValues,
          tipoLocacion: opcionesSeleccionadas,
        };
      });

    
  };

  return (
    <Flex
      position="relative"
      w="100%"
      maxW="1044px"
      mx="auto"
      pt={{ sm: '10%', md: '5%' }}
    >
      <Flex
        alignItems="center"
        justifyContent="start"
        style={{ userSelect: 'none' }}
        w={{ base: '100%', md: '100%', lg: '100%' }}
      >
        <Flex direction="column" w="100%" background="transparent" p="48px">
          <Box
            bg={bgColor}
            w="100%"
            mt={10}
            mb={10}
            shadow="xl"
            borderRadius="15px"
          >
            <Stack
              direction={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
            >
              <Carousel />
              <Flex
                bg="transparent"
                borderRadius="15px"
                w="100%"
                p={2}
                justifyContent="center"
              >
                <Stack>
                  <Text ml={3} mt={1}>
                    <Heading> {animal?.name} </Heading>
                  </Text>
                  <Text ml={3} mt={1} fontSize="md" fontWeight="bold">
                    Edad : {animal?.age}
                  </Text>
                  <Text ml={3} mt={1} fontSize="md" fontWeight="bold">
                    Índice de Salud : {animal?.health_rating}
                  </Text>
                  <Text ml={3} mt={1} fontSize="md" fontWeight="bold">
                    Raza : {animal?.breed ? animal?.breed : 'Sin raza definida'}
                  </Text>
                  <Text mb={3} ml={3} mt={1} fontSize="md" fontWeight="bold">
                    Sexo : {animal?.sex ? 'Macho' : 'Hembra'}
                  </Text>
                </Stack>
                <Button size="lg" bg="teal.300" borderRadius="15px" ml="auto" mt="auto" onClick={handleOpenFormModal}>
                  <Text size="md" display={{sm: 'none', md: 'flex'}}>Formulario Adopción</Text>
                  <AdoptLogo display={{sm: 'flex', md: 'none'}}/>
                </Button>
                <Modal isOpen={isFormModalOpen} onClose={handleCloseFormModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Formulario de Adopción</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text fontSize="md" fontWeight="bold">
                        Por favor, rellene el siguiente formulario para poder iniciar la adopción de {animal?.name}
                      </Text>
                        <FormControl>
                        <FormLabel>Nombre y Apellido</FormLabel>
                          <Input type='text' 
                          onChange={(e) => handleInputChange('nombreApellido',e.target.value)}
                          value={formValues.nombreApellido}/>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Número de Celular</FormLabel>
                          <Input type='tel'
                          onChange={(e) => handleInputChange('numeroCelular',e.target.value)}
                          value={formValues.numeroCelular}/>
                        <FormHelperText>Por favor recordá ingresar el número con código de área sin el 15.</FormHelperText>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Edad</FormLabel>
                          <Input type='number'
                          onChange={(e) => handleInputChange('edad',e.target.value)}
                          value={formValues.edad}/>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Domicilio completo</FormLabel>
                          <Input type='text' 
                          onChange={(e) => handleInputChange('domicilio',e.target.value)}
                          value={formValues.domicilio}/>
                        <FormHelperText>Si es departamento agregar la unidad.</FormHelperText>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Localidad</FormLabel>
                          <Input type='text' 
                          onChange={(e) => handleInputChange('localidad',e.target.value)}
                          value={formValues.localidad}/>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Tipo de locación</FormLabel>
                        <Stack direction="column">
                          <Checkbox
                          onChange={ () => handleCheckboxHouseTypeChange('Departamento')}
                          isChecked={formValues.tipoLocacion.includes('Departamento')}
                          >Departamento</Checkbox>
                          <Checkbox onChange={ () => handleCheckboxHouseTypeChange('Casa')}
                          isChecked={formValues.tipoLocacion.includes('Casa')}
                          >Casa</Checkbox>
                        </Stack>
                        <FormHelperText>Departamento o casa.</FormHelperText>
                        </FormControl>
                        <FormControl>
                        <FormLabel>¿Tenés patio, balcón o terraza?</FormLabel>
                        <Stack direction="column">
                          <Checkbox
                          onChange={ () => handleCheckboxChange('Patio')}
                          isChecked={formValues.exterior.includes('Patio')}
                          >Patio
                          </Checkbox>
                          <Checkbox
                          onChange={ () => handleCheckboxChange('Balcón')}
                          isChecked={formValues.exterior.includes('Balcón')}
                          >Balcón
                          </Checkbox>
                          <Checkbox
                          onChange={ () => handleCheckboxChange('Terraza')}
                          isChecked={formValues.exterior.includes('Terraza')}
                          >Terraza
                          </Checkbox>
                          <Checkbox
                          onChange={ () => handleCheckboxChange('No tengo ninguno')}
                          isChecked={formValues.exterior.includes('No tengo ninguno')}
                          >No tengo ninguno
                          </Checkbox>
                        </Stack>
                        <FormHelperText>Podés seleccionar más de una en caso de que tengas.</FormHelperText>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Animales del transitante </FormLabel>
                          <Input type='text'
                          onChange={(e) => handleInputChange('animalesTransitante',e.target.value)}
                          value={formValues.animalesTransitante} />
                          <FormHelperText>Indicar si tenés animales propios y qué tipo de animales son.</FormHelperText>
                        </FormControl>
                    </ModalBody>
                    <Button type="button" onClick={handleSubmit}>
                      Enviar
                    </Button>
                  </ModalContent>
                </Modal>
              </Flex>
            </Stack>
          </Box>
          <Box
            w="100%"
            bg={bgColor}
            mb={10}
            shadow="xl"
            borderRadius="15px"
            p={2}
          >
            <Tabs
              variant="soft-rounded"
              colorScheme="brand"
              mb={4}
              p={3}
              align="center"
            >
              <TabList mb={5}>
                <Tab
                  bg={theme.colors.accent}
                  shadow="xl"
                  mr={5}
                  display={{ sm: 'none', md: 'flex' }}
                >
                  Ubicación
                </Tab>
                <Tab shadow="xl" mr={5} display={{ sm: 'flex', md: 'none' }}>
                  <LocationLogo w="40px" h="40px" />
                </Tab>
                <Tab shadow="xl" display={{ sm: 'none', md: 'flex' }}>
                  Contactar
                </Tab>
                <Tab shadow="xl" mr={5} display={{ sm: 'flex', md: 'none' }}>
                  <ContactLogo w="40px" h="40px" />
                </Tab>
              </TabList>
              <Separator />
              <TabPanels>
                <TabPanel>
                  <Center>
                    <GoogleMapsView />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <GoogleMapsView />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <ContactForm {...{animalId: params.id}} />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <ContactForm {...{animalId: params.id}}/>
                  </Center>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
