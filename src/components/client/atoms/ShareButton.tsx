'use client';

export default function ShareButton() {
  async function shareHandler() {
    console.log('sharebuttonがクリック');

    const result = await fetch('/api/message', {
      method: 'PUT',
      body: JSON.stringify({ shareStatus: 1 }),
    });

    console.log('結果', await result.json());
  }

  return (
    <button className='flex items-center' onClick={shareHandler}>
      <div>icon</div>
      <div>share</div>
    </button>
  );
}
