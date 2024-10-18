import StackHeader from '@/components/common/stackHeader/stackHeader';

export default async function Page() {
  return (
    <div className="container h-screen overflow-hidden">
      <StackHeader title="계정확인" />
      <div className="h-full overflow-auto">
        <iframe src="https://portal.sejong.ac.kr" title="계정확인" className="h-full w-full" />
      </div>
    </div>
  );
}
