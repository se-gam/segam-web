'use client';

import { Button, Input } from 'antd';
import { useFormState } from 'react-dom';
import login from '@/utils/admin';

export default function LoginPage() {
  const [, action] = useFormState(login, null);

  return (
    <div className="items-centerw-full flex min-h-screen justify-center bg-white">
      <div className="w-full lg:w-1/2">
        <div className="relative flex h-full items-center justify-center">
          <section className="w-full px-5 pb-10 text-gray-800 sm:w-4/6 sm:px-0 md:w-3/6 lg:w-4/6 xl:w-3/6">
            <div className="mt-8 flex flex-col items-center justify-center px-2 sm:mt-0">
              <h2 className="inter mt-2 text-5xl font-bold leading-tight">SEGAM</h2>
              <div className="mt-1 text-lg text-gray-400">Admin</div>
            </div>
            <div className="mt-12 w-full px-2 sm:px-6">
              <form action={action}>
                <Input placeholder="비밀번호" type="password" name="password" size="large" />
                <Button size="large" type="primary" htmlType="submit" className="mt-5 w-full">
                  로그인
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
