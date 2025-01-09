import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ disabled, children, ...props }) => {
  return (
    <button
      className={`w-full bg-[#5970FF] py-3 text-white rounded-[5px] ${
        disabled && "opacity-50"
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
