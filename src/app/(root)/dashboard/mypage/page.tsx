import Icons from '@/components/common/icons/icons';
import MenuList from '@/components/mypage/menuList';

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
      <MenuList />
    </main>
  );
}
