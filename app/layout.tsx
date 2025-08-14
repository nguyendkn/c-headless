import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'C-Headless CMS - Next Generation Headless CMS with AI Integration',
  description:
    'Advanced content management platform with integrated AI, intuitive template builder and unlimited customization capabilities for modern applications.',
  keywords: [
    'headless cms',
    'ai cms',
    'template builder',
    'next.js',
    'react',
    'typescript',
    'content management',
  ],
  authors: [{ name: 'C-Headless Team' }],
  creator: 'C-Headless CMS',
  publisher: 'C-Headless CMS',
  openGraph: {
    title: 'C-Headless CMS - Next Generation Headless CMS',
    description:
      'Advanced content management platform with integrated AI, intuitive template builder and unlimited customization capabilities.',
    type: 'website',
    locale: 'en_US',
    siteName: 'C-Headless CMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C-Headless CMS - Next Generation Headless CMS',
    description:
      'Advanced content management platform with integrated AI and intuitive template builder.',
    creator: '@cheadlesscms',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
