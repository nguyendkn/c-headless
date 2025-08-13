import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'C-Headless CMS - Headless CMS thế hệ mới với AI tích hợp',
  description:
    'Nền tảng quản lý nội dung tiên tiến với AI tích hợp, template builder trực quan và khả năng tùy chỉnh không giới hạn cho ứng dụng hiện đại.',
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
    title: 'C-Headless CMS - Headless CMS thế hệ mới',
    description:
      'Nền tảng quản lý nội dung tiên tiến với AI tích hợp, template builder trực quan và khả năng tùy chỉnh không giới hạn.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'C-Headless CMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C-Headless CMS - Headless CMS thế hệ mới',
    description:
      'Nền tảng quản lý nội dung tiên tiến với AI tích hợp và template builder trực quan.',
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
    <html lang='vi'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
