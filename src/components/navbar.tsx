'use client';

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Link,
  Text,
  Icon,
  useColorModeValue,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  AdoptionLogo,
  HomeLogo,
  OngLogo,
  LogInLogo,
  LogOutLogo,
  DashboardLogo,
} from '@/assets/icons/icons';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import SidebarResponsive from './sidebarResonsive';
import AuthContext from '@/hooks/authContext';
import HelperFunctions from '~/supabase/helpers';
import helpers from '~/supabase/helpers';

let session: any;
let name: string;

async function fetchSession() {
  const session = await helpers.getSession();
  if (session !== null) {
    const name = await helpers.getNameById(session.user.id);
    // you can now use 'name' here if needed
  } else {
    // Handle case where session is null, if necessary
    console.log("No session found");
  }
}


fetchSession();


export default function NavBar(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logIn, isLoggedIn, logOut, type } = useContext(AuthContext);


 // Estado para almacenar session y name
 const [session, setSession] = useState<any>(null);
 const [name, setName] = useState<string>('');

 // Obtener la sesión y el nombre del usuario
 useEffect(() => {
   async function fetchSession() {
     const sessionData = await helpers.getSession();
     setSession(sessionData);
     const userName = sessionData ? await helpers.getNameById(sessionData.user.id) : '';
     setName(userName);
   }
   fetchSession();
 }, []);


  const handleLogOut = () => {
    logOut();
  };
  useEffect(() => {
    const checkSession = async () => {
      const session = await HelperFunctions.getSession();
      if (session) {
        logIn();
      }
    };
    checkSession();
  }, [logIn, isLoggedIn]);
  const { logo, logoText, secondary, ...rest } = props;
  const navbarIcon = useColorModeValue('gray.700', 'gray.200');
  const mainText = useColorModeValue('gray.700', 'gray.200');
  const navbarBg = useColorModeValue(
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)',
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)'
  );
  const navbarBorder = useColorModeValue(
    '1.5px solid #FFFFFF',
    '1.5px solid rgba(255, 255, 255, 0.31)'
  );
  const navbarShadow = useColorModeValue(
    '0px 7px 23px rgba(0, 0, 0, 0.05)',
    'none'
  );
  const navbarFilter = useColorModeValue(
    'none',
    'drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))'
  );
  const navbarBackdrop = 'blur(21px)';
  const bgButton = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'gray.800'
  );
  const colorButton = 'white';

  const brand = (
    <Link
      href="/"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Heading fontSize="25px" mt="3px">
        GLAM
      </Heading>
    </Link>
  );
  const linksAuth = (
    <HStack display={{ sm: 'none', lg: 'flex' }}>
      <Link href="/">
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={
            <HomeLogo color={navbarIcon} w="24px" h="24px" me="0px" mb={2} />
          }
        >
          <Text fontSize="md">Inicio</Text>
        </Button>
      </Link>
      <Link href="/ong">
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={
            <OngLogo color={navbarIcon} w="26px" h="26px" me="0px" mb={2} />
          }
        >
          <Text fontSize="md">Organizaciones</Text>
        </Button>
      </Link>
      <Link href={`/${type}/auth/home?owner=${name}`}>
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={
            <OngLogo color={navbarIcon} w="26px" h="26px" me="0px" mb={2} />
          }
        >
          <Text fontSize="md">Perfil</Text>
        </Button>
      </Link>
    </HStack>
  );
  return (
    <Flex
      position="fixed"
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      zIndex={100}
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{ sm: 'start', lg: 'space-between' }}>
        {brand}
        <Box
          ms={{ base: 'auto', lg: '0px' }}
          display={{ base: 'flex', lg: 'none' }}
        >
          <SidebarResponsive
            logoText={props.logoText}
            secondary={props.secondary}
            {...rest}
          />
        </Box>
        {linksAuth}
        <HStack spacing={5}>
          {!isLoggedIn && (
            <Link href="/login">
              <Button
                bg={bgButton}
                color={colorButton}
                fontSize="xs"
                variant="no-hover"
                borderRadius="35px"
                px="15px"
                display={{
                  sm: 'none',
                  lg: 'flex',
                }}
                leftIcon={<LogInLogo w="24px" h="24px" me="0px" />}
              >
                <Text fontSize="md">Iniciar Sesion</Text>
              </Button>
            </Link>
          )}
          {isLoggedIn && (
            <Button
              bg={bgButton}
              color={colorButton}
              fontSize="xs"
              variant="no-hover"
              borderRadius="35px"
              px="15px"
              display={{
                sm: 'none',
                lg: 'flex',
              }}
              leftIcon={<LogOutLogo w="24px" h="24px" me="0px" />}
              onClick={handleLogOut}
            >
              <Link href="/">
                <Text fontSize="md">Cerrar Sesion</Text>
              </Link>
            </Button>
          )}
          <Icon
            as={colorMode === 'dark' ? MoonIcon : SunIcon}
            me={{ sm: '2px', md: '16px' }}
            display={{
              sm: 'none',
              lg: 'flex',
            }}
            justifyContent="center"
            alignItems="center"
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>
    </Flex>
  );
}
