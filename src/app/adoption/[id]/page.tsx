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
} from '@chakra-ui/react';
import theme from '@/theme';

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
            width: '110px',
            height: '300px',
          }}
          className="embla__slide"
        >
          <Image
            alt="pet"
            style={{
              borderTopLeftRadius: '0.375rem',
              borderBottomLeftRadius: '0.375rem',
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
            width: '110px',
            height: '300px',
          }}
          className="embla__slide"
        >
          <Image
            alt="pet"
            style={{
              borderTopLeftRadius: '0.375rem',
              borderBottomLeftRadius: '0.375rem',
              aspectRatio: '16/9',
            }}
            sizes="(max-width: 768px) 100vw, 700px"
            src="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
            fill
            priority
          />
        </div>
        <div
          style={{ position: 'relative', width: '110px', height: '300px' }}
          className="embla__slide"
        >
          <Image
            alt="pet"
            style={{
              borderTopLeftRadius: '0.375rem',
              borderBottomLeftRadius: '0.375rem',
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

interface props {
  params: { id: string };
}

export default function animalDescription(pparam: props) {
  const [data, setData] = useState<Animal>();
  const dataService = HelperFunctions;
  useEffect(() => {
    (async () => {
      const aux = await dataService.getAnimals();
      setData(aux?.find((animal) => animal.id === pparam.params.id));
    })();
  }, [pparam.params.id, dataService]);

  return (
    <Center>
      <Stack>
        <Box bg="bgcard" w="90vw" mt={10} mb={10} shadow="xl" borderRadius="md">
          <Stack direction={['column', 'column', 'row', 'row']}>
            <Carousel />
            <Box
              borderRadius="md"
              ml={[0, 0, -2, -2]}
              mt={[-2, -2, 0, 0]}
              w={['90vw', '90vw', '60vw']}
              shadow="inner"
            >
              <Text color="black" ml={3} mt={1}>
                Nombre : {data?.name}
              </Text>
              <Text color="black" ml={3} mt={1}>
                Edad : {data?.age}
              </Text>
              <Text color="black" ml={3} mt={1}>
                Índice de Salud : {data?.health_rating}
              </Text>
              <Text color="black" ml={3} mt={1}>
                Raza : {data?.breed ? data?.breed : 'Sin raza definida'}
              </Text>
              <Text color="black" mb={3} ml={3} mt={1}>
                Sexo : {data?.sex ? 'Macho' : 'Hembra'}
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box bg="bgcard" w="90vw" mt={10} mb={10} shadow="xl" borderRadius="md">
          <Tabs variant="soft-rounded" colorScheme="brand" mb={4} p={3}>
            <TabList>
              <Tab bg={theme.colors.accent} shadow="xl" mr={5}>
                Ubicacion
              </Tab>
              <Tab bg={theme.colors.accent} shadow="xl">
                Contactar
              </Tab>
            </TabList>
            <TabPanels>
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
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Center>
  );
}
