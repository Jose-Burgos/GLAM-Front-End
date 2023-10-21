'use Client';

import * as React from 'react';
import {
  Stack,
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

interface PetData {
  id: string;
  img: string;
  name: string;
  description: string | null;
}

function MobilePetCard(props: PetData) {
  return (
    <Box me="-1%" w="85vw" bg="bgcard" shadow="xl" borderBottomRadius="md">
      <Flex>
        <Stack direction={['row', 'row']}>
          <Box position="relative" width={100} h={100}>
            <Image
              style={{ borderBottomRightRadius: '4rem' }}
              alt="pet"
              src={props.img}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </Box>
          <Box ml={2} mt={2}>
            <Stack direction={['column', 'column', 'column', 'column']}>
              <Text color="black">{props.name}</Text>
              <Text color="black">{props.description}</Text>
            </Stack>
          </Box>
        </Stack>
        <Spacer />
        <Stack>
          <Spacer />
          <Link href={`/adoption/${props.id}`}>
            <Button
              bg="accent"
              size="sm"
              mr={2}
              mb={2}
              padding={2}
              alignItems="end"
              justifyContent="end"
              fontSize="sm"
            >
              Adoptame
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}

function DesktopPetCard(props: PetData) {
  return (
    <Box bg="bgcard" shadow="xl" borderBottomRadius="md">
      <Stack>
        <Box>
          <Box position="relative" width={200} h={200}>
            <Image
              style={{ borderBottomRightRadius: '1.5rem' }}
              alt="pet"
              src={props.img}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </Box>
          <Box ml={2} mt={2}>
            <Stack direction={['column', 'column', 'column', 'column']}>
              <Text color="black">{props.name}</Text>
              <Text color="black">{props.description}</Text>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Flex>
        <Spacer />
        <Link href={`/adoption/${props.id}`}>
          <Button
            bg="accent"
            size="sm"
            mt={5}
            mb={2}
            mr={2}
            padding={2}
            alignItems="end"
            justifyContent="end"
            fontSize="sm"
          >
            Adoptame
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default function PetCard(props: PetData) {
  return (
    <Box>
      <Box display={{ base: 'none', md: 'inline-flex' }}>
        <DesktopPetCard
          id={props.id}
          img={props.img}
          name={props.name}
          description={props.description}
        />
      </Box>

      <Box display={{ base: 'flex', md: 'none' }}>
        <MobilePetCard
          id={props.id}
          img={props.img}
          name={props.name}
          description={props.description}
        />
      </Box>
    </Box>
  );
}
