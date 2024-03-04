import StackHeader from '@/components/common/stackHeader/stackHeader';
import NotionPage from '@/components/notion/notionPage';
import { NotionAPI } from 'notion-client';
import 'react-notion-x/src/styles.css';

const NOTION_URL = process.env.NEXT_PUBLIC_NOTION_URL;

const notion = new NotionAPI();
export default async function Page() {
  const recordMap = await notion.getPage(NOTION_URL as string);
  return (
    <div className="container h-full overflow-hidden">
      <StackHeader title="FAQ" />
      <div className="h-full overflow-auto">
        <NotionPage recordMap={recordMap} />
      </div>
    </div>
  );
}
