"use client";

import { HeaderAccount } from "@/components/HeaderAccount";
import { IAdminResponse } from "@/models/adminModel";
import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface IAppHeaderProps {}

export function AppHeader(props: IAppHeaderProps) {
  const [profile, setProfile] = useState<IAdminResponse>({});

  const handleLogout = () => {
    localStorage.removeItem("profile");
    window.location.replace("/login");

    signOut();
  };

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("profile") as string));
  }, []);

  return (
    <Header className="font-nunito flex h-24 justify-between !bg-primary-white px-10">
      <h1 className="flex h-full items-center text-4xl font-bold">Overview</h1>
      <div className="flex h-full items-center px-4">
        <HeaderAccount />

        <Image
          className="ml-10"
          width={24}
          height={24}
          alt="user"
          src="/icons/user.svg"
        />

        <p className="ml-2 text-base">{profile.fullname || ""}</p>

        <Button danger className="font-nunito ml-4" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Header>
  );
}
