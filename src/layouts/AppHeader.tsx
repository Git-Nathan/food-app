"use client";

import { IAdminResponse } from "@/models/adminModel";
import { Button } from "antd";
import { useEffect, useState } from "react";

export interface IAppHeaderProps {}

export function AppHeader(props: IAppHeaderProps) {
  const [profile, setProfile] = useState<IAdminResponse>({});

  const handleLogout = () => {
    localStorage.removeItem("profile");

    window.location.replace("/login");
  };

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("profile") as string));
  }, []);

  return (
    <header className="flex items-center justify-end">
      <div className="flex h-14 items-center px-4">
        Admin: {profile.fullname || ""}
        <Button danger className="ml-4" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
