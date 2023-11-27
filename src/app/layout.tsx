import React from 'react';
import '@/app/global.css';
import type { Metadata } from 'next';
import Footer from '@/components/footer';
import { Providers } from './providers';
import { AuthProvider } from '@/hooks/authContext';
import NavBar from '@/components/navbar';
import { Flex } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: 'GLAM',
  description: 'Grupo Latinoamericano de ayuda a mascotas',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <NavBar />
            <Flex pos="relative" direction="column" h="auto">
            {children}
            </Flex>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
