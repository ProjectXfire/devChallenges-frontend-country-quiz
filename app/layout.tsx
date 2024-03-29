import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
// Components
import { Background } from './shared/components';

const vietnam = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['500', '900', '100', '300']
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={vietnam.className}>
        <Background />
        {children}
      </body>
    </html>
  );
}
