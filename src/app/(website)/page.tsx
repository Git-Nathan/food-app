"use client";

import { ProductInputModal } from "@/components/ProductInputModal";
import { IProduct } from "@/models/productModel";
import { deleteProduct, getAllProducts } from "@/redux/actions/productActions";
import { RootState } from "@/redux/store";
import { Button, Popconfirm } from "antd";
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
      width: 1.2,
      render(value, record, index) {
        const isSrcUrl = /^https?:\/\/\S+$/i.test(value);

        return (
          <div
            className="relative h-[100px] w-[100px] overflow-hidden rounded"
            key={index}
          >
            {isSrcUrl ? <Image src={value} fill alt={value} /> : value}
          </div>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      width: 3,
      ellipsis: {
        showTitle: false,
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
      width: 1,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 1,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      width: 1,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 3,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 1.5,
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
    <div className="px-4">
      <div className="flex w-full items-center justify-between">
        <ProductInputModal className="my-4" />
        <Button
          onClick={() => {
            dispatch(getAllProducts());
          }}
        >
          Reload
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        loading={isLoading}
        size="middle"
        bordered
        virtual
        scroll={{ x: 1500, y: 600 }}
      />
    </div>
  );
}
