import NavBar from '@/components/navbar';
import { AuthProvider } from '@/hooks/authContext';
import { Flex } from '@chakra-ui/react';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <NavBar />
      <Flex pos="relative" direction="column" h="auto">
        {children}
      </Flex>
    </AuthProvider>
  );
}
