import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  CardBody,
  CardHeader,
 Card } from '@chakra-ui/react';
import React from 'react';

export default function NotificationsHistory(props: any) {
  return (
    <Card
      width={props.width}
      marginBottom={400}
      marginTop={10}
      backgroundColor="orange.100"
    >
      <CardHeader fontSize="2xl">Historial de notificaciones</CardHeader>
      <CardBody>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Nueva mascota disponible
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Hemos encontrado una mascota que puede interesarte. Se adapata a
              tu preferencias de raza y tamaño.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Tu transacción ha sido aprobada
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              La transacción que realizaste el 10/10/2021 ha sido aprobada. El
              monto de $1000 ha sido transferido a la organización Patitas Glew.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}
