'use client';

import { NotionRenderer } from 'react-notion-x';

export default function NotionPage({ recordMap }: any) {
  return <NotionRenderer recordMap={recordMap} darkMode={false} />;
}
