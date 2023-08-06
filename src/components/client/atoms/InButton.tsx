'use client';

interface ButtonProps {
  buttonStyle: string;
  text: string;
}

export default function InButton({ buttonStyle, text }: ButtonProps) {
  return (
    <div
      className={`rounded-lg text-xl font-bold text-center shadow-md text-white py-4 px-14 mb-4 ${buttonStyle}`}
    >
      {text}
    </div>
  );
}
