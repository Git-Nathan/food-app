import { Button, Modal } from "antd";
import { useState } from "react";
import { ChangeStatusForm } from "./ChangeStatusForm";

export interface IChangeStatusProps {
  order_id?: number;
  className?: string;
}

export function ChangeStatus(props: IChangeStatusProps) {
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
        Đổi trạng thái
      </Button>
      <Modal
        open={openOrderDetailModal}
        title={`Đổi trạng thái đơn hàng ${props.order_id}`}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose
        width={400}
      >
        <ChangeStatusForm
          order_id={props.order_id as number}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
}
