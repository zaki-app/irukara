'use client';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function UserDropdownMenu() {
  const { name } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );
  return (
    <div>
      <ul>
        <li>{name}</li>
      </ul>
    </div>
  );
}
