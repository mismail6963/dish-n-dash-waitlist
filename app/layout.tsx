import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dish N Dash — Founders Club',
  description:
    'Join the exclusive Founders Club for Dish N Dash, the AI-powered dining platform redefining how Saudi Arabia dines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-manrope bg-forest-900 text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
