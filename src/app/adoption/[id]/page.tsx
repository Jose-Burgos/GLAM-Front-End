'use client';

import ContactForm from '@/components/contactform';
import GoogleMapsView from '@/components/googlemaps';
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
        {/* Image Carousel slides here */}
      </div>
    </div>
  );
}

interface props {
  params: { id: string }; // Expecting animalId from params
}

export default function AnimalDescription(pparam: props) {
  const [data, setData] = useState<Animal | undefined>(undefined);
  console.log("pparams: ", pparam.params);
  const dataService = HelperFunctions;
  const bgColor = useColorModeValue('white', 'gray.700');

  // Fetch animal data based on the provided animalId
  useEffect(() => {
    const fetchData = async () => {
      const aux = await dataService.getAnimals();
      console.log('Animals Data:', aux); // Ensure aux is populated with animal objects

      // Log the expected ID and check its type
      console.log('Expected ID:', pparam.params.id);
      console.log('Expected ID Type:', typeof pparam.params.id);

      // Log each animal's ID to confirm they are available and correct
      aux?.forEach((animal) => {
        console.log('Animal ID:', animal.id); // Log the actual animal id
      });

      // Now attempt to find the correct animal
      const foundAnimal = aux?.find((animal) => {
        // Ensure both `id` and `pparam.params.id` are of the same type for comparison
        const animalId = animal.id.toString(); // Convert animal.id to string if it's a number
        const expectedId = pparam.params.id.trim().toLowerCase(); // Ensure pparam.params.id is a trimmed string

        console.log('Comparing Animal ID:', animalId, 'with Expected ID:', expectedId);
        const isMatch = animalId === expectedId;
        console.log('Match?', isMatch);

        return isMatch; // This should return true if it's a match
      });

      // After finding the animal, log the result
      console.log('Found Animal:', foundAnimal);

      // Set the found animal in state
      if (foundAnimal) {
        console.log("Setting found animal to state:", foundAnimal);
        setData(foundAnimal);
      } else {
        console.log("No matching animal found.");
      }
    };

    fetchData();
  }, [pparam.params.id, dataService]); // Re-run when the ID or dataService changes

  // Log updated `data` when it changes
  useEffect(() => {
    console.log("Updated data:", data);  // Log data after it updates
  }, [data]); // This effect runs every time `data` changes

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
                    <Heading>{data?.name}</Heading>
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
                    <GoogleMapsView/>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <GoogleMapsView />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    {/* Pass the animalId to the ContactForm component */}
                    <ContactForm animalId={pparam.params.id} />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <ContactForm animalId={pparam.params.id} />
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
