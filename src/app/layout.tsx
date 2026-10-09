import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Umeed Foundation | A Little Kindness Can Change a Lifetime',
  description:
    'Join Umeed Foundation to support life-saving pediatric healthcare (Little Heartbeats), holistic child education (Shikshalaya), and menstrual dignity kits (Chuppi Todo). Transparent, audited, and deeply impactful.',
  keywords: [
    'Umeed Foundation',
    'NGO donation India',
    'Little Heartbeats pediatric cardiac',
    'Shikshalaya child education',
    'Chuppi Todo menstrual hygiene',
    'child sponsorship',
    '80G tax exempt donation',
    'verified charity India',
  ],
  authors: [{ name: 'Umeed Foundation' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1B4332',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FBF9F4] text-[#141B1A] flex flex-col selection:bg-[#1B4332] selection:text-white">
        {children}
      </body>
    </html>
  );
}
