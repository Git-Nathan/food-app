import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";

export interface IAppSiderProps {}

export function AppSider(props: IAppSiderProps) {
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      key: "1",
      label: "Products",
      icon: <Image width={24} height={24} alt="icon" src="/icons/dish.svg" />,
    },
    {
      key: "2",
      label: "Stores",
      icon: <Image width={24} height={24} alt="icon" src="/icons/store.svg" />,
    },
    {
      key: "3",
      label: "Orders",
      icon: <Image width={24} height={24} alt="icon" src="/icons/order.svg" />,
    },
  ];

  return (
    <Sider
      className="!bg-indigo flex flex-col items-center px-[22px] py-[55px]"
      width="300px"
    >
      <Image width={139} height={52} src="/icons/logo.svg" alt="logo" />
      <div className="my-10 h-[2px] w-full bg-[#8A7DD0]"></div>
      <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
    </Sider>
  );
}
