"use client";

import { Api } from "@/api/configs";
import { StoreInputModal } from "@/components/StoreInputModal";
import { storesIntance } from "@/mobx/stores";
import { IStore } from "@/models/storeModel";
import { Button, Popconfirm, Rate } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function StoresPage() {
  const [stores] = useState(() => storesIntance);

  const handleDelete = async (store_id: number) => {
    stores.setLoading(true);

    const res = await Api.store.deleteStore(store_id);
    if (res.ok) {
      toast.success("Xóa cửa hàng thành công");
      stores.getAllStores();
    }

    stores.setLoading(false);
  };

  useEffect(() => {
    stores.getAllStores();
  }, [stores]);

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
      title: "Giờ mở cửa",
      dataIndex: "time_open",
      key: "time_open",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Giờ đóng cửa",
      dataIndex: "time_close",
      key: "time_close",
      width: 1.5,
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
            <StoreInputModal isEdit data={record} />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                handleDelete(record.store_id as number);
              }}
            >
              <Button className="ml-4" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-2 px-10">
      <h2 className="text-base font-bold">Bảng cửa hàng</h2>
      <div className="flex w-full items-center justify-between">
        <StoreInputModal className="my-4 font-nunito" />
        <Button
          onClick={() => {
            stores.getAllStores();
          }}
          className="font-nunito"
        >
          Làm mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={stores.storeList}
        loading={stores.loading}
        size="middle"
        virtual
        scroll={{ x: 1500, y: 600 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
}

export default observer(StoresPage);
