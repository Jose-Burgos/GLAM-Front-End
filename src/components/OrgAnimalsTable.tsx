'use client';

import { Tr, Table, Tbody, Th, Thead } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import helpers from '~/supabase/helpers';

import { Animal } from '~/supabase/types/supabase.tables';
import OrgAnimalsTableRow from './OrgAnimalsTableRow';

const headers = ['Nombre', 'Edad', 'Estado', 'Fecha de Rescate'];

function OrgAnimalsTable() {
  const [animals, setData] = useState<Animal[]>();
  const [profilePics, setProfilePics] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      setData(await helpers.getOrgAnimals());
      // setProfilePics(await helpers.getImages());
    })();
  }, []);
 // console.log('Animals: ', animals);
  return (
    // <CardBody>
    <Table variant="simple">
      <Thead>
        <Tr my=".8rem" pl="0px" color="gray.400">
          {headers.map((header, idx) => {
            return (
              <Th
                color="gray.400"
                key={idx}
                // ps={idx === 0 ? '0px' : null}
              >
                {header}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {animals?.map((animal, idx) => {
          return <OrgAnimalsTableRow {...{ animal, profilePic: profilePics[idx] }} />;
        })}
      </Tbody>
    </Table>
    // </CardBody>
  );
}

export default OrgAnimalsTable;
