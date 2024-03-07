'use client';

import { useRouter } from 'next/navigation';
import { Carousel, ConfigProvider } from 'antd';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import Icons from '@/components/common/icons/icons';
import Button from '@/components/common/button/button';

export default function IntroPage() {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const router = useRouter();
  const handleButtonClick = () => {
    trackAmplitudeEvent('click_온보딩_시작하기_btn');
    router.push('/permission');
  };

  return (
    <div className=" safe-area-bottom flex h-dvh w-full flex-col justify-between overflow-x-hidden overflow-y-scroll bg-white">
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: '#626FE5',
          },
          components: {
            Carousel: {
              dotHeight: 6,
              dotWidth: 12,
            },
          },
        }}
      >
        <Carousel
          className="responsive-onboard-image pt-28"
          onSwipe={() => trackAmplitudeEvent('swipe_온보딩_설명')}
        >
          <div>
            <div className="flex h-full w-full flex-col items-center justify-between">
              <Icons.ImageIcon name="announcement" width={306} height={360} />
              <div className="responsive-onboard-text-margin mb-10 mt-20 flex flex-col items-center justify-center">
                <div className="f24 mb-2 font-bold text-text_primary">온라인 출석 확인하기</div>
                <div className="on-board text-text_secondary">
                  마감이 임박한 과제와 온라인 강의를 한눈에!
                </div>
                <div className="on-board text-text_secondary">
                  온라인 출석, 더 이상 걱정하지 마세요
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-[35px] flex flex-col items-center align-bottom">
              <Icons.ImageIcon name="books" width={302} height={324} />
              <div className="responsive-onboard-text-margin mb-10 mt-20 flex flex-col items-center justify-center">
                <div className="f24 mb-2 font-bold text-text_primary">스터디룸 예약하기</div>
                <div className="on-board text-text_secondary">
                  불편했던 학술정보원 스터디룸 조회
                </div>
                <div className="on-board text-text_secondary">
                  세감에서 편하게 조회하고 예약까지 하세요
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </ConfigProvider>
      <div className="mx-6 mb-4 flex">
        <Button variant="primary" size="full" onClick={handleButtonClick} label="시작하기" />
      </div>
    </div>
  );
}
