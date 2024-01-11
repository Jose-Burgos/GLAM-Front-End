'use client';

import ContactForm from '@/components/contactform';
import UserRegisterFrom from '@/components/userregisterform';
import InKindDonationForm from '@/components/inKindDonationForm';
import GoogleMapsView from '@/components/googlemaps';
import React, { useEffect, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import Image from 'next/image';
import {Box, Center, Stack, Text, Tabs, TabList, Tab, TabPanels, Grid, GridItem, Spinner, Flex, useColorModeValue, Button, HStack, TabPanel, Heading, } from '@chakra-ui/react';
import PetCard from '@/components/petcard';
import {
  AdoptLogo,
  ContactLogo,
  LocationLogo,
  PhoneLogo,
} from '@/assets/icons/icons';
import { Separator } from '@/components/separator';
import MonetaryDonationForm from '@/components/monetaryDonationForm';

interface IdInterface {
  id: string;
}

export default function OngInfo(props: IdInterface) {
  const [cardData, setCardData] = useState<Animal[]>();
  const [success, setSuccess] = useState<boolean>(false);
  const bgColor = useColorModeValue('white', 'gray.700');
  const [user, setUser] = useState('');
  const titleColor = useColorModeValue('teal.300', 'teal.200');

  useEffect(() => {
    (async () => {
      setCardData(await HelperFunctions.getAnimals());
      setSuccess(true);
      setUser(await HelperFunctions.getCurrentUserId());
    })();
  }, []);


  return (
    <Flex
      position="relative"
      maxW="1044px"
      w="100%"
      mx="auto"
      pt={{ sm: '10%', md: '5%' }}
    >
      <Flex
        alignItems="center"
        justifyContent="start"
        style={{ userSelect: 'none' }}
        w={{ base: '100%', md: '100%', lg: '100%' }}
      >
        <Flex direction="column" w="100%"  background="transparent" p="48px">
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
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '40vh',
                }}
              >
                <Image
                  alt="ong"
                  style={{
                    borderRadius: '15px',
                    aspectRatio: '16/9',
                  }}
                  sizes="(max-width: 768px) 100vw, 700px"
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/79b5f558303657.5a09eafeaf888.jpg"
                  fill
                  priority
                />
              </div>
              <Flex
                bg="transparent"
                borderRadius="15px"
                w="100%"
                p={2}
                justifyContent="center"
              >
                <Stack>
                  <Heading color={titleColor} ml={3} mt={2}>
                    Nombre Ong
                  </Heading>
                  <Text ml={3} mt={5}>
                    Direccion Ong
                  </Text>
                  <Text ml={3} mt={5}>
                    Numero de telefono - Gmail
                  </Text>
                  <Text ml={3} mt={5} mb={2}>
                    Descripcion
                  </Text>
                </Stack>
                <Button size="md" bg="teal.300" ml={{ sm:"auto" }} mt="auto" display={{ sm: "flex", md: "none" }}>
                  <PhoneLogo w="35px" h="35px" />
                </Button>
              </Flex>
            </Stack>
          </Box>
          <Box mb={10} p={2}>
            <Tabs variant="soft-rounded" colorScheme="brand" mb={4} p={3}>
              <TabList>
                <Flex justifyContent="center" alignItems="center" w="100%">
                  <Tab shadow="xl" mr={5} display={{ sm: 'none', md: 'flex' }}>
                    Ubicacion
                  </Tab>
                  <Tab shadow="xl" mr={5} display={{ sm: 'flex', md: 'none' }}>
                    <LocationLogo w="40px" h="40px" />
                  </Tab>
                  <Tab shadow="xl" mr={5} display={{ sm: 'none', md: 'flex' }}>
                    Contactar
                  </Tab>
                  <Tab shadow="xl" mr={5} display={{ sm: 'flex', md: 'none' }}>
                    <ContactLogo w="40px" h="40px" />
                  </Tab>
                  <Tab shadow="xl" mr={5} display={{ sm: 'none', md: 'flex' }}>
                    Animales
                  </Tab>
                  <Tab shadow="xl" mr={5} display={{ sm: 'flex', md: 'none' }}>
                    <AdoptLogo w="40px" h="40px" />
                  </Tab>
                  <Tab shadow="xl" mr={5} display={{ sm: 'none', md: 'flex' }}>
                    Donar
                  </Tab>
                </Flex>
              </TabList>
              <Separator mt={4} />
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
                    <ContactForm {...{animalId: props.id}} />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <ContactForm {...{animalId: props.id}} />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <Grid
                      mt={5}
                      templateColumns={{
                        sm: 'repeat(1, 1fr)',
                        md: 'repeat(1, 1fr)',
                        lg: 'repeat(3, 1fr)',
                      }}
                      gap={8}
                    >
                      {success ? (
                        cardData?.map((card, idx) => (
                          <GridItem key={idx}>
                            <PetCard
                              id={card.id}
                              img="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
                              name={card.name}
                              description={card.breed}
                            />
                          </GridItem>
                        ))
                      ) : (
                        <Spinner
                          thickness="8px"
                          speed="0.65s"
                          color="teal.300"
                          size="xl"
                        />
                      )}
                    </Grid>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <Grid
                      mt={5}
                      templateColumns={{
                        sm: 'repeat(1, 1fr)',
                        md: 'repeat(1, 1fr)',
                        lg: 'repeat(3, 1fr)',
                      }}
                      gap={8}
                    >
                      {success ? (
                        cardData?.map((card, idx) => (
                          <GridItem key={idx}>
                            <PetCard
                              id={card.id}
                              img="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
                              name={card.name}
                              description={card.breed}
                            />
                          </GridItem>
                        ))
                      ) : (
                        <Spinner
                          thickness="8px"
                          speed="0.65s"
                          color="teal.300"
                          size="xl"
                        />
                      )}
                    </Grid>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Text
                    fontSize="xl"
                    // color={textColor}
                    fontWeight="bold"
                    textAlign="center"
                    mb="22px"
                  >
                    Donaciones
                  </Text>
                  {user ? (
                  <Tabs
                    variant="soft-rounded"
                    colorScheme="brand"
                    align="center"
                    mb={4}
                  >
                    <TabList>
                      <Tab shadow="xl" mr={8}>
                        Monetaria
                      </Tab>
                      <Tab shadow="xl">
                        En Especie
                      </Tab>
                    </TabList>
                    <HStack spacing="15px" justify="center" mb="22px">
                      <TabPanels>
                        <TabPanel>
                          <MonetaryDonationForm/>
                        </TabPanel>
                        <TabPanel>
                          <InKindDonationForm/>
                        </TabPanel>
                      </TabPanels>
                    </HStack>
                  </Tabs>
                  ):(
                    <Text
                    fontSize="xl"
                    // color={textColor}
                    textAlign="center"
                    mb="22px"
                  >
                    Para poder hacer donaciones debes iniciar sesión 
                  </Text>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
