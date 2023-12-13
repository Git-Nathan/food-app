"use client";

import { PublicAuth } from "@/auth/PublicAuth";
import { ReactNode } from "react";

export interface IAccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: IAccountLayoutProps) {
  return (
    <PublicAuth>
      <main>{children}</main>
    </PublicAuth>
  );
}
