import StackHeader from '@/components/common/stackHeader/stackHeader';

export default async function AddAssignmentPage() {
  return (
    <div className="safe-area-bottom flex h-screen flex-col overflow-hidden bg-white">
      <StackHeader title="과제 추가하기" />
      <main className="flex h-full flex-col overflow-hidden bg-white px-4 py-2.5">
        과제 추가 입력 폼 위치
      </main>
    </div>
  );
}
