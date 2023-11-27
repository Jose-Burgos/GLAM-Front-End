
import {
  Table,
  Thead,
  useToast,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { Animal } from '~/supabase/types/supabase.tables';
import NextLink from 'next/link';
import AnimalForm from '@/components/animalform';
import supabase from '~/supabase/helpers';

// Define interfaces for component props
interface TableProps {
  animals: Animal[];
  org_id: string;
}

interface OpenStates {
  [key: string]: boolean;
}

// Define AnimalTable component
export default function AnimalTable(props: TableProps) {
  // State for tracking open states of the AlertDialogs
  const [openStates, setOpenStates] = useState<OpenStates>({});
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const toast = useToast();

  // Function to delete an animal
  const deleteAnimal = (id: String) => {
    // Show a loading toast
    const toastId = toast({
      title: 'Eliminando Animal',
      description: 'Por favor espere',
      status: 'info',
      duration: 1000,
      isClosable: false,
      position: 'top-left',
    });

    try {
      // Attempt to delete the animal
      supabase.deleteAnimal(id);
    } catch (error) {
      // Show an error toast if the operation fails
      toast({
        title: 'Operación no realizada',
        description: 'Algo salió mal',
        status: 'error',
        duration: 2000,
        position: 'top-left',
      });

      // Perform additional actions after the operation fails
      console.error('Error:', error);
    } finally {
      // Show a success toast when the operation is completed
      toast({
        title: 'Operación exitosa',
        description: 'Animal eliminado correctamente',
        status: 'success',
        duration: 2000,
        position: 'top-left',
      });

      // Redirect to the desired page
      window.location.href = `/ong/auth/home`;
      toast.close(toastId);
    }
  };

  // Function to edit an animal
  const editAnimal = (id: String) => {
    // Log the animal ID and redirect to the editAnimal page
    console.log(id);
    window.location.href = `/ong/auth/editAnimal?id=${id}`;
  };

  return (
    <Card
      marginTop={10}
      marginBottom={10}
      width={600}
      backgroundColor="orange.100"
      maxW="xl"
      position="relative"
    >
      <CardHeader>Animales</CardHeader>
      <TableContainer>
        <Table variant="striped" colorScheme="orange.200">
          <Thead>
            <Tr rounded="sm">
              <Td>Nombre</Td>
              <Td>Edad</Td>
              <Td>Vacunado</Td>
              <Td />
            </Tr>
          </Thead>
          <Tbody>
            {props.animals.map((animal) => (
              <Tr rounded="sm" key={animal.id}>
                <Td>{animal.name}</Td>
                <Td>{animal.age}</Td>
                <Td>{animal.vaccinated ? 'Si' : 'No'}</Td>
                <Td>
                  <Menu>
                    {({ isOpen: isMenuOpen }) => (
                      <>
                        <MenuButton
                          isActive={isMenuOpen}
                          as={Button}
                          rightIcon={<HamburgerIcon />}
                          colorScheme="orange.200"
                          color="black"
                          aria-label="Mas Opciones"
                          size="sm"
                         />
                        <MenuList>
                          <MenuItem onClick={() => editAnimal(animal.id)}>Editar</MenuItem>
                          <MenuItem onClick={() => { setOpenStates({ ...openStates, [animal.id]: true }); }}>Eliminar</MenuItem>
                          <AlertDialog
                            isOpen={openStates[animal.id] || false}
                            leastDestructiveRef={cancelRef}
                            onClose={() => { setOpenStates({ ...openStates, [animal.id]: false }); }}
                          >
                            <AlertDialogOverlay>
                              <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                  Eliminar Animal
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                  Estas seguro que quieres eliminar este animal? No lo podrás recuperar después.
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                  <Button ref={cancelRef} onClick={() => { setOpenStates({ ...openStates, [animal.id]: false }); }}>
                                    Cancelar
                                  </Button>
                                  <Button colorScheme='red' onClick={() => deleteAnimal(animal.id)} ml={3}>
                                    Eliminar
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialogOverlay>
                          </AlertDialog>
                        </MenuList>
                      </>
                    )}
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Link href="/ong/auth/addAnimal">
          <IconButton
            marginLeft={10}
            marginTop={10}
            position="absolute"
            left={500}
            top={520}
            colorScheme="red"
            aria-label="Search database"
            size="lg"
            icon={<AddIcon />}
          />
        </Link>
      </TableContainer>
    </Card>
  );
}
