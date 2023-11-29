'use client';

import { Flex, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Animal } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import AnimalForm from '@/components/animalform';
import './editAnimal.css';
import OrgDashboardSidebar from '@/components/OrgDashboardSidebar';

interface Params {
  params: {
    id: string;
  };
}

export default function EditAnimal({ params }: Params) {
  const [animal, setSelectedAnimal] = useState<Animal>();

  useEffect(() => {}, []);
  useEffect(() => {
    (async () => {
      setSelectedAnimal(await supabase.getAnimalById(params.id));
    })();
  }, []);

  return (
    <Flex p={8} flexDirection="column" justifyContent="center">
      <HStack>
        <Flex mt={{ lg: '-50%', xl: '-30%' }}>
          <OrgDashboardSidebar />
        </Flex>
        <Flex
          direction="column"
          w="100%"
          mb={8}
          px={{ base: 4, md: 8 }}
          pt={{ base: '120px', md: '14%', lg: '12%' }}
        >
          {animal && <AnimalForm animal={animal} submitBtnText="Editar Animal" /> }
        </Flex>
      </HStack>
    </Flex>
  );
}
