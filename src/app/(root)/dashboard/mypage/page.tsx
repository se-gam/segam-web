import Icons from '@/components/common/icons/icons';
import MenuList from '@/components/mypage/menuList';
import { getUserInfo } from '@/lib/actions/user';

function getUserProfileImageName(studentId: string) {
  const prefixNumber = Number(studentId.slice(0, 2));
  const currentYear = Number(
    new Date().toLocaleDateString('ko-KR', { year: '2-digit', timeZone: 'Asia/Seoul' }),
  );
  switch (prefixNumber) {
    case currentYear:
      return 'baby';
    case currentYear - 1:
      return 'child';
    case currentYear - 2:
      return 'father';
    default:
      return 'grandMother';
  }
}

export default async function MyPage() {
  const userInfo = await getUserInfo();
  const profileName = getUserProfileImageName(userInfo.studentId);
  return (
    <div className="page container flex flex-col pb-0">
      <main className="h-full overflow-auto bg-white">
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
    </div>
  );
}
