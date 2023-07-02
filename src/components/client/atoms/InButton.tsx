'use client';

import Link from 'next/link';

interface ButtonProps {
  text: string;
}

export default function InButton({ text }: ButtonProps) {
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-bold p-2 text-center shadow-md rounded-lg'>
      {text}
    </div>
  );
}
