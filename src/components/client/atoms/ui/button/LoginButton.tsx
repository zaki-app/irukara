import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { lineLogo, googleLogo } from '@/common/config/site.config';

interface LoginButtonProps {
  type: 'line' | 'google';
  className: string;
  size: number;
  textClass: string;
}

export default function LoginButton({
  type,
  className,
  size,
  textClass,
}: LoginButtonProps) {
  return (
    <div>
      {/* LINEログイン */}
      {type === 'line' && (
        <div
          className={`bg-line cursor-pointer flex text-white items-center justify-center
            rounded-lg hover:opacity-90 ${className}`}
          onClick={() => signIn('line')}
        >
          <Image
            src={lineLogo}
            alt='LINEログインアイコン'
            width={size}
            height={size}
          />
          <div className={textClass}>LINEログイン</div>
        </div>
      )}
      {/* googleログイン */}
      {type === 'google' && (
        <div
          className={`cursor-pointer flex items-center justify-center bg-white
            border-gray-400 border-2 rounded-lg hover:opacity-90 ${className}`}
          onClick={() => signIn('google')}
        >
          <Image
            src={googleLogo}
            alt='googleログインアイコン'
            width={size}
            height={size}
          />
          <div className={textClass}>Googleログイン</div>
        </div>
      )}
    </div>
  );
}
