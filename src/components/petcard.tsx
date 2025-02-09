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
  useToast,
} from '@chakra-ui/react';
import { AdoptLogo } from '@/assets/icons/icons';
import Link from 'next/link';
import Image from 'next/image';
import supabase from '~/supabase/helpers';
import { useEffect, useState } from 'react';

interface PetData {
  id: string;
  img: string;
  name: string;
  description: string | null;
}

interface PetCardProps extends PetData {
  isLoggedIn: boolean;
}

function MobilePetCard(props: PetCardProps) {
  const { isLoggedIn, id, img, name } = props;
  const bgColor = useColorModeValue('white', 'gray.700');
  const toast = useToast();

  const handleAdoptClick = () => {
    if (!isLoggedIn) {
      toast({
        title: 'Please log in to adopt.',
        description: 'You need to be logged in to proceed with the adoption.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box me="-1%" w="85vw" bg={bgColor} shadow="xl" borderRadius="15px">
      <Flex>
        <Stack direction={['row', 'row']}>
          <Box position="relative" width={100} h={100}>
            <Image
              style={{
                borderBottomRightRadius: '15px',
                borderTopLeftRadius: '15px',
                borderBottomLeftRadius: '15px',
              }}
              alt="pet"
              src={img}
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
            <Text>{name}</Text>
          </Stack>
        </Stack>
        <Spacer />
        <Stack>
          <Spacer />
          <Link href={`/adoption/${id}`}>
            <Button
              bg="teal.300"
              size="md"
              mr={2}
              mb={2}
              isDisabled={!isLoggedIn} // Disable button if not logged in
              onClick={handleAdoptClick} // Show login message if not logged in
            >
              <AdoptLogo w="28px" h="28px" />
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}

function DesktopPetCard(props: PetCardProps) {
  const { isLoggedIn, id, img, name, description } = props;
  const bgColor = useColorModeValue('white', 'gray.700');
  const toast = useToast();

  const handleAdoptClick = () => {
    if (!isLoggedIn) {
      toast({
        title: 'Please log in to adopt.',
        description: 'You need to be logged in to proceed with the adoption.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg={bgColor}
      shadow="xl"
      borderBottomRadius="15px"
      borderTopRadius="15px"
    >
      <Stack>
        <Box>
          <Box position="relative" width={200} h={200}>
            <Image
              style={{
                borderBottomRightRadius: '15px',
                borderTopRightRadius: '15px',
                borderTopLeftRadius: '15px',
              }}
              alt="pet"
              src={img}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </Box>
          <Box ml={2} mt={2}>
            <Stack direction={['column', 'column', 'column', 'column']}>
              <Text>{name}</Text>
              <Text>{description}</Text>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Flex>
        <Spacer />
        <Link href={`/adoption/${id}`}>
          <Button
            bg="teal.300"
            size="md"
            mt={5}
            mb={2}
            mr={2}
            fontSize="sm"
            isDisabled={!isLoggedIn} // Disable button if not logged in
            onClick={handleAdoptClick} // Show login message if not logged in
          >
            Adoptame
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default function PetCard(props: PetData) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check the session status using supabase.getSession()
  useEffect(() => {
    const fetchSession = async () => {
      const session = await supabase.getSession();
      setIsLoggedIn(!!session?.user); // Safe check using optional chaining
    };
    
    fetchSession();
  }, []);

  return (
    <Box>
      <Box display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
        <DesktopPetCard
          id={props.id}
          img={props.img}
          name={props.name}
          description={props.description}
          isLoggedIn={isLoggedIn} // Pass login state
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
          isLoggedIn={isLoggedIn} // Pass login state
        />
      </Box>
    </Box>
  );
}
