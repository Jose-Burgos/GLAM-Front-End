import React from 'react';

import { Flex, HStack, Text } from '@chakra-ui/react';
import OrgDashboardSidebar from '@/components/OrgDashboardSidebar';

export default function UserDashboard() {
  return (
    <Flex p={8} flexDirection="column" justifyContent="center">
      <HStack>
        {/* <Flex mt={{ lg: '-50%', xl: '-30%' }}> */}
        <OrgDashboardSidebar />
        {/* </Flex> */}
        <Flex
          direction="column"
          w="100%"
          h="100%"
          mb={8}
          px={{ base: 4, md: 8 }}
          pt={{ base: '120px', md: '14%', lg: '12%' }}
        >
          <Text>Dashboard</Text>
        </Flex>
      </HStack>
    </Flex>
  );
}
