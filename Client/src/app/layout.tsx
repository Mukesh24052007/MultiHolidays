import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MultiHolidays',
  description: 'Manage your leave effortlessly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className="antialiased text-gray-900 bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
