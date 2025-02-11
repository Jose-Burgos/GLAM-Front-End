'use client';

import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  Text,
  Icon,
  Stack,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { Separator } from './separator';
import IconBox from '@/assets/icons/iconBox';
import {
  HomeLogo,
  AdoptionLogo,
  OngLogo,
  LogInLogo,
  SignUpLogo,
  DashboardLogo,
  LogOutLogo,
  PawPrintIcon,
} from '@/assets/icons/icons';
import AuthContext from '@/hooks/authContext';
import helpers from '~/supabase/helpers';
import  React, { useState, useEffect, useRef, useContext } from 'react';

interface Routes {
  path: string;
  name: string;
  icon: any;
  rolesAllowed?: string[];
}

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

export default function AdminSidebarResponsive(props: any) {
  const location = usePathname();
  const { colorMode, toggleColorMode } = useColorMode();
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef<HTMLDivElement>(null);
  const activeRoute = (routeName: any) => {
    return location === routeName ? 'active' : '';
  };
  const { isLoggedIn, logOut, type } = React.useContext(AuthContext);

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


  const routes: Array<Routes> = [
    {
      path: '/',
      name: 'Inicio',
      icon: <HomeLogo w="24px" h="24px" me="0px" />,
    },
    {
      path: '/adoption',
      name: 'Adopciones',
      icon: <AdoptionLogo w="20px" h="20px" me="0px" />,
    },
    {
      path: '/ong',
      name: 'Organizaciones',
      icon: <OngLogo w="26px" h="26px" me="0px" />,
    },
  ];

  const loggedRoutes: Array<Routes> = session
    ? [
        {
          path: '/',
          name: 'Inicio',
          icon: <HomeLogo w="24px" h="24px" me="0px" />,
          rolesAllowed: ['ong', 'user'],
        },
        {
          path: '/adoption',
          name: 'Adopciones',
          icon: <AdoptionLogo w="20px" h="20px" me="0px" />,
          rolesAllowed: ['ong', 'user'],
        },
        {
          path: '/ong',
          name: 'Organizaciones',
          icon: <OngLogo w="26px" h="26px" me="0px" />,
          rolesAllowed: ['ong', 'user'],
        },
        {
          path: `/${type}/auth/home`,
          name: 'Dashboard',
          icon: <DashboardLogo w="26px" h="26px" me="0px" />,
          rolesAllowed: ['ong'],
        },
        {
          path: `/${type}/animals?owner=${session.user.id}`,
          name: 'Mis Animales',
          icon: <PawPrintIcon color='black' w="26px" h="26px" me="0px" />,
          rolesAllowed: ['ong'],
        },
        {
          path: `/${type}/auth/requests?owner=${name || ''}`,
          name: 'Mis Solicitudes',
          icon: <PawPrintIcon color='black' w="26px" h="26px" me="0px" />,
          rolesAllowed: ['user'],
        },
      ]
    : [];

  const authRoutes: Array<Routes> = [
    {
      path: '/login',
      name: 'Iniciar Sesion',
      icon: <LogInLogo w="24px" h="24px" me="0px" />,
    },
    {
      path: '/register',
      name: 'Registrate',
      icon: <SignUpLogo w="24px" h="24px" me="0px" />,
    },
  ];

  const dataSet = isLoggedIn ? loggedRoutes : routes;

  const createLinks = () => {
    const activeBg = useColorModeValue('white', 'gray.700');
    const inactiveBg = useColorModeValue('white', 'gray.700');
    const activeColor = useColorModeValue('gray.700', 'white');
    const inactiveColor = useColorModeValue('gray.400', 'gray.400');

    return dataSet.filter((prop) => prop.rolesAllowed?.includes(type) ).map((prop: any, key: any) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        
        return <div key={prop.name}>{createLinks()}</div>;
      }
      return (
        <NextLink href={prop.path} key={prop.name}>
          {activeRoute(prop.path) === 'active' ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              mb={{
                xl: '12px',
              }}
              mx={{
                xl: 'auto',
              }}
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              py="12px"
              borderRadius="15px"
              w="100%"
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              <Flex>
                {typeof prop.icon === 'string' ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="teal.300"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: '12px',
              }}
              mx={{
                xl: 'auto',
              }}
              py="12px"
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              borderRadius="15px"
              w="100%"
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              <Flex>
                {typeof prop.icon === 'string' ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox color="white" h="30px" w="30px" me="12px">
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NextLink>
      );
    });
  };

  const createAuthLinks = () => {
    const activeBg = useColorModeValue('white', 'gray.700');
    const inactiveBg = useColorModeValue('white', 'gray.700');
    const activeColor = useColorModeValue('gray.700', 'white');
    const inactiveColor = useColorModeValue('gray.400', 'gray.400');

    if (isLoggedIn) {
      return (
        <Button
          boxSize="initial"
          justifyContent="flex-start"
          alignItems="center"
          bg="transparent"
          mb={{
            xl: '12px',
          }}
          mx={{
            xl: 'auto',
          }}
          ps={{
            sm: '10px',
            xl: '16px',
          }}
          py="12px"
          borderRadius="15px"
          w="100%"
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
          onClick={() => {
            logOut();
          }}
        >
          <Flex>
            <IconBox bg="teal.300" color="white" h="30px" w="30px" me="12px">
              <LogOutLogo />
            </IconBox>

            <Text color={activeColor} my="auto" fontSize="sm">
              Cerrar Sesion
            </Text>
          </Flex>
        </Button>
      );
    }

    return authRoutes.map((prop: any, key: any) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        return <div key={prop.name}>{createAuthLinks()}</div>;
      }

      return (
        <NextLink href={prop.path} key={prop.name}>
          {activeRoute(prop.path) === 'active' ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              mb={{
                xl: '12px',
              }}
              mx={{
                xl: 'auto',
              }}
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              py="12px"
              borderRadius="15px"
              w="100%"
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              <Flex>
                {typeof prop.icon === 'string' ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="teal.300"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: '12px',
              }}
              mx={{
                xl: 'auto',
              }}
              py="12px"
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              borderRadius="15px"
              w="100%"
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              <Flex>
                {typeof prop.icon === 'string' ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox color="white" h="30px" w="30px" me="12px">
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NextLink>
      );
    });
  };

  const { logoText, ...rest } = props;

  const links = <>{createLinks()}</>;
  const authlinks = <>{createAuthLinks()}</>;
  let hamburgerColor = useColorModeValue('gray.500', 'gray.200');
  if (props.secondary === true) {
    hamburgerColor = 'white';
  }

  return (
    <Flex
      display={{ sm: 'none', lg: 'flex', xl: 'flex' }}
      ref={mainPanel}
      alignItems="center"
    >
      <Box w="250px" maxW="250px" borderRadius="20px">
        <Box maxW="250px" px="1rem">
          <Box maxW="100%" h="50vh">
            <Stack direction="column" mb="40px">
              <Box>{links}</Box>
            </Stack>
            <Separator />
            <Stack direction="column" mb="40px">
              <Box background="transparent">{authlinks}</Box>
              <IconBox>
                <Icon
                  mt={15}
                  as={colorMode === 'dark' ? MoonIcon : SunIcon}
                  display={{
                    sm: 'flex',
                    lg: 'none',
                  }}
                  onClick={toggleColorMode}
                />
              </IconBox>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
