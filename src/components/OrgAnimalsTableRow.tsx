'use client';

import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { OngRoutes } from '~/src/routes'

import { Animal } from '~/supabase/types/supabase.tables';

function OrgAnimalsTableRow(animal: Animal) {
  const textColor = useColorModeValue('gray.700', 'white');
  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  return (
    <Tr key={animal.id}>
      <Td minWidth={{ sm: '250px' }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar
            src={animal.profile_pic || 'default animal pic should go here'}
            w="50px"
            borderRadius="12px"
            me="18px"
          />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {animal.name}
            </Text>
            {/* <Text fontSize="sm" color="gray.400" fontWeight="normal"> */}
            {/*   {email} */}
            {/* </Text> */}
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {animal.age}
          </Text>
          {/* <Text fontSize="sm" color="gray.400" fontWeight="normal"> */}
          {/*   {subdomain} */}
          {/* </Text> */}
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={animal.adopted ? 'green.400' : bgStatus}
          color={animal.adopted ? 'white' : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {animal.adopted ? 'Adoptado' : 'No adoptado'}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {animal.rescue_date}
        </Text>
      </Td>
      <Td>
        <NextLink href={OngRoutes.animals + animal.id}>
          <Button p="0px" bg="transparent" variant="no-hover">
            <Text
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Editar
            </Text>
          </Button>
        </NextLink>
      </Td>
    </Tr>
  );
}

export default OrgAnimalsTableRow;
