"use client";

import { Url } from "url";
import Link from "next/link";

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className, ...props }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`${className} inline-flex h-full items-center px-4 text-gray-300 transition-colors hover:text-white`}
      {...props}
    >
      <span>{children}</span>
    </Link>
  );
};

export default NavLink;
