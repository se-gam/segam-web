import Link from 'next/link';

export default function IntroPage() {
  return (
    <main className="bg-theme_background flex h-screen flex-col items-center justify-center">
      <h1 className="f28 mb-4 font-bold">인트로 페이지</h1>
      <Link href="/login" className="f24 rounded-md bg-theme_primary px-4 py-1.5 text-white">
        시작하기
      </Link>
    </main>
  );
}
