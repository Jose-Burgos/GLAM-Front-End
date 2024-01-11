import { Flex, CircularProgress } from '@chakra-ui/react';
import React from 'react';

export default function LoadingSpinner() {
  return (
    <Flex
      h="50vh"
      position="relative"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress isIndeterminate color="teal.300" />
    </Flex>
  );
}
