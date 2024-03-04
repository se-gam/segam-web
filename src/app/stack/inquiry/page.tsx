import StackHeader from '@/components/common/stackHeader/stackHeader';

const KAKAO_URL = process.env.NEXT_PUBLIC_KAKAO_URL;

export default async function Page() {
  return (
    <div className="container h-screen overflow-hidden">
      <StackHeader title="앱 사용 문의" />
      <div className="h-full overflow-auto">
        <iframe src={KAKAO_URL as string} title="문의사항" className="h-full w-full" />
      </div>
    </div>
  );
}
