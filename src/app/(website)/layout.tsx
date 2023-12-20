"use client";

import { ProtechedAuth } from "@/auth/ProtechedAuth";
import { AppHeader } from "@/layouts/AppHeader";
import { AppSider } from "@/layouts/AppSider";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { ReactNode } from "react";

export interface IMainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: IMainLayoutProps) {
  return (
    <ProtechedAuth>
      <Layout className="!bg-indigo">
        <AppSider />
        <Layout className="overflow-hidden rounded-l-[50px]">
          <AppHeader />
          <Content className="!bg-primary-white">{children}</Content>
        </Layout>
      </Layout>
    </ProtechedAuth>
  );
}
