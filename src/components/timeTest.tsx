'use client';

export default function TimeTest() {
  const now = new Date();
  const todayLabel = now.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });

  return (
    <p>
      클라이언트 컴포넌트 : {todayLabel} {now.getTime()}
    </p>
  );
}
