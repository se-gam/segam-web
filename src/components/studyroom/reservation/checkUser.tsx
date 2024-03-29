'use client';

import useModal from '@/hooks/useModal';
import { postAddFriend } from '@/lib/actions/user';
import cn from '@/utils/cn';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useState } from 'react';

interface CheckUserProps {
  friendId: string;
  friendName: string;
  date: Date;
  isAdded: boolean;
  onSuccess: ({ studentId, name }: { studentId: string; name: string }) => void;
}

export default function CheckUser({
  friendId,
  friendName,
  date,
  isAdded,
  onSuccess,
}: CheckUserProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const { modal } = useModal();
  const handleCheckUserClick = async () => {
    setLoading(true);
    setResult(null);
    const res = await postAddFriend({
      friendId,
      friendName,
      date,
    });
    if (res) {
      modal({
        title: '친구 추가 실패',
        content: res,
      });
    } else {
      onSuccess({
        studentId: friendId,
        name: friendName,
      });
    }
    setResult(true);
    setLoading(false);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleCheckUserClick}
        className={cn(
          'f16 w-full py-2 text-left font-normal text-text_primary transition-opacity duration-200 active:text-text_secondary active:opacity-80',
          isAdded && 'opacity-50',
        )}
      >
        {friendId} {friendName}
      </button>
      {loading && (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: '1.5rem', color: '#626FE5' }} spin />}
        />
      )}
      {result === false && (
        <span className="text-text_primary">
          <CloseOutlined style={{ fontSize: '1.5rem', color: '#DA4237' }} />
        </span>
      )}
    </div>
  );
}
