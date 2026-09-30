import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Phone (4a) Pro — Nothing',
  description:
    'Nothing Phone (4a) Pro — 140× ultra zoom, 3-camera system, 6.83” 144 Hz AMOLED, Snapdragon 7 Gen 4 and Nothing OS 4.1.',
  openGraph: {
    title: 'Phone (4a) Pro — Nothing',
    description: 'Built different. 140× ultra zoom. Metal. 144 Hz AMOLED. Nothing OS 4.1.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
