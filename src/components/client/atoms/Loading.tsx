'use client';

export default function Loading() {
  return (
    <div
      className='flex justify-center items-center h-full w-full'
      aria-label='読み込み中'
    >
      <div className='animate-ping h-2 w-2 bg-teal-600 rounded-full' />
      <div className='animate-ping h-2 w-2 bg-teal-600 rounded-full mx-4' />
      <div className='animate-ping h-2 w-2 bg-teal-600 rounded-full' />
    </div>
  );
}
