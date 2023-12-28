import { Button, Modal } from "antd";
import { useState } from "react";
import { OrderDetailTable } from "./OrderDetailTable";

export interface IOrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  product_name: string;
  store_id: number;
  avatar: string;
  size: null;
  discount: string;
  status: boolean;
  rate: string;
  description: string;
}

export interface IOrderDetailProps {
  order_id?: number;
  className?: string;
}

export function OrderDetail(props: IOrderDetailProps) {
  const [openOrderDetailModal, setOpenOrderDetailModal] =
    useState<boolean>(false);

  const handleCancel = () => {
    setOpenOrderDetailModal(false);
  };

  return (
    <>
      <Button
        className={props.className}
        type={"primary"}
        onClick={() => {
          setOpenOrderDetailModal(true);
        }}
      >
        Xem chi tiết
      </Button>
      <Modal
        open={openOrderDetailModal}
        title={`Chi tiết đơn hàng ${props.order_id}`}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose
        width={1200}
      >
        <OrderDetailTable order_id={props.order_id as number} />
      </Modal>
    </>
  );
}
