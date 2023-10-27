import React from 'react';
import '@/app/global.css';
import type { Metadata } from 'next';
import Footer from '@/components/footer';
import NavBarType from '@/components/navbartype';
import { Providers } from './providers';
import MapComponent from '@/components/MapComponent';

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
          <NavBarType />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
