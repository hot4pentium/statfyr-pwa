import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Statfyr Coach',
  description: 'The Coach & Team Hub',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Statfyr',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ea580c" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}