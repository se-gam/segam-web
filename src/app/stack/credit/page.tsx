import Icons from '@/components/common/icons/icons';
import StackHeader from '@/components/common/stackHeader/stackHeader';

export default function CreditPage() {
  const teamInformation = [
    {
      role: '앱 개발',
      members: [
        {
          name: '김민수',
          info: '컴퓨터공학과 18',
          iconName: 'kim',
        },
        {
          name: '이진형',
          info: '컴퓨터공학과 18',
          iconName: 'lee',
        },
        {
          name: '홍성철',
          info: '컴퓨터공학과 18',
          iconName: 'hong',
        },
      ],
    },
    {
      role: '서버 개발',
      members: [
        {
          name: '정재경',
          info: '컴퓨터공학과 17',
          iconName: 'jung',
        },
        {
          name: '최예린',
          info: '컴퓨터공학과 18',
          iconName: 'choi',
        },
      ],
    },
  ];
  const license = [
    { iconName: 'licenseGithub', description: '세종대학교 구성원 인증 라이브러리 @iml1111' },
    { iconName: 'licenseGithub', description: '출석귀신: 세종대학교 온라인 출석관리 @luciancah' },
    { iconName: 'licenseGithub', description: '종이당: 세종대학교 스터디룸 예약 @kmsu44' },
    { iconName: 'licenseH', description: '3d render hand holding smartphone with checklist' },
    { iconName: 'licenseH', description: '3d render books fly or fall on blue background' },
    { iconName: 'licenseH', description: 'Delicious korean food with egg icon 외 17건' },
    { iconName: 'licenseH', description: '3d rendering of firefighter icon' },
    {
      iconName: 'licenseH',
      description: '3d cinema icon illustration with movie theater seats 외 14건',
    },
  ];

  return (
    <div className="safe-area-bottom flex h-screen flex-col overflow-hidden bg-white">
      <StackHeader title="앱 크레딧" />
      <main className="flex h-full flex-col overflow-y-scroll bg-white px-4 pb-2">
        <div className="mb-6 mt-6 flex flex-col">
          <p className=" f20 mb-4 font-bold text-text_primary">팀원</p>
          {teamInformation.map((team) => (
            <div key={team.role} className="mb-3 flex flex-col gap-1">
              <p className=" f16 font-bold text-text_primary">{team.role}</p>
              <div className="flex gap-2">
                {team.members.map((member) => (
                  <div key={member.name} className="flex flex-col gap-1">
                    <Icons.ImageIcon name={member.iconName} height={100} width={100} />
                    <div className="flex flex-col items-center justify-center">
                      <p className="f14 font-medium text-text_primary">{member.info}</p>
                      <p className="f14 font-bold text-text_primary">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="f20 font-bold text-text_primary">라이센스</p>
          <div className="flex flex-col gap-1">
            {license.map((item) => (
              <div key={item.description} className="flex items-center gap-1 align-middle">
                <Icons.ImageIcon name={item.iconName} height={20} width={20} />
                <p className="f12 text-text_primary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
