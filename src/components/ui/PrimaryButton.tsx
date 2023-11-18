import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  onClick,
  ...rest
}) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-1 text-white transition-colors hover:bg-orange-700 disabled:bg-orange-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
