import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/app/global.css';

const pretendard = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
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
    <html lang="ko">
      <body className={`container mx-auto h-dvh ${pretendard.className}`}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
