"use client";

import { Api } from "@/api/configs";
import { OrderDetail } from "@/components/OrderDetail";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface IOrdersPageProps {}

export interface IOrder {
  order_id: number;
  user_id: number;
  status: number;
  order_date: Date;
  total_price: string;
  store_name: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  gender: string;
  dob: Date;
  phone: string;
  address: string;
}

class OrdersStore {
  orderList = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setOrderList(data: any) {
    this.orderList = data;
  }

  setLoading(data: boolean) {
    this.loading = data;
  }

  async getAllStores() {
    this.loading = true;
    const res = await Api.order.getAllOrders();
    if (res.ok) {
      const resData = await res.json();
      this.orderList = resData.data;
    } else {
      toast.error("Something went wrong");
    }
    this.loading = false;
  }
}

export const ordersStoreIntance = new OrdersStore();

function OrdersPage(props: IOrdersPageProps) {
  const [ordersStore] = useState(() => ordersStoreIntance);

  const columns: ColumnsType<IOrder> = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      fixed: "left",
      width: 1,
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      width: 1,
    },
    {
      title: "Tình trạng đơn hàng",
      dataIndex: "status",
      key: "status",
      width: 1.5,
      render(value, record, index) {
        switch (value) {
          case 0:
            return "Đang chờ xác nhận";
          case 1:
            return "Đang giao";
          case 2:
            return "Đã giao thành công";
          case 3:
            return "Đã hủy";
          default:
            return "Unknown";
        }
      },
    },
    {
      title: "Thời gian đặt hàng",
      dataIndex: "order_date",
      key: "order_date",
      width: 1.5,
      render(value, record, index) {
        return (
          <p className="truncate-4 w-full">
            {dayjs(value).format("HH:mm:ss DD/MM/YYYY")}
          </p>
        );
      },
    },
    {
      title: "Tổng giá",
      dataIndex: "total_price",
      key: "total_price",
      width: 1,
      render(value, record, index) {
        return (
          <p className="truncate-4 w-full">
            {Intl.NumberFormat("de-DE").format(Number.parseFloat(value)) +
              "VNĐ"}
          </p>
        );
      },
    },
    {
      title: "Tên người đặt",
      dataIndex: "fullname",
      key: "fullname",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 3,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "actions",
      width: 2,
      fixed: "right",
      render(value, record, index) {
        return (
          <div key={index}>
            <OrderDetail order_id={record.order_id} />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    ordersStore.getAllStores();
  }, [ordersStore]);

  return (
    <div className="mt-2 px-10">
      <h2 className="text-base font-bold">Danh sách đơn hàng</h2>
      <div className="my-4 flex w-full items-center justify-end">
        <Button onClick={() => {}} className="font-nunito">
          Làm mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={ordersStore.orderList}
        loading={ordersStore.loading}
        size="middle"
        virtual
        scroll={{ x: 1500, y: 600 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
}

export default observer(OrdersPage);
