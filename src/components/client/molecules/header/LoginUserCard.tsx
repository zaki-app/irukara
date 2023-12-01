'use client';

import { SessionProps } from '@/types/auth';
import Image from 'next/image';
import { FaCaretDown } from 'react-icons/fa';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { CALLBACK } from '@/common/constants/path';
import { allDeleteCookies } from '@/common/utils/manageCookies';

export default function LoginUserCard({ session }: { session: SessionProps }) {
  const items: MenuProps['items'] = [
    {
      label: <div>{session.user.name}</div>,
      key: 0,
    },
    {
      label: <div>プロフィール</div>,
      key: 1,
    },
    {
      label: (
        <div
          onClick={async () => {
            await signOut({ callbackUrl: CALLBACK.LOGOUT_URL });
            allDeleteCookies();
          }}
        >
          ログアウト
        </div>
      ),
      key: 2,
    },
  ];
  return (
    <div className='mr-4 bg-gray-700 p-2 rounded-lg'>
      <div className='flex justify-center items-center cursor-pointer'>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Space>
            <Image
              src={session.user.image}
              alt='ユーザー画像'
              width={30}
              height={30}
              className='rounded-full mr-2 border-solid border-2'
            />
            <FaCaretDown
              onClick={async (e) => {
                // e.preventDefault();
                console.log('クリックされました', e);
              }}
            />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
}
