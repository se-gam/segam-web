'use client';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const reset = () => {
    window.location.reload();
  };
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">{error.digest}</h2>
      <h2 className="text-center">{error.message}</h2>
      <h2 className="text-center">서버 오류가 발생했습니다.</h2>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        다시 시도하기
      </button>
    </main>
  );
}
