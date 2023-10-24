'use client';

import React, { useEffect, useState } from 'react';
import HelperFunctions from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import './patitas.css';
import TableComponent from '@/components/table';
import NotificationsHistory from '@/components/notifications';
import DonationHistory from '@/components/donations';
import { Flex } from '@chakra-ui/react';

export default function PatitasGlew() {
  const [userID, setUserID] = useState<string>();
  const [isOrg, setIsOrg] = useState(false);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [userName, setUserName] = useState();
  const dataService = HelperFunctions;

  useEffect(() => {
    (async () => {
      // Get user info
      const { user } = await dataService.getCurrentUser();
      setUserID(user?.id);
      setUserName(user?.user_metadata.name);
      const { profile, type } = await dataService.getCurrentUser();
      if (type === 'Organization') {
        setIsOrg(true);
      }
      setAnimals(animals);
      // fetching data
      try {
        const animalsArray = await dataService.getAnimals();
        setAnimals(animalsArray);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    })();
  }, [userID, dataService, animals]);

  return (
    <div className="container">
      <ul>
        {isOrg ? (
          /*
          <div className="pet-card">
            <h2>Estos son sus animales</h2>
            {animals?.map(
              (animal) =>
                animal.org_id === userID && (
                  <li key={animal.id} className="listItem">
                    {animal.name}
                  </li>
                )
            )}
          </div>
          */
         <div className="pet-card">
          <Flex columnGap={10}>
          <TableComponent animals={animals} org_id={userID!} />
          <Flex columnGap={10}>
            <DonationHistory width="600"></DonationHistory>
            <NotificationsHistory width="600"></NotificationsHistory>
          </Flex>
          </Flex>
         </div>
        ) : (
          <h1>No eres una Organizacion</h1>
        )}
      </ul>
    </div>
  );
}

/*
<a href="/ong/auth/addAnimal">
        <span style={{ color: 'black' }}>Agregar Animal</span>
      </a>
      <a href="/ong/auth/deleteAnimal">
        <span style={{ color: 'black' }}>Eliminar Animal</span>
      </a>
      <a href="/ong/auth/editAnimal">
        <span style={{ color: 'black' }}>Editar Animal</span>
      </a>
*/