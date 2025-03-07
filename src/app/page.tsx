// Tiene que ser client para el password reset que necesita useEffect.
// Después igual se puede cambiar a dónde redirecciona el mail de confimación
// de cambio de clave y movemos el useEffect ahí y listo.

'use client';

// This is the landing
import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import IconBox from '@/assets/icons/iconBox';
import {
  AboutUsLogo,
  AdoptLogo,
  DonateLogo,
  OngLogo,
} from '@/assets/icons/icons';
import { Separator } from '@/components/separator';
import PetCard from '@/components/petcard';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import OngCard from '@/components/ongcard';
import NavBar from '@/components/navbar';

const ongData = [
  {
    id: 'algo',
    url: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/79b5f558303657.5a09eafeaf888.jpg',
    name: 'Proyecto 4 Patas',
  },
  {
    id: 'algo2',
    url: 'data:image/png;base64,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',
    name: 'Zaguates Refugio',
  },
  {
    url: 'data:image/png;base64,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',
    name: 'Patitas Al Rescate',
  },
  {
    id: 'algo3',
    url: 'data:image/jpeg;base64,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',
    name: 'Patitas Glew',
  },
];

export default function Landing() {
  const [cardData, setCardData] = useState<Animal[]>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await HelperFunctions.getAnimals();
      setCardData(data);
      setSuccess(true);
    })();
  }, []);
  const titleColor = useColorModeValue('black', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const bgIcons = useColorModeValue('white', 'teal.200');
  return (
    <>
      <NavBar />
      <Flex pos="relative" mb="10%">
        <Flex
          mt={{ sm: '5%', md: '15%', lg: '15%', xl: '10%' }}
          w="100wh"
          mx="auto"
          pt={{ sm: '100px', md: '0px' }}
          direction="column"
        >
          <Flex justifyContent="start" style={{ userSelect: 'none' }}>
            <Flex justifyContent="center" w="100%" background="transparent">
              <Grid
                gap={8}
                templateColumns={{
                  sm: 'repeat(1, 1fr)',
                  md: 'repeat(2, 2fr)',
                  lg: 'repeat(2, 1fr)',
                  xl: 'repeat(4, 1fr)',
                }}
              >
                <GridItem>
                  <Flex
                    direction="column"
                    position="relative"
                    width={250}
                    h={390}
                    background="transparent"
                    borderRadius="15px"
                    alignItems="center"
                    p="40px"
                    bg={bgColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                  >
                    <IconBox w="80px" p={2} bg={bgIcons}>
                      <AboutUsLogo w="60px" h="60px" />
                    </IconBox>
                    <Box>
                      <Text fontSize="md" align="center" p={-4} mt={4}>
                        Somos una organización sin fines de lucro, con el
                        objetivo de que todos los animales maltratados o en
                        situación de calle tengan la posibilidad de encontrar un
                        nuevo hogar.
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem>
                  <Flex
                    direction="column"
                    alignItems="center"
                    position="relative"
                    width={250}
                    h={390}
                    background="transparent"
                    borderRadius="15px"
                    p="40px"
                    bg={bgColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                  >
                    <IconBox w="80px" p={2} bg={bgIcons}>
                      <AdoptLogo w="60px" h="60px" />
                    </IconBox>
                    <Box>
                      <Text fontSize="md" align="center" p={-4} mt={4}>
                        Para adoptar un animal, crea una cuenta como usuario y
                        luego ve a la página de ADOPCIONES, luego, haz clic en
                        &quot;Detalles&quot; para ver los datos de un animal.
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem>
                  <Flex
                    direction="column"
                    alignItems="center"
                    position="relative"
                    width={250}
                    h={390}
                    background="transparent"
                    borderRadius="15px"
                    p="40px"
                    bg={bgColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                  >
                    <IconBox w="80px" p={2} bg={bgIcons}>
                      <OngLogo w="60px" h="60px" />
                    </IconBox>
                    <Box>
                      <Text fontSize="md" align="center" p={-4} mt={4}>
                        Una vez en la página de detalles, busca el formulario de
                        contacto y envía un mensaje. La ONG se pondrá en
                        contacto contigo pronto.
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem>
                  <Flex
                    direction="column"
                    alignItems="center"
                    position="relative"
                    width={250}
                    h={390}
                    background="transparent"
                    borderRadius="15px"
                    p="40px"
                    bg={bgColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                  >
                    <IconBox w="80px" p={2} bg={bgIcons}>
                      <DonateLogo w="60px" h="60px" />
                    </IconBox>
                    <Box>
                      <Text fontSize="md" align="center" p={-4} mt={4}>
                        Para poner en adopción un animal, debes tener una cuenta
                        de ONG. Una vez creada, podrás agregar animales desde tu
                        página de inicio.
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>
              </Grid>
            </Flex>
          </Flex>
          <Box mt="5%">
            <Heading color={titleColor}>Mascotas</Heading>
            <Separator mt="8px" />
            <Flex position="relative" mb="10%">
              <Flex
                mt={{ sm: '-10%', md: '12%', lg: '5%', xl: '5%' }}
                w="100wh"
                maxW="1044px"
                mx="auto"
                pt={{ sm: '100px', md: '0px' }}
              >
                <Flex justifyContent="start" style={{ userSelect: 'none' }}>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    background="transparent"
                  >
                    <Grid
                      gap={8}
                      templateColumns={{
                        sm: 'repeat(1, 1fr)',
                        md: 'repeat(1, 1fr)',
                        lg: 'repeat(4, 1fr)',
                      }}
                    >
                      {success ? (
  cardData?.map((card, idx) => (
    <GridItem key={idx}>
      <PetCard
        id={card.id}
        img="favicon.ico"
        name={card.name}
        description={card.breed}
        species_id={card.species_id}
        isLoggedIn
      />
    </GridItem>
  ))
) : (
  <CircularProgress isIndeterminate color="teal.300" />
)}

                    </Grid>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Box mt="5%">
              <Heading color={titleColor}>Organizaciones</Heading>
              <Separator mt="8px" />
              <Flex position="relative">
                <Flex
                  mt={{ sm: '-10%', md: '5%', lg: '5%' }}
                  w="100wh"
                  maxW="1044px"
                  mx="auto"
                  pt={{ sm: '100px', md: '0px' }}
                >
                  <Flex justifyContent="start" style={{ userSelect: 'none' }}>
                    <Flex
                      justifyContent="center"
                      w="100%"
                      background="transparent"
                    >
                      <Grid
                        gap={8}
                        templateColumns={{
                          sm: 'repeat(1, 1fr)',
                          md: 'repeat(1, 1fr)',
                          lg: 'repeat(4, 1fr)',
                        }}
                      >
                        {ongData?.map((card, idx) => (
                          <GridItem key={idx}>
                            <OngCard
                              id={card.id}
                              img={card.url}
                              name={card.name}
                            />
                          </GridItem>
                        ))}
                      </Grid>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
