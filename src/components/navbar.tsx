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
  Link as ChakraLink,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React, { useContext, useEffect } from 'react';
import {
  AdoptionLogo,
  HomeLogo,
  OngLogo,
  LogInLogo,
  LogOutLogo,
  DashboardLogo,
  ReportLogo,
} from '@/assets/icons/icons';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import SidebarResponsive from './sidebarResonsive';
import AuthContext from '@/hooks/authContext';
import HelperFunctions from '~/supabase/helpers';

export default function NavBar(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logIn, isLoggedIn, logOut, type } = useContext(AuthContext);
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
    'linear-gradient(81.62deg, #3F386F 2.25%, #151928 79.87%)',
    'gray.700'
  );
  const colorButton = 'white';
  const colorBrand = useColorModeValue('teal.800', 'teal.200');

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
      <Heading fontSize="25px" mt="3px" color={colorBrand}>
        GLAM
      </Heading>
    </Link>
  );
  const linksAuth = (
    <HStack display={{ sm: 'none', lg: 'flex' }}>
      <NextLink href="/">
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          _hover={{textColor: 'teal.400'}}
          leftIcon={
            <HomeLogo color={navbarIcon} w="24px" h="24px" me="0px" mb={2} />
          }
        >
          <Text fontSize="md" >Inicio</Text>
        </Button>
      </NextLink>
      <NextLink href="/adoption">
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          _hover={{textColor: 'teal.400'}}
          leftIcon={
            <AdoptionLogo
              color={navbarIcon}
              w="20px"
              h="20px"
              me="0px"
              mb={2}
            />
          }
        >
          <Text fontSize="md">Adopciones</Text>
        </Button>
      </NextLink>
      <NextLink href="/ong">
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          _hover={{textColor: 'teal.400'}}
          leftIcon={
            <OngLogo color={navbarIcon} w="26px" h="26px" me="0px" mb={2} />
          }
        >
          <Text fontSize="md">Organizaciones</Text>
        </Button>
      </NextLink>

      <NextLink href="/reports/lost">
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          _hover={{textColor: 'teal.400'}}
          leftIcon={
            <ReportLogo color={navbarIcon} w="26px" h="26px" me="0px" mb={2} />
          }
        >
          <Text fontSize="md">Reporte</Text>
        </Button>
      </NextLink>

      {isLoggedIn && (
        <NextLink href={`/${type}/auth/home`}>
          <Button
            fontSize="sm"
            ms="0px"
            px="0px"
            me={{ sm: '2px', md: '16px' }}
            color={navbarIcon}
            variant="transparent-with-icon"
            leftIcon={
              <DashboardLogo
                color={navbarIcon}
                w="30px"
                h="30px"
                me="0px"
                mb={1}
              />
            }
          >
            <Text fontSize="md">Dashboard</Text>
          </Button>
        </NextLink>
      )}
    </HStack>
  );
  if (!isLoggedIn)
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
                <NextLink href="/">
                  <Text fontSize="md">Cerrar Sesion</Text>
                </NextLink>
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
        <HStack spacing={5}>
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
              <NextLink href="/">
                <Text fontSize="md">Cerrar Sesion</Text>
              </NextLink>
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
