"use client";

import { Api } from "@/api/configs";
import { ProductInputModal } from "@/components/ProductInputModal";
import { IStore } from "@/models/storeModel";
import { Button, Popconfirm, Rate } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function StoresPage() {
  // State
  const [list, setList] = useState<IStore[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAllStores = useCallback(async () => {
    setLoading(true);

    const res: Response = await Api.store.getAllStore();
    if (res.ok) {
      const resData = await res.json();

      setList(resData.data);

      setTotal(resData.total);
    } else {
      toast.error("Something went wrong");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getAllStores();
  }, [getAllStores]);

  // Table
  const columns: ColumnsType<IStore> = [
    {
      title: "ID",
      dataIndex: "store_id",
      key: "store_id",
      fixed: "left",
      width: 1,
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      width: 1.3,
      render(value, record, index) {
        const isSrcUrl = /^https?:\/\/\S+$/i.test(value);

        return (
          <div
            className="relative flex h-[100px] w-full justify-center"
            key={index}
          >
            {isSrcUrl ? (
              <Image
                src={value}
                alt={value}
                fill
                sizes="1x"
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
            ) : (
              <Image
                src="/images/no-img.jpg"
                width={100}
                height={100}
                alt={value}
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "store_name",
      key: "store_name",
      width: 2,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Loại đồ ăn",
      dataIndex: "store_type",
      key: "store_type",
      width: 1,
      render(value, record, index) {
        switch (value) {
          case 0:
            return "Đồ ăn";
          case 1:
            return "Đồ uống";
          case 2:
            return "Đồ chay";
          case 3:
            return "Pizza/Burger";
          case 4:
            return "Đồ ăn vặt";
          default:
            return "Unknown";
        }
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
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      key: "rate",
      width: 1.6,
      render(value, record, index) {
        return <Rate disabled value={value} />;
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
            <Popconfirm title="Sure to delete?" onConfirm={() => {}}>
              <Button className="ml-4" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // Actions
  const handleDelete = useCallback((product_id: number) => {}, []);

  return (
    <div className="mt-2 px-10">
      <h2 className="text-base font-bold">Bảng cửa hàng</h2>
      <div className="flex w-full items-center justify-between">
        <ProductInputModal className="my-4 font-nunito" />
        <Button onClick={() => {}} className="font-nunito">
          Làm mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        loading={loading}
        size="middle"
        virtual
        scroll={{ x: 1500, y: 600 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
}
