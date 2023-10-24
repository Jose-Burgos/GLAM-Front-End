import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, CardBody, CardHeader, List, ListItem } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";

export default function DonationHistory(props:any){
    return(
    <Card width={props.width} marginBottom={400} marginTop={10} backgroundColor={'orange.100'}>
        <CardHeader fontSize="2xl">Historial de donaciones</CardHeader>
        <CardBody>
        <Accordion allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        <text>Donacion a Organizacion Patitas Glew</text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        <List>
            <ListItem>CBU destino:1548624586241250002569</ListItem>
            <ListItem>Fecha: 10/10/2021</ListItem>
            <ListItem>Monto: $1000</ListItem>
            <ListItem>Estado: Aprobada</ListItem>
        </List>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        <text>Donacion a Organizacion Patitas Glew</text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        <List>
            <ListItem>CBU destino:1548745960021050002569</ListItem>
            <ListItem>Fecha: 10/10/2023</ListItem>
            <ListItem>Monto: $5000</ListItem>
            <ListItem>Estado: Rechazada</ListItem>
        </List>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
        </CardBody>
    </Card>
    );
}