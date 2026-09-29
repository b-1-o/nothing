import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Phone (4a) Pro — Nothing',
  description:
    'Nothing Phone (4a) Pro. World’s first 140× ultra zoom. Metal unibody, Pro 3 camera system, 144 Hz AMOLED, Nothing OS 4.1.',
  openGraph: {
    title: 'Phone (4a) Pro — Nothing',
    description: 'Built different. 140× ultra zoom. Metal. Pro camera system.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
