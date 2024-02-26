'use client';

import BottomDrawer from '@/components/common/bottomDrawer/bottomDrawer';
import useModal from '@/hooks/useModal';
import { checkUser } from '@/lib/actions/studyroom';
import { useState } from 'react';

interface AddFriendModalProps {
  drawerOpen: boolean;
  date: Date;
  setDrawerOpen: (open: boolean) => void;
  addFriend: (friend: { studentId: string; name: string }) => void;
}

export default function AddFriendModal({
  drawerOpen,
  date,
  setDrawerOpen,
  addFriend,
}: AddFriendModalProps) {
  const [friendId, setFriendId] = useState<string>('');
  const [friendName, setFriendName] = useState<string>('');
  const { modal } = useModal();
  const handleSubmitClick = async () => {
    if (friendId === '') {
      modal({
        title: '오류',
        content: '학번을 입력해주세요.',
      });
      return;
    }
    if (friendName === '') {
      modal({
        title: '오류',
        content: '이름을 입력해주세요.',
      });
      return;
    }
    await checkUser({
      friendId,
      friendName,
      date,
    })
      .then(() => {
        addFriend({ studentId: friendId, name: friendName });
        setDrawerOpen(false);
      })
      .catch(() => {
        modal({
          title: '오류',
          content: '학번과 이름을 확인해주세요.',
        });
      });
  };
  return (
    <BottomDrawer
      openState={drawerOpen}
      onClose={() => {
        setDrawerOpen(false);
        setFriendId('');
        setFriendName('');
      }}
      onSubmit={handleSubmitClick}
      submitLabel="추가"
    >
      <div className="px-4">
        <h2 className="f20 mb-4 font-bold text-text_primary">동반 이용자 추가</h2>
        <p className="f16 mb-2 font-semibold text-text_primary">학번</p>
        <input
          type="text"
          className="f14 e-theme_primary mb-3 h-10 w-full rounded-sm bg-button_default_bg px-3 py-2.5 font-normal text-text_primary transition-colors duration-200 placeholder:text-text_secondary focus:outline-theme_primary"
          placeholder="학번을 입력해주세요"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
        />
        <p className="f16 mb-2 font-semibold text-text_primary">이름</p>
        <input
          type="text"
          className="f14 e-theme_primary mb-3 h-10 w-full rounded-sm bg-button_default_bg px-3 py-2.5 font-normal text-text_primary transition-colors duration-200 placeholder:text-text_secondary focus:outline-theme_primary"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          placeholder="이름을 입력해주세요"
        />
      </div>
    </BottomDrawer>
  );
}
