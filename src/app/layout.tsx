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
    <html lang="en" className="bg-red-600">
      <body className="bg-red-600 min-h-screen">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
} 