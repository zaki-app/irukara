'use client';

interface ButtonProps {
  buttonStyle?: string;
  text: string;
}

export default function InButton({ buttonStyle, text }: ButtonProps) {
  return <div className={buttonStyle}>{text}</div>;
}

InButton.defaultProps = {
  buttonStyle:
    'mx-8 mb-4 bg-gradient-to-r from-blue-700 to-sky-500 text-white py-4 text-center shadow-md rounded-lg text-xl font-bold',
};
