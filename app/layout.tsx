import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Shauryawada — Cinematic Luxury Resorts',
  description: 'A new era of immersive luxury hospitality. Explore Shauryawada resorts in 3D and book your escape.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#0a0a0c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
