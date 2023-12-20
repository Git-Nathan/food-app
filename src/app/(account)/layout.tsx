"use client";

import { PublicAuth } from "@/auth/PublicAuth";
import { ReactNode } from "react";

export interface IAccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: IAccountLayoutProps) {
  return (
    <PublicAuth>
      <main className="flex h-[100vh] items-center bg-[#e6e1fe]">
        {children}
      </main>
    </PublicAuth>
  );
}
