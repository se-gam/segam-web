'use client';

import Button from '@/components/common/button/button';
import AddFriendModal from '@/components/studyroom/reservation/addFriendModal';
import useModal from '@/hooks/useModal';
import { deleteFriend } from '@/lib/actions/user';

import { Friend } from '@/lib/definitions';
import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface FriendListProps {
  friends: Friend[];
}
export default function FriendList({ friends }: FriendListProps) {
  const { modal } = useModal();
  const [friendList, setFriendList] = useState<Friend[]>(friends);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const addFriend = (friend: Friend) => {
    if (friendList.find((f) => f.studentId === friend.studentId)) {
      modal({
        title: '오류',
        content: '이미 추가된 친구입니다.',
      });
      return;
    }
    setFriendList([...friendList, friend]);
  };
  const handleDeleteClick = async ({ studentId }: { studentId: string }) => {
    try {
      await deleteFriend({ studentId });
      setFriendList(friendList.filter((friend) => friend.studentId !== studentId));
    } catch (e) {
      modal({
        title: '친구 삭제 실패',
        content: '친구 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  };

  return (
    <>
      <main className="container h-full  space-y-3 overflow-auto px-6 py-4">
        <header className="flex items-center justify-between">
          <h1 className="f20 font-bold text-text_primary">친구 목록 관리</h1>
          <Button
            label="추가"
            variant="default"
            size="md"
            onClick={() => {
              setDrawerOpen(true);
            }}
          />
        </header>
        <section>
          {friendList.map((friend) => (
            <div key={friend.studentId} className="flex items-center justify-between py-3">
              <p className="f16 text-text_primary">
                {friend.studentId} {friend.name}
              </p>
              <button
                type="button"
                onClick={() => {
                  handleDeleteClick({ studentId: friend.studentId });
                }}
                aria-label="친구 삭제"
              >
                <CloseOutlined style={{ fontSize: '0.75rem', color: '#B0B8C1' }} />
              </button>
            </div>
          ))}
        </section>
      </main>
      {drawerOpen && (
        <AddFriendModal
          drawerOpen={drawerOpen}
          friends={friendList}
          setDrawerOpen={setDrawerOpen}
          addFriend={addFriend}
        />
      )}
    </>
  );
}
