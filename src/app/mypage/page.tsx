import Icons from '@/components/common/icons/icons';

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
    link: 'logout',
  },
  {
    label: '회원 탈퇴',
    link: 'withdrawal',
  },
];
export default function MyPage() {
  return (
    <main className="container h-full overflow-auto bg-white">
      <header className="mb-4.5 px-4 py-2.5">
        <h1 className="f20 font-bold text-text_primary">이러닝</h1>
      </header>
      <section className="mb-3.5 flex w-full flex-col items-center justify-center">
        <div className="mb-3 h-24 w-24 rounded-full bg-app_bg p-5">
          <Icons.ImageIcon name="grandMother" width={56} height={56} />
        </div>
        <h2 className="f20 font-bold text-text_primary">바이너리형</h2>
        <p className="f16 font-medium text-text_secondary">컴퓨터 공학과</p>
      </section>
      <section className="mb-3.5">
        <h1 className="f20 mb-2 px-4 font-bold text-text_primary">설정</h1>
        <div className="space-y-1 px-4">
          {settings.map((setting) => (
            <button
              key={setting.label}
              type="button"
              className="flex w-full items-center justify-between rounded bg-white px-2 py-4 transition-transform active:scale-[0.98] active:bg-gray-300"
            >
              <span className="f16 font-medium text-text_primary ">{setting.label}</span>
              <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
            </button>
          ))}
        </div>
      </section>
      <section>
        <div className="space-y-1 px-4">
          {auth.map((fn) => (
            <button
              key={fn.label}
              type="button"
              className="flex w-full items-center justify-between rounded bg-white px-2 py-4 transition-transform active:scale-[0.98] active:bg-gray-300"
            >
              <span className="f16 font-medium text-text_primary">{fn.label}</span>
              <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
