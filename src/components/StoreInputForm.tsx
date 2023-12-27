import { Api } from "@/api/configs";
import { storesIntance } from "@/app/(website)/stores/page";
import { IStore } from "@/models/storeModel";
import { Button, Form, Input, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

const storeTypeOptions = [
  { value: 0, label: "Đồ ăn" },
  { value: 1, label: "Đồ uống" },
  { value: 2, label: "Đồ chay" },
  { value: 3, label: "Pizza / Burger" },
  { value: 4, label: "Đồ ăn vặt" },
];

export interface IStoreInputFormProps {
  handleCancel: () => void;
  isEdit?: boolean;
  data?: IStore;
}

export function StoreInputForm({
  handleCancel,
  isEdit = false,
  data = {
    store_name: "",
    avatar: "",
    address: "",
    phone: "",
    rate: "",
    time_open: "",
    time_close: "",
    store_type: 0,
  },
}: IStoreInputFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    const time_open = dayjs(values.time_open as string).format("HH:mm:ss");
    const time_close = dayjs(values.time_close as string).format("HH:mm:ss");

    if (!isEdit) {
      const res = await Api.store.addStore({
        ...values,
        rate: "0",
        time_open,
        time_close,
      });
      if (res.ok) {
        toast.success("Thêm cửa hàng thành công");
        storesIntance.getAllStores();
      } else {
        toast.success("Có gì đó sai sai!");
      }
    } else {
      const res = await Api.store.updateStore(data.store_id as number, {
        ...values,
        rate: "0",
        time_open,
        time_close,
      });
      if (res.ok) {
        toast.success("Sửa cửa hàng thành công");
        storesIntance.getAllStores();
      } else {
        toast.success("Có gì đó sai sai!");
      }
    }

    setIsLoading(false);
  };

  return (
    <Form
      name="product"
      labelCol={{ span: 10 }}
      style={{ maxWidth: 800 }}
      initialValues={{
        ...data,
        time_open: data.time_open
          ? dayjs(data.time_open, "HH:mm:ss")
          : dayjs("00:00:00", "HH:mm:ss"),
        time_close: data.time_close
          ? dayjs(data.time_close, "HH:mm:ss")
          : dayjs("00:00:00", "HH:mm:ss"),
      }}
      onFinish={onFinish}
      autoComplete="off"
      className="mt-4"
    >
      <Form.Item<IStore>
        label="Tên cửa hàng"
        name="store_name"
        rules={[
          { required: true, message: "Tên cửa hàng không được để trống!" },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<IStore>
        label="Đường dẫn ảnh cửa hàng"
        name="avatar"
        rules={[
          {
            required: true,
            message: "Đường dẫn ảnh cửa hàng không được để trống!",
          },
        ]}
      >
        <TextArea rows={4} allowClear />
      </Form.Item>
      <Form.Item<IStore>
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: "Địa chỉ không được để trống!" }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<IStore>
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Số điện thoại không được để trống!" },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<IStore>
        label="Giờ mở cửa"
        name="time_open"
        rules={[{ required: true, message: "Giờ mở cửa không được để trống!" }]}
      >
        <TimePicker placeholder="Giờ mở cửa" />
      </Form.Item>
      <Form.Item<IStore>
        label="Giờ đóng cửa"
        name="time_close"
        rules={[
          { required: true, message: "Giờ đóng cửa không được để trống!" },
        ]}
      >
        <TimePicker placeholder="Giờ đóng cửa" />
      </Form.Item>
      <Form.Item<IStore>
        label="Loại cửa hàng"
        name="store_type"
        rules={[
          { required: true, message: "Loại cửa hàng không được để trống!" },
        ]}
      >
        <Select options={storeTypeOptions} disabled={isEdit} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <div className="flex justify-end">
          <Button key="back" onClick={handleCancel}>
            Huỷ bỏ
          </Button>
          <Button
            loading={isLoading}
            className="ml-4"
            type="primary"
            htmlType="submit"
          >
            {!isEdit ? "Thêm" : "Sửa"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
