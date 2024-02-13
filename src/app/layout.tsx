import React from 'react';
import type { Metadata, Viewport } from 'next';
import '@/app/global.css';
import localFont from 'next/font/local';
import cn from '@/utils/cn';

const pretendard = localFont({
  src: '../../public/PretendardVariable.woff2',
});
// 줌 방지 코드
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export const metadata: Metadata = {
  title: 'se-gam',
  description: 'se-gam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(pretendard.className, 'container mx-auto h-dvh')}>
        {children}
      </body>
    </html>
  );
}
