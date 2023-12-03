'use client';

import { SessionUserInfo } from '@/types/auth';
import Image from 'next/image';
import { FaCaretDown } from 'react-icons/fa';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { CALLBACK } from '@/common/constants/path';
import { allDeleteCookies } from '@/common/utils/manageCookies';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import UserDropdownMenu from '../../atoms/UserDropdownMenu';

export default function LoginUserCard() {
  const { image } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  // const items: MenuProps['items'] = [
  //   {
  //     label: <div>{session.user.name}</div>,
  //     key: 0,
  //   },
  //   {
  //     label: <div>プロフィール</div>,
  //     key: 1,
  //   },
  //   {
  //     label: (
  //       <div
  //         onClick={async () => {
  //           await signOut({ callbackUrl: CALLBACK.LOGOUT_URL });
  //           allDeleteCookies();
  //         }}
  //       >
  //         ログアウト
  //       </div>
  //     ),
  //     key: 2,
  //   },
  // ];

  // // dropdownメニュー
  // function DropDownMenu() {
  //   return (
  //     <div>
  //       <ul>
  //         <li>{session.name}</li>
  //       </ul>
  //     </div>
  //   );
  // }

  const [isDropdown, setDropDown] = useState<boolean>(false);

  useMemo(() => {
    setDropDown(true);
  }, []);

  return (
    <div className='mr-4 bg-gray-700 p-2 rounded-lg'>
      <div className='flex justify-center items-center cursor-pointer'>
        {isDropdown ? (
          <Dropdown
            trigger={['click']}
            // dropdownRender={() => <UserDropdownMenu />}
          >
            <Space>
              <Image
                src={image}
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
