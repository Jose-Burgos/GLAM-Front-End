'use client';

import React , { useState }from 'react';
import {
  Stack,
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  useColorModeValue,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link'; 
import Image from 'next/image';
import { VisitOngLogo } from '@/assets/icons/icons';
import supabase from '~/supabase/helpers';

interface OngData {
  id?: string;
  img: string;
  name: string;
  description?: string | null;
}

function MobileOngCard(props: OngData) {
  const bgColor = useColorModeValue('white', 'gray.700');
  return (
    <Box me="-1%" w="85vw" shadow="xl" bg={bgColor} borderRadius="15px">
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
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </Box>
          <Box ml={2} mt={2}>
            <Stack direction={['column', 'column', 'column', 'column']}>
              <Text>{props.name}</Text>
              <Text>{props.description}</Text>
            </Stack>
          </Box>
        </Stack>
        <Spacer />
        <Stack>
          <Spacer />
          <Link href={`/ong/${props.id}`}>
            <Button bg="teal.300" size="md" mr={2} mb={2}>
              <VisitOngLogo w="35px" h="35px" />
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}

function DesktopOngCard(props: OngData) {
  const bgColor = useColorModeValue('white', 'gray.700');
  const toast = useToast();
  const [session,setSession] = useState<string | null >('')
  const [donationAmount, setDonationAmount] = useState('');
  const { onOpen, onClose, isOpen } = useDisclosure()
  const handleAmountButtonClick = (amount:any) => {
    setDonationAmount(amount.toString());
  };
  async function getUser(){
    const sessions = await supabase.getCurrentUserId();
    setSession(sessions)
  }
  async function handleDonation (option: string) {
    await getUser()
    if (!session){
      toast({
        title: 'Acceso Denegado',
        description: 'Necesitas iniciar sesión para poder hacer donaciones en especie',
        status: 'error',
        duration: 5000,
        position: 'top-left',
      }); 
    }
    else{
      switch (option) {
          case 'especie':
          
              // Redirige a la página de donación en especie
              window.location.href = '/donations/inKindDonation';
              break;
          case 'monetaria':
            // Redirige a la página de donación monetaria
            window.location.href = '/donations/monetaryDonation';
            break;
          default:
            // Manejo por defecto, puede ser redirigir a una página de error, por ejemplo
            break;
      }
    }
  };


  return (
    <Box shadow="xl" borderRadius="15px" bg={bgColor}>
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
        <Link href={`/ong/${props.id}`}>
          <Button bg="teal.300" size="md" mt={5} mb={2} mr={2} fontSize="sm">
            Visitar
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default function OngCard(props: OngData) {

  return (
    <Box borderRadius="15px">
      <Box
        borderRadius="15px"
        display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
      >
        <DesktopOngCard
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
        <MobileOngCard
          id={props.id}
          img={props.img}
          name={props.name}
          description={props.description}
        />
      </Box>
    </Box>
  );
}
