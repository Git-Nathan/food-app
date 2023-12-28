import { Api } from "@/api/configs";
import { Rate } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IOrderDetail } from "./OrderDetail";

export interface IOrderDetailTableProps {
  order_id: number;
}

export function OrderDetailTable(props: IOrderDetailTableProps) {
  const [loading, setLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState<IOrderDetail[]>([]);

  const getOrderDetail = async () => {
    setLoading(true);

    const res = await Api.order.getOrder(props.order_id as number);

    if (res.ok) {
      const data = await res.json();

      setOrderDetail(data.data);
    } else {
      toast.error("Có gì đó sai sai");
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  const columns: ColumnsType<IOrderDetail> = [
    {
      title: "ID",
      dataIndex: "product_id",
      key: "product_id",
      fixed: "left",
      align: "center",
      width: 1,
    },
    {
      title: "Ảnh sản phẩm",
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
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
      width: 3,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Mã cửa hàng",
      dataIndex: "store_id",
      key: "store_id",
      width: 1.5,
    },
    {
      title: "Giá tiền",
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
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 1.5,
    },
    {
      title: "Giảm giá",
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
      title: "Đánh giá",
      dataIndex: "rate",
      key: "rate",
      width: 1.8,
      render(value, record, index) {
        return <Rate disabled value={value} />;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 3,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orderDetail}
      loading={loading}
      size="middle"
      virtual
      scroll={{ x: 1500, y: 600 }}
      pagination={{ position: ["bottomCenter"] }}
    />
  );
}
