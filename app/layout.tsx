import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Tic-Tac-Toe',
  description: 'Play movie tic-tac-toe with your friends',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#010001] text-[#fbe9cb]`}
      >
        {children}
      </body>
    </html>
  );
}
