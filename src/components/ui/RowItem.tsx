import React from "react";
import Link from "next/link";

interface RowItemProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
}

const RowItem: React.FC<RowItemProps> = ({ className, children, ...props }) => {
  return (
    <Link {...props}>
      <div
        className={`${className} flex flex-row bg-dark-400 px-2 transition-colors hover:bg-dark-500`}
      >
        {children}
      </div>
    </Link>
  );
};

export default RowItem;
