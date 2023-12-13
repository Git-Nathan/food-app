import { Spin } from "antd";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export interface IPublicAuthProps {
  children: ReactNode;
}

export function PublicAuth({ children }: IPublicAuthProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile") as string);

    if (profile?.email) {
      redirect("/");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center bg-[#ffffff8f]">
        <Spin size="large" />
      </div>
    );
  }

  return children;
}
