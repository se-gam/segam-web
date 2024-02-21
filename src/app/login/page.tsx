'use client';

import Button from '@/components/common/button/button';
import login from '@/lib/actions/auth';
import { Modal, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [modal, contextHolder] = Modal.useModal();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const countDown = () => {
    modal.error({
      icon: null,
      title: <h2 className="f20 font-bold text-text_primary">로그인 오류</h2>,
      content: (
        <p className="f14 font-medium text-text_secondary">학번과 비밀번호를 확인해주세요.</p>
      ),
      okButtonProps: {
        style: {
          backgroundColor: '#626FE5',
          color: 'white',
          borderRadius: '0.375rem',
        },
      },
      okText: <span className="f16 font-medium text-white">확인</span>,
    });
  };
  const loginHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('studentId', id);
    formData.append('password', password);
    await login(formData)
      .then(() => {
        router.push('/dashboard');
      })
      .catch(() => {
        setLoading(false);
        countDown();
      });
  };

  return (
    <>
      {loading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
          <Spin />
        </div>
      )}
      {contextHolder}
      <main className="container flex h-full flex-col bg-app_bg p-4 pt-6">
        <h1 className="f20 mb-4 font-bold text-text_primary">로그인</h1>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="학번"
          className="mb-4 h-12 w-full rounded-md px-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="mb-4 h-12 w-full rounded-md px-4"
        />
        <Button onClick={loginHandler} label="로그인" variant="primary" size="full" />
      </main>
    </>
  );
}
