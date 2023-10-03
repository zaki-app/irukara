'use client';

interface ButtonProps {
  buttonStyle: string;
  text: string;
}

export default function InButton({ buttonStyle, text }: ButtonProps) {
  return (
    <div
      className={`cursor-pointer rounded-lg font-bold text-center shadow-md text-white hover:opacity-90 ${buttonStyle}`}
    >
      {text}
    </div>
  );
}
