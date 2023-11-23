'use client';

interface LoadingProps {
  opacity: number;
}

// ローディングアイコン
export default function Loading({ opacity }: LoadingProps) {
  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <>
      <div
        className='loading-container'
        style={{
          opacity,
        }}
      >
        <div className='loading'>
          {items.map((item) => (
            <span key={item} style={{ ['--i' as any]: item }} />
          ))}
        </div>
      </div>
    </>
  );
}
