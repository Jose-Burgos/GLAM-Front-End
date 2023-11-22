'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import theme from '@/theme';
import HelperFunctions from '~/supabase/helpers';
import { useRouter } from 'next/navigation';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const Nav_Items: Array<NavItem> = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Adopciones',
    href: '/adoption',
  },
  {
    label: 'Organizaciones',
    href: '/ong',
  },
];

function DesktopNav() {
  const linkColor = useColorModeValue('black', 'black');
  const popoverContentBgColor = useColorModeValue('black', 'black');

  return (
    <Stack direction="row" spacing={4} my="auto">
      {Nav_Items.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize="md"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: theme.colors.accent,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
}

function DesktopSubNav({ label, href, subLabel }: NavItem) {
  return (
    <Link
      href={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{
        bg: useColorModeValue(theme.colors.accent, theme.colors.accent),
      }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: theme.colors.accent }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize="sm">{subLabel}</Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color={theme.colors.accent} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
}

function MobileNav() {
  return (
    <Stack
      bg={useColorModeValue(theme.colors.secondary, theme.colors.secondary)}
      p={4}
      display={{ md: 'none' }}
      justifyContent="center"
      justify="center"
      align="center"
    >
      {Nav_Items.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
}

function MobileNavItem({ label, children, href }: NavItem) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
          color: '#DFDF9E',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('black', 'black')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={10}
            h={10}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  const handleClick = () => {
    HelperFunctions.logout();
    router.push('/');
  };

  return (
    <Box shadow="2xl" top={0} position="sticky" zIndex={3}>
      <Flex
        bg={useColorModeValue(theme.colors.secondary, theme.colors.secondary)}
        color={useColorModeValue('white', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text fontFamily="Irish Grover" fontSize="3xl" color="black">
            <Link
              _hover={{ textDecoration: 'none', cursor: 'default' }}
              href="/"
            >
              GLAM
            </Link>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={4}
        >
          <Button
            as="a"
            fontSize="sm"
            fontWeight={500}
            color="black"
            bg={theme.colors.accent}
            href="/login"
            _hover={{
              textColor: 'gray',
              borderColor: theme.colors.accent,
            }}
          >
            Iniciá sesión
          </Button>
          <Button
            as="a"
            fontSize="sm"
            fontWeight={500}
            color="black"
            bg={theme.colors.accent}
            href="/login"
            _hover={{
              textColor: 'gray',
              borderColor: theme.colors.accent,
            }}
            onClick={handleClick}
          >
            Cerrar sesión
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
