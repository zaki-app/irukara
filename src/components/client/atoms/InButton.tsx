'use client';

import Link from 'next/link';

interface ButtonProps {
  text: string;
  link: string;
}

export default function InButton({ text, link }: ButtonProps) {
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-bold p-2 text-center shadow-md rounded-lg'>
      <Link href={link}>{text}</Link>
    </div>
  );
}
