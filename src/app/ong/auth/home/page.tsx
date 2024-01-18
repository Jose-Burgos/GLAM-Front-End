'use client'

import React, {useEffect, useState}from 'react';
import { Flex, HStack, Text, Grid, GridItem, VStack, Image, useColorMode, Accordion, AccordionItem, AccordionButton, AccordionPanel, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Box, Center, AccordionIcon, Heading, StackDivider, useColorModeValue, Divider, Spacer} from '@chakra-ui/react';
import OrgDashboardSidebar from '@/components/OrgDashboardSidebar';
import supabase from '~/supabase/helpers';
import { Animal, InKindDonation } from '~/supabase/types/supabase.tables';
import { Separator } from '@/components/separator';

export default function UserDashboard() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [iknotifications, setIKNotifications] = useState<InKindDonation[]>();
  const [ongName, setOngName] = useState('')
  const [ongAnimals, setOngAnimals] = useState({} as Animal[])
  useEffect(() => {
    (async () => {
      setOngName(await supabase.getCurrentUserName());
      setIKNotifications(await supabase.getInKindDonations());
      setOngAnimals(await supabase.getOrgAnimals())
    })();
  }, []);
  const data=    [
    { value: ongAnimals.length, label: 'Animales para adoptar' },
    { value: 0, label: 'Animales Adoptados' },
    { value: 0, label: 'Solicitudes pendientes' },
    { value: 0, label: 'Adopciónes en curso' },
  ];
  
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');

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
                <Accordion defaultIndex={[0]} allowMultiple>
                  {iknotifications?.map((item, index) => (
                    <AccordionItem key={index}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            Tienes una nueva Donación!
                          </Box>
                          <AccordionIcon boxSize={4} />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Un usuario donará {item.quantity} elementos de {item.type} {item.condition}, se presentará el día {item.availability.split('T')[0]}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
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
