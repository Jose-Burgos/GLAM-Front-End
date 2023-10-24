import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,Card, TagCloseButton, CardHeader } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import React from 'react';
import { Animal } from '~/supabase/types/supabase.tables';
import Link from 'next/link';

interface TableProps {
  animals : Animal[];
  org_id : string;
}


export default function TableComponent (props: TableProps) {
  return(
    <Card marginTop={10} marginBottom={10} width={600} backgroundColor={'orange.100'} maxW="xl" position="relative">
      <CardHeader>Animales</CardHeader>
    <TableContainer>
      <Table variant='striped' colorScheme='orange.200'>
        <Thead>
          <Tr rounded={"sm"}>
            <Td>Nombre</Td>
            <Td>Edad</Td>
            <Td> Vacunado</Td>
          </Tr>
        </Thead>
        <Tbody>
          {props.animals.map((animal) => (
            <Tr rounded={"sm"}>
              <Td>{animal.name}</Td>
              <Td>{animal.age}</Td>
              <Td>{animal.vaccinated ? 'Vacunado' : 'No vacunado'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link href={`/ong/auth/addAnimal`}>
      <IconButton  isDisabled marginLeft={10} marginTop={10} position="absolute" left={500} top={520}
        colorScheme='red'
        aria-label='Search database'
        size='lg'
        icon={<AddIcon />}
      />
      </Link>
    </TableContainer>
  </Card>
  
    );
}