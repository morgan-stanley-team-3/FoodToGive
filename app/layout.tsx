import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from './provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodToGive',
  description: 'CRM Platform to help donors connect with beneficiaries',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
