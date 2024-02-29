import Icons from '@/components/common/icons/icons';
import MenuList from '@/components/mypage/menuList';
import { getUserInfo } from '@/lib/actions/user';

function getUserProfileImageName(studentId: string) {
  const prefixNumber = Number(studentId.slice(0, 2));
  switch (prefixNumber) {
    case 24:
      return 'baby';
    case 23:
      return 'child';
    case 22:
      return 'father';
    default:
      return 'grandMother';
  }
}

export default async function MyPage() {
  const userInfo = await getUserInfo();
  const profileName = getUserProfileImageName(userInfo.studentId);
  return (
    <main className="page overflow-auto bg-app_bg">
      <div className="bg-white pb-6">
        <header className="mb-[1.125rem]  px-4 py-2.5">
          <h1 className="f20 font-bold text-text_primary">내 정보</h1>
        </header>
        <section className="flex w-full flex-col items-center justify-center">
          <div className="mb-3 rounded-full bg-app_bg p-5">
            <Icons.ImageIcon name={profileName} width={56} height={56} />
          </div>
          <h2 className="f20 font-bold text-text_primary">{userInfo.name}</h2>
          <p className="f16 font-medium text-text_secondary">{userInfo.departmentName}</p>
        </section>
      </div>
      <MenuList />
    </main>
  );
}
