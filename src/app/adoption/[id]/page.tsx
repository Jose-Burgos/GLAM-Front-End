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
} from '@chakra-ui/react';
import theme from '@/theme';
import { Separator } from '@/components/separator';
import { ContactLogo, LocationLogo, SignUpLogo } from '@/assets/icons/icons';

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
            width: '20vw',
            height: '30vh',
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
            width: '20vw',
            height: '30vh',
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
          style={{ position: 'relative', width: '20vw', height: '30vh' }}
          className="embla__slide"
        >
          <Image
            alt="pet"
            style={{
              borderRadius: '15px',
              aspectRatio: '16/9',
              maxWidth: '400px',
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

interface props {
  params: { id: string };
}

export default function animalDescription(pparam: props) {
  const [data, setData] = useState<Animal>();
  const dataService = HelperFunctions;
  const bgColor = useColorModeValue('white', 'gray.700');
  useEffect(() => {
    (async () => {
      const aux = await dataService.getAnimals();
      setData(aux?.find((animal) => animal.id === pparam.params.id));
    })();
  }, [pparam.params.id, dataService]);

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
                    <Heading> {data?.name} </Heading>
                  </Text>
                  <Text ml={3} mt={1} fontSize="md" fontWeight="bold">
                    Edad : {data?.age}
                  </Text>
                  <Text ml={3} mt={1} fontSize="md" fontWeight="bold">
                    Índice de Salud : {data?.health_rating}
                  </Text>
                  <Text ml={3} mt={1} fontSize="md" fontWeight="bold">
                    Raza : {data?.breed ? data?.breed : 'Sin raza definida'}
                  </Text>
                  <Text mb={3} ml={3} mt={1} fontSize="md" fontWeight="bold">
                    Sexo : {data?.sex ? 'Macho' : 'Hembra'}
                  </Text>
                </Stack>
                <Button size="lg" bg="teal.300" ml="auto" mt="auto">
                  <SignUpLogo w="35px" h="35px" />
                </Button>
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
                  Ubicacion
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
                    <ContactForm />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <ContactForm />
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
