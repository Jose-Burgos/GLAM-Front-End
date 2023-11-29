import React from 'react';

import { Flex, HStack } from '@chakra-ui/react';
import OrgDashboardSidebar from '@/components/OrgDashboardSidebar';
import OrgAnimalsTable from '@/components/OrgAnimalsTable';

export default function UserDashboard() {
  return (
    <Flex p={8} flexDirection="column" justifyContent="center">
      <HStack>
        <Flex mt={{ lg: '-50%', xl: '-30%' }}>
          <OrgDashboardSidebar />
        </Flex>
        <Flex
          direction="column"
          w="100%"
          mb={8}
          px={{ base: 4, md: 8 }}
          pt={{ base: '120px', md: '14%', lg: '12%' }}
        >
          <OrgAnimalsTable />
        </Flex>
      </HStack>
    </Flex>
  );
}
