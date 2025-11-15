import { Geist, Geist_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import IndexHeader from '@/components/Header/Index/IndexHeader';
import React from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

export const metadata = {
  title: 'FishEye',
  description: 'Portfolio de photographes',
};

export default function RootLayout(
  {
     children, 
     modal 
    } : {
      readonly children : React.ReactNode,
      readonly modal: React.ReactNode
    }
  ) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable}`}>
        <IndexHeader />
        {children}
        <div id="modal-root">        
          {modal}
        </div>
      </body>
    </html>
  );
}
