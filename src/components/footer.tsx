'use client';

import React from 'react';
import {
  Flex,
  List,
  ListItem,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
  const linkTeal = useColorModeValue('teal.400', 'red.200');
  return (
    <Flex
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
      mt="5%"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
      >
        &copy; {new Date().getUTCFullYear()},{' '}
        <Text as="span">GLAM. Todos los derechos reservados</Text>
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color={linkTeal} href="/" target="_blank">
            Inicio
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color={linkTeal} href="/adoption" target="_blank">
            Adopciones
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color={linkTeal} href="/ong" target="_blank">
            Organizaciones
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
