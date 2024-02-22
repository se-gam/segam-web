import Icons from '@/components/common/icons/icons';
import Link from 'next/link';

const settings = [
  {
    label: '친구 관리',
    link: 'account',
  },
  {
    label: '알림 설정',
    link: 'notification',
  },
  {
    label: '앱 설정',
    link: 'app',
  },
  {
    label: 'FAQ',
    link: 'faq',
  },
];
const auth = [
  {
    label: '로그아웃',
    link: '/logout',
  },
  {
    label: '회원 탈퇴',
    link: 'withdrawal',
  },
];
export default function MyPage() {
  return (
    <main className="page overflow-auto bg-app_bg">
      <header className="mb-4.5 px-4 py-2.5">
        <h1 className="f20 font-bold text-text_primary">내 정보</h1>
      </header>
      <section className="mb-3.5 flex w-full flex-col items-center justify-center">
        <div className="mb-3 h-24 w-24 rounded-full bg-app_bg p-5">
          <Icons.ImageIcon name="grandMother" width={56} height={56} />
        </div>
        <h2 className="f20 font-bold text-text_primary">바이너리형</h2>
        <p className="f16 font-medium text-text_secondary">컴퓨터 공학과</p>
      </section>
      <div className="h-2.5 w-full bg-app_bg" />
      <h1 className="f20 mb-2 px-4 font-bold text-text_primary">설정</h1>
      <section className="bg-white py-2">
        <div className="space-y-1 px-2">
          {settings.map((setting) => (
            <Link
              key={setting.label}
              type="button"
              className="flex w-full items-center justify-between rounded bg-white px-2 py-4 transition-transform active:scale-[0.98] active:bg-app_bg"
              href="/dashboard/mypage"
            >
              <span className="f16 font-medium text-text_primary ">{setting.label}</span>
              <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
            </Link>
          ))}
        </div>
      </section>
      <div className="h-2.5 w-full bg-app_bg" />
      <section>
        <div className="space-y-1 bg-white px-2 py-2">
          {auth.map((fn) => (
            <Link
              key={fn.label}
              type="submit"
              className="flex w-full items-center justify-between rounded bg-white px-2 py-4 transition-transform active:scale-[0.98] active:bg-app_bg"
              href={fn.link}
            >
              <span className="f16 font-medium text-text_primary">{fn.label}</span>
              <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
