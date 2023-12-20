"use client";

import { ProductInputModal } from "@/components/ProductInputModal";
import { IProduct } from "@/models/productModel";
import { deleteProduct, getAllProducts } from "@/redux/actions/productActions";
import { RootState } from "@/redux/store";
import { Button, Popconfirm, Rate } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  // Redux
  const { list, isLoading } = useSelector((store: RootState) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Table
  const columns: ColumnsType<IProduct> = [
    {
      title: "ID",
      dataIndex: "product_id",
      key: "product_id",
      fixed: "left",
      width: 1,
    },
    {
      title: "Image",
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
            <div className="overflow-hidden rounded">
              {isSrcUrl ? (
                <Image src={value} width={100} height={100} alt={value} />
              ) : (
                <Image
                  src="/images/no-img.jpg"
                  width={100}
                  height={100}
                  alt={value}
                />
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      width: 3,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Store ID",
      dataIndex: "store_id",
      key: "store_id",
      width: 1,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 1.5,
      render(value, record, index) {
        return (
          Intl.NumberFormat("de-DE").format(Number.parseFloat(value)) + "VNĐ"
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 1.5,
      render(value, record, index) {
        return (
          Intl.NumberFormat("de-DE").format(Number.parseFloat(value)) + "VNĐ"
        );
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      width: 1.6,
      render(value, record, index) {
        return <Rate disabled value={value} />;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 3,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 2,
      fixed: "right",
      render(value, record, index) {
        return (
          <div key={index}>
            <ProductInputModal isEdit data={record} />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                handleDelete(record.product_id as number);
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

  // Actions
  const handleDelete = useCallback(
    (product_id: number) => {
      dispatch(deleteProduct(product_id));
    },
    [dispatch],
  );

  return (
    <div className="mt-2 px-10">
      <h2 className="text-base font-bold">Products Table</h2>
      <div className="flex w-full items-center justify-between">
        <ProductInputModal className="font-nunito my-4" />
        <Button
          onClick={() => {
            dispatch(getAllProducts());
          }}
          className="font-nunito"
        >
          Reload
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        loading={isLoading}
        size="middle"
        virtual
        scroll={{ x: 1500, y: 600 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
}
