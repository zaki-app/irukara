'use client';

import Link from 'next/link';

interface ButtonProps {
  text: string;
}

export default function InButton({ text }: ButtonProps) {
  return (
    <div className='mx-8 mb-4 bg-gradient-to-r from-blue-700 to-sky-500 text-white py-4 text-center shadow-md rounded-lg text-xl font-bold'>
      {text}
    </div>
  );
}
