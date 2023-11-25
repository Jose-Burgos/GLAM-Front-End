'use client';

import { useEffect, useState } from 'react';
import 'react-dom';
import { Animal, Request } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import AnimalCard from '@/components/animalCard';
import DonationHistory from '@/components/donations';
import NotificationsHistory from '@/components/notifications';
import { Flex } from '@chakra-ui/react';
import AdminSidebar from '@/components/adminSidebar';

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
  return <h1>Soon</h1>;
}

/*
      {data?.filter(animal => adopctions?.filter(request => animal.id === request.animal_id )).map((animal) => (
      <AnimalCard key={animal.id} {...animal} />))}
*/
