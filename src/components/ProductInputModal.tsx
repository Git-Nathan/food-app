import { IProduct } from "@/models/productModel";
import { Button, Modal } from "antd";
import { useState } from "react";
import { ProductInputForm } from "./ProductInputForm";

export interface IProductInputModalProps {
  isEdit?: boolean;
  data?: IProduct;
  className?: string;
}

export function ProductInputModal({
  isEdit = false,
  data,
  className,
}: IProductInputModalProps) {
  const [openProductInputModal, setOpenProductInputModal] =
    useState<boolean>(false);

  const handleCancel = () => {
    setOpenProductInputModal(false);
  };

  return (
    <>
      <Button
        className={className}
        type={!isEdit ? "primary" : "default"}
        onClick={() => {
          setOpenProductInputModal(true);
        }}
      >
        {!isEdit ? "Add product" : "Edit"}
      </Button>
      <Modal
        open={openProductInputModal}
        title={!isEdit ? "Add product" : "Edit product"}
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
