import { IProduct } from "@/models/productModel";
import { Button, Modal } from "antd";
import { useState } from "react";
import { ProductInputForm } from "./ProductInputForm";

export interface IStoreInputModalProps {
  isEdit?: boolean;
  data?: IProduct;
  className?: string;
}

export function StoreInputModal({
  isEdit = false,
  data,
  className,
}: IStoreInputModalProps) {
  const [openStoreInputModal, setOpenStoreInputModal] =
    useState<boolean>(false);

  const handleCancel = () => {
    setOpenStoreInputModal(false);
  };

  return (
    <>
      <Button
        className={className}
        type={!isEdit ? "primary" : "default"}
        onClick={() => {
          setOpenStoreInputModal(true);
        }}
      >
        {!isEdit ? "Thêm cửa hàng" : "Sửa"}
      </Button>
      <Modal
        open={openStoreInputModal}
        title={!isEdit ? "Thêm cửa hàng" : "Sửa cửa hàng"}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose
      >
        <ProductInputForm
          handleCancel={handleCancel}
          data={data}
          isEdit={isEdit}
        />
      </Modal>
    </>
  );
}
