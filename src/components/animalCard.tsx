import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Image,
  Divider,
  Heading,
  Stack,
  Text,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import React from 'react';
import { Animal } from '~/supabase/types/supabase.tables';

export default function AnimalCard(props: Animal) {
  // Create a mapping of species_id to image URLs
  const speciesImages: { [key: number]: string } = {
    1: "https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg", // Imagen de un perro
    2: "https://images.pexels.com/photos/144240/goat-lamb-little-grass-144240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Cabra"
    3: "https://images.pexels.com/photos/3652958/pexels-photo-3652958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Tortuga"
    4: "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Caballo"
    5: "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Pez"
    6: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Imagen de "Gato"
  };

  // Get the image URL based on the species_id
  const animalImage = speciesImages[props.species_id] || "https://default-image-url.com"; // Default 

  return (
    <Grid marginRight={20} gap={4}>
      <Card
        maxW="sm"
        marginBottom={20}
        marginTop={10}
        backgroundColor="orange.100"
      >
        <CardHeader fontSize="2xl">Mis adopciones</CardHeader>
        <CardBody>
          <Image
            src={animalImage}
            alt={props.name}
            borderRadius="lg"
            display={{ base: 'block', md: 'block' }}
            w={{ base: 'auto', md: 'auto' }}
          />
          <Stack mt="6" spacing="3">
            <Text size="md">Nombre: {props.name}</Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button isDisabled variant="solid" colorScheme="blue">
              Ver más
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Grid>
  );
}
