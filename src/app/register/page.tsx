'use client';

import React from 'react';
import {
  Box,
  Center,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react';
import theme from '@/theme';
import UserRegisterFrom from '@/components/userregisterform';
import OngRegisterFrom from '@/components/ongregisterform';

export default function NewAccLanding() {
  return (
    <Center>
      <Box
        bg="bgcard"
        boxShadow="2xl"
        borderRadius="3xl"
        mt="10%"
        mb="10%"
        p={10}
      >
        <Text align="center" color="black" fontSize="3xl" mt={-6} mb={4}>
          Crear una nueva cuenta.
        </Text>
        <Tabs variant="soft-rounded" colorScheme="brand" align="center" mb={4}>
          <TabList>
            <Tab bg={theme.colors.accent} shadow="xl" mr={8}>
              Usuario
            </Tab>
            <Tab bg={theme.colors.accent} shadow="xl">
              Organización
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserRegisterFrom />
            </TabPanel>
            <TabPanel>
              <OngRegisterFrom />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}
