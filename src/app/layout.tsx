import React from 'react';
import '@/app/global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';
import NavBarType from '@/components/navbartype';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GLAM',
  description: 'Grupo Latinoamericano de ayuda a mascotas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarType />
        {children}
        <Footer />
      </body>
    </html>
  );
}
