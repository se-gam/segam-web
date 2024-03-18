import StackHeader from '@/components/common/stackHeader/stackHeader';

const PRIVACY_URL = process.env.NEXT_PUBLIC_PRIVACY_URL;

export default async function Page() {
  return (
    <div className="container h-screen overflow-hidden">
      <StackHeader title="개인정보보호 정책" />
      <div className="h-full overflow-auto">
        <iframe src={PRIVACY_URL as string} title="문의사항" className="h-full w-full" />
      </div>
    </div>
  );
}
