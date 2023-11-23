'use client';

interface ButtonProps {
  buttonStyle: string;
  text: string;
  onClick?: () => void;
}

export default function InButton({ buttonStyle, text, onClick }: ButtonProps) {
  return (
    <div
      className={`cursor-pointer rounded-lg font-bold text-center shadow-md text-white hover:opacity-90 ${buttonStyle}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
