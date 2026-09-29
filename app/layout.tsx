import './globals.css';

export const metadata = {
  title: 'Phone (4a) Pro — Nothing',
  description: 'Phone (4a) Pro. Built different.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
