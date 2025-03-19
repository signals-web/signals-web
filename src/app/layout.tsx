import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Signals Web',
  description: 'A web application for Signals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 