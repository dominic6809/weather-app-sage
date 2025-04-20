/**
 * Root Layout Component
 * 
 * Defines the base HTML structure and metadata for the entire application.
 * Provides consistent styling with custom fonts and responsive design support.
 * 
 * This layout includes:
 * - Page metadata for SEO
 * - Global CSS imports
 * - Dark mode support via Tailwind classes
 * - Consistent font application
 */
import './globals.css';
import type { Metadata } from 'next';
import { inter } from './fonts';

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description: 'Professional weather application built with Next.js and Laravel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${inter.className}`}>
      <body className="h-full bg-gray-50 dark:bg-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}