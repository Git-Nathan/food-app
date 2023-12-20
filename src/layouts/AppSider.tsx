import { DishIcon, OrderIcon, StoreIcon } from "@/assets/icons";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import { NavLink } from "../components/NavLink";

export interface IAppSiderProps {}

export function AppSider(props: IAppSiderProps) {
  return (
    <Sider
      className="flex flex-col items-center !bg-indigo px-[22px] py-[55px]"
      width="300px"
    >
      <Image width={139} height={52} src="/icons/logo.svg" alt="logo" />
      <div className="my-10 h-[2px] w-full bg-[#8A7DD0]"></div>
      <nav className="flex w-full flex-col">
        <NavLink
          className="m-1 mb-3 flex h-10 w-full items-center rounded-lg pl-6 pr-4 text-base text-primary-white"
          href="/products"
        >
          <DishIcon />
          <p className="ml-8">Products</p>
        </NavLink>
        <NavLink
          className="m-1 mb-3 flex h-10 w-full items-center rounded-lg pl-6 pr-4 text-base text-primary-white"
          href="/stores"
        >
          <StoreIcon />
          <p className="ml-8">Stores</p>
        </NavLink>
        <NavLink
          className="m-1 flex h-10 w-full items-center rounded-lg pl-6 pr-4 text-base text-primary-white"
          href="/orders"
        >
          <OrderIcon /> <p className="ml-8">Orders</p>
        </NavLink>
      </nav>
    </Sider>
  );
}
