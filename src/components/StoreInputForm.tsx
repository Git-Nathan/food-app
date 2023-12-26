import { Api } from "@/api/configs";
import { IProduct } from "@/models/productModel";
import { IStore } from "@/models/storeModel";
import { RootState } from "@/redux/store";
import { Button, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
    store_type: 1,
  },
}: IStoreInputFormProps) {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((store: RootState) => store.products);

  const onFinish = async (values: any) => {
    if (!isEdit) {
    } else {
    }
  };

  // Store id options
  const [storeIdOptions, setStoreIdOptions] = useState([]);

  const [storeIdOptionsLoading, setStoreIdOptionsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await Api.store.getAllStore();

      if (res.ok) {
        const { data } = await res.json();

        const options = data.map((item: IStore) => ({
          value: item.store_id,
          label: item.store_id?.toString(),
        }));

        setStoreIdOptions(options);
        setStoreIdOptionsLoading(false);
      } else {
        toast.error("Something went wrong!");
      }
    };
    getData();
  }, []);

  return (
    <Form
      name="product"
      labelCol={{ span: 10 }}
      style={{ maxWidth: 800 }}
      initialValues={data}
      onFinish={onFinish}
      autoComplete="off"
      className="mt-4"
    >
      <Form.Item<IProduct>
        label="Tên sản phẩm"
        name="product_name"
        rules={[
          { required: true, message: "Tên sản phẩm không được để trống!" },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<IProduct>
        label="Đường dẫn ảnh sản phẩm"
        name="avatar"
        rules={[
          {
            required: true,
            message: "Đường dẫn ảnh sản phẩm không được để trống!",
          },
        ]}
      >
        <TextArea rows={4} allowClear />
      </Form.Item>
      <Form.Item<IProduct>
        label="Mã cửa hàng"
        name="store_id"
        rules={[
          { required: true, message: "Mã cửa hàng không được để trống!" },
        ]}
      >
        <Select
          options={storeIdOptions}
          loading={storeIdOptionsLoading}
          disabled={isEdit}
        />
      </Form.Item>
      <Form.Item<IProduct>
        label="Giá tiền"
        name="price"
        rules={[{ required: true, message: "Giá tiền không được để trống!" }]}
      >
        <InputNumber className="w-full" suffix="VNĐ" />
      </Form.Item>
      <Form.Item<IProduct> label="Giảm giá" name="discount">
        <InputNumber className="w-full" suffix="VNĐ" />
      </Form.Item>
      <Form.Item<IProduct> label="Mô tả" name="description">
        <TextArea rows={4} allowClear />
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
