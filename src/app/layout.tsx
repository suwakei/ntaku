import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import { environments } from '@/envs';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const title = 'N択 - 迷った時の最終兵器！';
const description =
  'N択は、複数の選択肢で迷った時にランダムで一つを選んでくれるシンプルなWebアプリケーションです。';
const appUrl = environments.APP_URL;
const ogpImageUrl = `${appUrl}/ntakuLogo.png`;

export const metadata: Metadata = {
  title: title,
  description: description,
  icons: {
    icon: [
      { url: '/favicon-32x32.png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: title,
    description: description,
    url: appUrl,
    siteName: 'N択',
    type: 'website',
    locale: 'ja_JP',
    images: [
      {
        url: ogpImageUrl,
        width: 1200,
        height: 630,
        alt: 'N択ロゴ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [ogpImageUrl],
  },
  verification: {
    google: 'bA0o3IYoE_Sm6muszCH2sbfAANPg24YSzrVsM6uCXko',
  },
  other: {
    'google-adsense-account': 'ca-pub-4570855025616504',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
