'use Client';

import * as React from 'react';
import {
  Stack,
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { AdoptLogo } from '@/assets/icons/icons';
import Link from 'next/link';
import Image from 'next/image';
import { UserRoutes } from '~/src/routes';

interface PetData {
  id: string;
  img: string;
  name: string;
  description: string | null;
}

function MobilePetCard(props: PetData) {
  const bgColor = useColorModeValue('white', 'gray.700');
  return (
    <Box me="-1%" w="85vw" bg={bgColor} shadow="xl" borderRadius="15px">
      <Flex>
        <Stack direction={['row', 'row']}>
          <Box position="relative" width="30vw" h="20vh">
            <Image
              style={{
                borderBottomRightRadius: '15px',
                borderTopLeftRadius: '15px',
                borderBottomLeftRadius: '15px',
              }}
              alt="pet"
              src={props.img}
              fill
              priority
              sizes="(min-width: 768px) 100vw, 700px"
            />
          </Box>
          <Stack
            display="flex"
            mt={2}
            direction={['column', 'column', 'column', 'column']}
          >
            <Text>{props.name}</Text>
          </Stack>
        </Stack>
        <Spacer />
        <Stack>
          <Spacer />
          <Link href={`/adoption/${props.id}`}>
            <Button bg="teal.300" size="md" mr={2} mb={2}>
              <AdoptLogo w="28px" h="28px" />
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}

function DesktopPetCard(props: PetData) {
  const bgColor = useColorModeValue('white', 'gray.700');
  return (
    <Box
      bg={bgColor}
      shadow="xl"
      borderBottomRadius="15px"
      borderTopRadius="15px"
    >
      <Stack>
        <Box>
          <Box position="relative" width="20vw" h="30vh">
            <Image
              style={{
                borderBottomRightRadius: '15px',
                borderTopRightRadius: '15px',
                borderTopLeftRadius: '15px',
              }}
              alt="pet"
              src={props.img}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </Box>
          <Box ml={2} mt={2}>
            <Stack direction={['column', 'column', 'column', 'column']}>
              <Text>{props.name}</Text>
              <Text>{props.description}</Text>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Flex>
        <Spacer />
        <Link href={`adoption/${props.id}`}>
          <Button bg="teal.300" size="md" mt={5} mb={2} mr={2} fontSize="sm">
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
      <Box display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
        <DesktopPetCard
          id={props.id}
          img={props.img}
          name={props.name}
          description={props.description}
        />
      </Box>

      <Box
        display={{
          sm: 'flex',
          md: 'flex',
          lg: 'none',
          xl: 'none',
        }}
      >
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
