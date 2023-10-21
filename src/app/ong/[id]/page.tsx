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
} from '@chakra-ui/react';
import theme from '@/theme';
import PetCard from '@/components/petcard';
import Loading from '@/components/loading';

interface IdInterface {
  id: string;
}

export default function OngInfo(props: IdInterface) {
  const [cardData, setCardData] = useState<Animal[]>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await HelperFunctions.getAnimals();
      setCardData(data);
      setSuccess(true);
    })();
  }, []);

  return (
    <Center>
      <Stack>
        <Box bg="bgcard" w="90vw" mt={10} mb={5} shadow="xl" borderRadius="md">
          <Stack direction={['column', 'column', 'row', 'row']}>
            <Box
              style={{
                position: 'relative',
                width: '250px',
                height: '300px',
              }}
            >
              <Image
                alt="pet"
                style={{
                  borderTopLeftRadius: '0.375rem',
                  borderBottomLeftRadius: '0.375rem',
                  aspectRatio: '16/9',
                }}
                sizes="(max-width: 768px) 100vw, 700px"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/79b5f558303657.5a09eafeaf888.jpg"
                fill
                priority
              />
            </Box>
            <Box
              borderRadius="md"
              ml={[0, 0, -2, -2]}
              mt={[-2, -2, 0, 0]}
              w={['90vw', '90vw', '60vw']}
              shadow="inner"
            >
              <Text color="black" ml={3} mt={5}>
                Nombre Ong
              </Text>
              <Text color="black" ml={3} mt={5}>
                Direccion Ong
              </Text>
              <Text color="black" ml={3} mt={5}>
                Numero de telefono - Gmail
              </Text>
              <Text color="black" ml={3} mt={5}>
                Descripcion
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
              <Tab bg={theme.colors.accent} shadow="xl" mr={5}>
                Contactar
              </Tab>
              <Tab bg={theme.colors.accent} shadow="xl">
                Animales
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
              <TabPanel>
                <Center>
                  <Grid
                    templateColumns={[
                      'repeat(1, fr)',
                      'repeat(2, fr)',
                      'repeat(3, 3fr)',
                      'repeat(4, 4fr)',
                      'repeat(5, 5fr)',
                    ]}
                    gap={8}
                    padding={5}
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
                      <Loading />
                    )}
                  </Grid>
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Center>
  );
}
