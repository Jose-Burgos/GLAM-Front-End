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
import { useLocation } from "react-router-dom";

interface PetData {
  id: string;
  species_id: number;  // Add species_id to the interface
  name: string;
  description: string | null;
}

interface PetCardProps extends PetData {
  isLoggedIn: boolean;
  img: string;
}

// Mapping species IDs to image URLs
const speciesImages: { [key: string]: string } = {
  "0dcec5e1-37a3-41a6-9a4f-da7f760a35b9": "https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg", // Imagen de un perro
  "b0386722-da0b-4883-a5b2-642b18ded16d": "https://images.pexels.com/photos/144240/goat-lamb-little-grass-144240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Cabra"
  "0073939f-0113-4320-9cf3-234edc32a92b": "https://images.pexels.com/photos/3652958/pexels-photo-3652958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Tortuga"
  "01a4fef0-457b-4644-8b2f-1e14a522ca2b": "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Caballo"
  "9e38b8a6-d0bd-4bfd-a78b-1af8d06d6630": "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Pez"
  "81af0a69-3e2b-4466-8e94-f8980e7cbd74": "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Gato"
  "fe425e76-e49b-4d49-a934-ff41b9d386fc": "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=600",
  "ecb8b184-df31-4526-8595-fbcbd089b06c": "https://images.pexels.com/photos/15316903/pexels-photo-15316903/free-photo-of-hamster-in-vase.jpeg?auto=compress&cs=tinysrgb&w=600"
};

function MobilePetCard(props: PetCardProps) {
  const { isLoggedIn, id, species_id, name } = props;
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

  // Determine the image based on species_id
  const img = speciesImages[species_id] || "https://images.pexels.com/photos/11829002/pexels-photo-11829002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Default image if no species_id is found

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
  const { isLoggedIn, id, species_id, name, description } = props;
  const bgColor = useColorModeValue('white', 'gray.700');
  const toast = useToast();
  console.log("Species ID: ", species_id);
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

  // Determine the image based on species_id
  const img = speciesImages[species_id] || "https://images.pexels.com/photos/11829002/pexels-photo-11829002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Default image if no species_id is found

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

function AdoptedPetCard(props: PetCardProps) {        // falta hacer que llame a esta card en caso de que este en la pagina adopciones (y que el boton elimine el pedido)
  const { isLoggedIn, id, species_id, name, description } = props;
  const bgColor = useColorModeValue('white', 'gray.700');
  const toast = useToast();
  console.log("Species ID: ", species_id);
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

  // Determine the image based on species_id
  const img = speciesImages[species_id] || "https://images.pexels.com/photos/11829002/pexels-photo-11829002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Default image if no species_id is found

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
        {/* aca tengo que cambiar que hace el boton */}
          <Button
            bg="red"
            size="md"
            mt={5}
            mb={2}
            mr={2}
            fontSize="sm"
            isDisabled={!isLoggedIn} // Disable button if not logged in
            onClick={handleAdoptClick} // Show login message if not logged in
          >
            Elminiar Adopcion
          </Button>
        
      </Flex>
    </Box>
  );
}

export default function PetCard(props: PetCardProps) {
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
          species_id={props.species_id} // Pass species_id
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
          species_id={props.species_id} // Pass species_id
          img={props.img}
          name={props.name}
          description={props.description}
          isLoggedIn={isLoggedIn} // Pass login state
        />
      </Box>
    </Box>
  );
}


export function PetCardForAdopted(props: PetCardProps) {
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
        <AdoptedPetCard
          id={props.id}
          species_id={props.species_id} // Pass species_id
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
          species_id={props.species_id} // Pass species_id
          img={props.img}
          name={props.name}
          description={props.description}
          isLoggedIn={isLoggedIn} // Pass login state
        />
      </Box>
    </Box>
  );
}
