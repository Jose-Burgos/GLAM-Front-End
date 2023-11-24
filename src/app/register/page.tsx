'use client';

import React from 'react';
import NextLink from 'next/link';
import {
  Flex,
  HStack,
  Link,
  useColorModeValue,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Heading,
} from '@chakra-ui/react';
import UserRegisterFrom from '@/components/userregisterform';
import OngRegisterFrom from '@/components/ongregisterform';
import BgSignUp from '@/assets/images/BgSignUp.png';

export default function Register() {
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const bgIcons = useColorModeValue('teal.200', 'rgba(255, 255, 255, 0.5)');
  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: '70vh', md: '50vh' }}
        w={{ md: 'calc(100vw - 50px)' }}
        borderRadius={{ md: '15px' }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={`url(${BgSignUp.src})`}
        bgSize="cover"
        mx={{ md: 'auto' }}
        mt={{ md: '14px' }}
      />
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Heading color="white" fontSize="32px" mb="10px">
          Bienvenido!
        </Heading>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: '90%', sm: '60%', lg: '40%', xl: '30%' }}
        >
          Complete este formulario para crear una cuenta.
        </Text>
      </Flex>

      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: '100px' }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Quien eres?
          </Text>
          <Tabs
            variant="soft-rounded"
            colorScheme="brand"
            align="center"
            mb={4}
          >
            <TabList>
              <Tab shadow="xl" mr={8}>
                Usuario
              </Tab>
              <Tab shadow="xl">Organización</Tab>
            </TabList>
            <HStack spacing="15px" justify="center" mb="22px">
              <TabPanels>
                <TabPanel>
                  <UserRegisterFrom />
                </TabPanel>
                <TabPanel>
                  <OngRegisterFrom />
                </TabPanel>
              </TabPanels>
            </HStack>
          </Tabs>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Ya tienes cuenta?
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                href="/login"
                fontWeight="bold"
              >
                <NextLink href="/login">Ingresa</NextLink>
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
