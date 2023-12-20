import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface INavLinkProps {
  href: string;
  exact?: boolean;
  children: ReactNode;
  className?: string;
}

export function NavLink({
  href,
  exact = false,
  children,
  className,
  ...props
}: INavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    className += " active";
  }

  return (
    <Link className={`nav-link ` + className} href={href} {...props}>
      {children}
    </Link>
  );
}
