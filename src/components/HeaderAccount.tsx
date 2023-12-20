export interface IHeaderAccount {}
import { Skeleton } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";

export function HeaderAccount(props: IHeaderAccount) {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="flex h-12 w-12 items-center justify-center">
        <Skeleton.Avatar size={"large"} active />
      </div>
    );

  if (session) {
    const img = session.user?.image as string;
    return (
      <div className="flex items-center">
        <button
          className="border-secondary h-12 w-12 rounded-full border border-solid bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${img}')` }}
          onClick={() => {
            signOut();
          }}
        ></button>
        <p className="ml-4 text-base">{session.user?.name as string}</p>
      </div>
    );
  }

  return (
    <button
      className="header__user border-secondary hover:!border-text_link flex h-12 w-12 items-center justify-center rounded-full bg-cover bg-center bg-no-repeat p-0"
      onClick={() => {
        signIn("google", { callbackUrl: "/products" });
      }}
    >
      <div
        className="h-12 w-12 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/icons/user.svg')` }}
      ></div>
    </button>
  );
}
