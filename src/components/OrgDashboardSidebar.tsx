'use client';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  Stack,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { Separator } from './separator';
import IconBox from '@/assets/icons/iconBox';
import {
  HomeLogo,
  AdoptionLogo,
  OngLogo,
  DashboardLogo,
  LogOutLogo,
} from '@/assets/icons/icons';
import AuthContext from '@/hooks/authContext';
import { OngRoutes } from '~/src/routes';

interface Route {
  path: string;
  name: string;
  icon: any;
}

export default function OrgDashboardSidebar() {
  const location = usePathname();
  const { colorMode, toggleColorMode } = useColorMode();
  const mainPanel = React.useRef<HTMLDivElement>(null);
  const activeRoute = (routeName: any) => {
    return location === routeName ? 'active' : '';
  };

  const { logOut } = React.useContext(AuthContext);

  const routes: Array<Route> = [
    {
      path: '/',
      name: 'Inicio',
      icon: <HomeLogo w="24px" h="24px" me="0px" />,
    },
    {
      path: OngRoutes.adoptions,
      name: 'Adopciones',
      icon: <AdoptionLogo w="20px" h="20px" me="0px" />,
    },
    {
      path: OngRoutes.animals,
      name: 'Animales',
      icon: <OngLogo w="26px" h="26px" me="0px" />,
    },
    {
      path: OngRoutes.dashboard,
      name: 'Dashboard',
      icon: <DashboardLogo w="26px" h="26px" me="0px" />,
    },
    {
      path: OngRoutes.settings,
      name: 'Mi ONG',
      icon: <OngLogo w="26px" h="26px" me="0px" />,
    },
  ];

  const createLinks = () => {
    const activeBg = useColorModeValue('white', 'gray.700');
    const activeColor = useColorModeValue('gray.700', 'white');

    return routes.map((route: Route) => {
      return (
        <NextLink href={route.path} key={route.name}>
          {activeRoute(route.path) === 'active' ? (
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
                {typeof route.icon === 'string' ? (
                  <Icon>{route.icon}</Icon>
                ) : (
                  <IconBox
                    bg="teal.300"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {route.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {route.name}
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
                {typeof route.icon === 'string' ? (
                  <Icon>{route.icon}</Icon>
                ) : (
                  <IconBox color="white" h="30px" w="30px" me="12px">
                    {route.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {route.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NextLink>
      );
    });
  };

  const createAuthLinks = () => {
    const activeColor = useColorModeValue('gray.700', 'white');

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
  };

  const links = <>{createLinks()}</>;
  const authlinks = <>{createAuthLinks()}</>;

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
