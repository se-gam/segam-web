'use client';

import { checkUser } from '@/lib/actions/studyroom';
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
  const handleCheckUserClick = async () => {
    setLoading(true);
    setResult(null);
    await checkUser({
      friendId,
      friendName,
      date,
    })
      .then(() => {
        setResult(true);
        onSuccess({
          studentId: friendId,
          name: friendName,
        });
      })
      .catch(() => {
        setResult(false);
      });
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
