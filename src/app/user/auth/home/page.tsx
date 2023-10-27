'use client';

import { useEffect, useState } from 'react';
import 'react-dom';
import { Animal } from '~/supabase/types/supabase.tables';
import { Request } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import AnimalCard from '@/components/animalCard';
import DonationHistory from '@/components/donations';
import NotificationsHistory from '@/components/notifications';
import { Flex } from '@chakra-ui/react';

export default function animalInfo() {
  const [data, setData] = useState<Animal[]>();
  // const [userID, setUserID] = useState<string>();
  // const [requests, setRequests] = useState<Request[]>();
  useEffect(() => {
    (async () => {
      const aux = await supabase.getAnimals();
      // const request = await supabase.getUserAdoptionRequests();
      // const user  = await supabase.getCurrentUser();
      setData(aux);
      // setUserID(user?.profile.public.id);
      // setRequests(request);
    })();
  }, []);

  // getUserAdoptionRequests te devuelve solo las requests del usuario...
  // const adopctions = requests?.filter(request => request.user_id === userID);
  return (
    <div>
      <Flex>
        {data
          ?.filter((animal) => animal.adopted === true)
          .map((animal) => <AnimalCard key={animal.id} {...animal} />)}
        <Flex columnGap={10}>
          <DonationHistory width="600"></DonationHistory>
          <NotificationsHistory width="600"></NotificationsHistory>
        </Flex>
      </Flex>
    </div>
  );
}

/*
      {data?.filter(animal => adopctions?.filter(request => animal.id === request.animal_id )).map((animal) => (
      <AnimalCard key={animal.id} {...animal} />))}
*/
