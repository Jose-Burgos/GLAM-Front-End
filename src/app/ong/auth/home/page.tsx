'use client'
import React, {useEffect, useState}from 'react';
import { Flex, HStack, Text, Grid, GridItem, VStack, Image, useColorMode, Accordion, AccordionItem, AccordionButton, AccordionPanel, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Box, Center, AccordionIcon, Heading, StackDivider} from '@chakra-ui/react';
import OrgDashboardSidebar from '@/components/OrgDashboardSidebar';
import supabase from '~/supabase/helpers';
import { Animal, InKindDonation } from '~/supabase/types/supabase.tables';

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
    { value: 0, label: 'Animales en proceso de adopción' },
  ];
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
            h='500px'
            // w="100%"
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(12, 1fr)'
            gap={4}
          >
            <GridItem rowSpan={2} colSpan={4}  bg={colorMode === 'light' ? 'gray.200' : 'gray.600' } padding={8} boxShadow="md" borderRadius="xl">
            <Heading fontSize="4xl" mb={2}>
              {ongName}
            </Heading>
              <VStack divider={<StackDivider borderColor={colorMode === 'light' ? 'gray.800' : 'gray.200' } />} spacing={5} align='stretch'>
                {data.map((item, index) => (
                  <Box key={index}>
                    <Heading fontSize="3xl">{item.value}</Heading>
                    <Text fontSize="lg">{item.label}</Text>
                  </Box>
                ))}
              </VStack>
            </GridItem> 
            <GridItem colSpan={4} bg={colorMode === 'light' ? 'gray.200' : 'gray.600'} padding={4} boxShadow="md" borderRadius="xl">
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
                        Un usuario donará {item.quantity} elementos de {item.type} {item.condition}, se presentará el día {item.availability}
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
              bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
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
            <GridItem colSpan={8} bg={colorMode === 'light' ? 'gray.200' : 'gray.600'} padding={4} boxShadow="md" borderRadius="xl">
            
            </GridItem>
          </Grid>
        </Flex>
      </HStack>
    </Flex>
  );
}
