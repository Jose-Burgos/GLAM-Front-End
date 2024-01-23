'use client'

import React, {useEffect, useState}from 'react';
import { Flex, HStack, Text, Grid, GridItem, VStack, Image, useColorMode, Accordion, AccordionItem, AccordionButton, AccordionPanel, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Box, Center, AccordionIcon, Heading, StackDivider, useColorModeValue, Divider, Spacer} from '@chakra-ui/react';
import OrgDashboardSidebar from '@/components/OrgDashboardSidebar';
import supabase from '~/supabase/helpers';
import { AdoptionRequest, Animal, InKindDonation } from '~/supabase/types/supabase.tables';
import { Separator } from '@/components/separator';

export default function UserDashboard() {
  let adoptedAnimals,nonAdoptedAnimals;
  const [iknotifications, setIKNotifications] = useState<InKindDonation[]>();
  const [ongName, setOngName] = useState('')
  const [ongAnimals, setOngAnimals] = useState({} as Animal[])
  const [adoptionsRequests, setAdoptionsRequests] = useState({} as AdoptionRequest[])
  useEffect(() => {
    (async () => { 
      setOngName(await supabase.getCurrentUserName());
      setIKNotifications(await supabase.getInKindDonations());
      setOngAnimals(await supabase.getOrgAnimals())
      setAdoptionsRequests(await supabase.getOrgAdoptionRequests()); //
    })();
  }, []);
  if (typeof ongAnimals === 'object' && Array.isArray(ongAnimals)) {
    adoptedAnimals = ongAnimals.filter(objeto => objeto.adopted === true).length;
    nonAdoptedAnimals = ongAnimals.filter(objeto => objeto.adopted === false).length;
  } 

  const data=    [
    { value: nonAdoptedAnimals, label: 'Animales para adoptar' },
    { value: adoptedAnimals, label: 'Animales Adoptados' },
    { value: adoptionsRequests.length, label: 'Solicitudes pendientes' },
    { value: 0, label: 'Adopciones en curso' },
  ];
  
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  
  function handleNotificationClick(id: number): void {
    (async () => { 
      await supabase.setSeenNotification(id)
    })();
  }

  return (
    <Flex p={8} flexDirection="column" justifyContent="center">
      <HStack>
        {/* <Flex mt={{ lg: '-50%', xl: '-30%' }}> */}
        <OrgDashboardSidebar />
        {/* </Flex> */}
        <Flex
          direction="column"
          w="100%"
          h="100%"
          mt={120}
          // px={{ base: 4, md: 8 }}
          // pt={{ base: '100px', md: '%', lg: '12%' }}
        >
          <Grid
          mt={1}
            mb={3}
            
            // w="100%"
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(12, 1fr)'
            gap={4}
          >
            <GridItem rowSpan={2} colSpan={4}  bg={bgColor } padding={8} boxShadow="md" borderRadius="xl">
            <Heading fontSize="4xl" mb={2} color={titleColor}>
              {ongName}
            </Heading>
              <VStack divider={<Separator />} spacing={3} align='stretch'>
                {data.map((item, index) => (
                  <HStack mt={5} key={index}>
                    <Heading fontSize="3xl">{item.value}</Heading>
                    <Spacer />
                    <Text fontSize="lg">{item.label}</Text>
                  </HStack>
                ))}
              </VStack>
            </GridItem> 
            <GridItem colSpan={4} bg={bgColor} padding={4} boxShadow="md" borderRadius="xl">
              <Text fontSize='lg' fontWeight='bold' mb={4}>Notificaciones</Text>
              {iknotifications?.length === 0 ? (
                <Text>No tienes notificaciones</Text>
              ) : (
                <Accordion allowToggle>
                  {iknotifications?.map((item, index) => {
                    const fechaDisponibilidad = new Date(item.availability);
                    // Compara la fecha de disponibilidad con la fecha actual
                    if (fechaDisponibilidad > new Date()) {
                      return (
                        <AccordionItem key={index}>
                          <h2>
                            <AccordionButton onClick={() => handleNotificationClick(item.id)}>
                              <Box as="span" flex='1' textAlign='left'>
                                {!item.seen ? <b>Tienes una nueva Donación!</b> : <p>Tienes una nueva Donación!</p>}
                              </Box>
                              <AccordionIcon boxSize={4} />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>Tipo de donación: {item.type}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <p>Condición: {item.condition}</p>
                            <p>Descripcion: {item.description}</p>
                            <p>Se presentará el día {item.availability.split('T')[0]}</p>
                          </AccordionPanel>
                        </AccordionItem>
                      );
                    }
                    return null; // No renderizar la notificación si la fecha ha pasado
                  })}
                </Accordion>
              )}
            </GridItem>

            <GridItem
              colSpan={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={bgColor}
              padding={4}
              boxShadow="md"
              borderRadius="xl"
              textAlign="center"
            >
              <Stat>
                <StatLabel fontSize="lg">Balance total</StatLabel>
                <StatNumber fontSize="4xl">$0.00 ARS</StatNumber>
                <StatHelpText fontSize="md">Nov 12 - Nov 30</StatHelpText>
              </Stat>
            </GridItem>
            <GridItem colSpan={8} bg={bgColor} padding={4} boxShadow="md" borderRadius="xl" />
          </Grid>
        </Flex>
      </HStack>
    </Flex>
  );
}
