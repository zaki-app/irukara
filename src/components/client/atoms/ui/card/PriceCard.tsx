'use client';

interface PriceCardProps {
  text: string;
  price: string;
}

export default function PriceCard({ text, price }: PriceCardProps) {
  return (
    <div className='block mb-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow'>
      <p>{text}</p>
      <h3 className='text-2xl font-bold'>{price}</h3>
    </div>
  );
}
