'use client';

import React from 'react';
import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  Image,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import theme from '@/theme';

export default function Footer() {
  return (
    <Box
      boxShadow="xl"
      bg={useColorModeValue(theme.colors.secondary, theme.colors.secondary)}
      color={useColorModeValue('black', 'black')}
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        spacing={4}
        justify="center"
        align="center"
      >
        <Text fontSize="3xl" fontFamily="Irish Grover">
          GLAM
        </Text>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'center' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2023 GLAM. Todos los derechos reservados</Text>
        </Container>
      </Box>
    </Box>
  );
}
