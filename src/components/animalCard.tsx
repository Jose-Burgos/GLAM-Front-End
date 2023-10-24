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
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { px } from 'framer-motion';
import { Animal } from '~/supabase/types/supabase.tables';

export default function AnimalCard(props: Animal) {
  return (
    <Grid
      marginRight={20}
      gap={4}
    >
      <Card maxW="sm" marginBottom={20} marginTop={10} backgroundColor={'orange.100'}>
        <CardHeader fontSize="2xl">Mis adopciones</CardHeader>
        <CardBody>
          <Image
            src="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            display={{ base: 'block', md: 'block' }} 
            w={{ base: 'auto', md: 'auto' }} 
          />
          <Stack mt="6" spacing="3">
            <Text size="md" >
              Nombre: {props.name}
            </Text>
            <Text >Estado de la adopción: Revisando solicitud {props.adopted}</Text>
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

