export default function Card({ title, text }: any) {
  return (
    <div className='bg-white p-4 rounded-md my-4 md:mx-4 shadow-lg'>
      <h2 className='text-gray-400 text-sm mb-2'>{title}</h2>
      <p className='text-xl font-semibold'>{text}</p>
    </div>
  );
}
