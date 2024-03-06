import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/app/global.css';
import clsx from 'clsx';
import 'react-notion-x/src/styles.css';

const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

// 줌 방지 코드
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
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
    <html lang="ko">
      <body
        className={clsx(
          pretendard.variable,
          'container mx-auto h-screen overflow-hidden font-sans',
        )}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
