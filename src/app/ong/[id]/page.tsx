'use client';

import ContactForm from '@/components/contactform';
import GoogleMapsView from '@/components/googlemaps';
import React, { useEffect, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import Image from 'next/image';
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
  Grid,
  GridItem,
  Spinner,
  Flex,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import theme from '@/theme';
import PetCard from '@/components/petcard';
import {
  AdoptLogo,
  ContactLogo,
  LocationLogo,
  PhoneLogo,
} from '@/assets/icons/icons';
import { Separator } from '@/components/separator';

interface IdInterface {
  id: string;
}

export default function OngInfo() {
  const [cardData, setCardData] = useState<Animal[]>();
  const [success, setSuccess] = useState<boolean>(false);
  const bgColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    (async () => {
      const data = await HelperFunctions.getAnimals();
      setCardData(data);
      setSuccess(true);
    })();
  }, []);

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
        w="100%"
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
              <Box
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '30vh',
                }}
              >
                <Image
                  alt="pet"
                  style={{
                    borderRadius: '15px',
                    aspectRatio: '16/9',
                  }}
                  sizes="(max-width: 768px) 100vw, 700px"
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/79b5f558303657.5a09eafeaf888.jpg"
                  fill
                  priority
                />
              </Box>
              <Flex
                bg="transparent"
                borderRadius="15px"
                w="100%"
                p={2}
                justifyContent="center"
              >
                <Stack>
                  <Text ml={3} mt={2}>
                    Nombre Ong
                  </Text>
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
                <Button size="md" bg="teal.300" ml="auto" mt="auto">
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
                  <Tab shadow="xl" display={{ sm: 'none', md: 'flex' }}>
                    Animales
                  </Tab>
                  <Tab shadow="xl" mr={5} display={{ sm: 'flex', md: 'none' }}>
                    <AdoptLogo w="40px" h="40px" />
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
                    {/* <ContactForm /> */}
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    {/* <ContactForm /> */}
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
                              species_id={card.species_id}
                              isLoggedIn
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
                              species_id={card.species_id}
                              isLoggedIn
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
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
