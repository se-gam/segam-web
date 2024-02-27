import Icons from '@/components/common/icons/icons';
import MenuList from '@/components/mypage/menuList';
import { getUserInfo } from '@/lib/actions/user';

function getUserProfileImageName(studentId: string) {
  const prefixNumber = Number(studentId.slice(0, 2));
  switch (prefixNumber) {
    case 24:
      return 'grandMother';
    case 23:
      return 'grandMother';
    case 22:
      return 'grandMother';
    case 21:
      return 'grandMother';
    default:
      return 'grandMother';
  }
}

export default async function MyPage() {
  const userInfo = await getUserInfo();
  const profileName = getUserProfileImageName(userInfo.studentId);
  return (
    <main className="page overflow-auto bg-app_bg">
      <header className="mb-4.5 px-4 py-2.5">
        <h1 className="f20 font-bold text-text_primary">내 정보</h1>
      </header>
      <section className="mb-3.5 flex w-full flex-col items-center justify-center">
        <div className="mb-3 h-24 w-24 rounded-full bg-white p-5">
          <Icons.ImageIcon name={profileName} width={56} height={56} />
        </div>
        <h2 className="f20 font-bold text-text_primary">{userInfo.name}</h2>
        <p className="f16 font-medium text-text_secondary">{userInfo.departmentName}</p>
      </section>
      <MenuList />
    </main>
  );
}
