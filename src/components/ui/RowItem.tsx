import { Url } from "url";
import React from "react";
import Link from "next/link";

interface RowItemProps {
  children: React.ReactNode;
  href?: Url | string;
  className?: string;
}

const RowItem: React.FC<RowItemProps> = ({ className, href, children }) => {
  if (href) {
    return (
      <Link href={href}>
        <div
          className={`${className} flex flex-row bg-dark-400 px-2 transition-colors hover:bg-dark-500`}
        >
          {children}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`${className} flex flex-row bg-dark-400 px-2 transition-colors hover:bg-dark-500`}
    >
      {children}
    </div>
  );
};

export default RowItem;
