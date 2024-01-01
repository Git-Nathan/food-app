import { Api } from "@/api/configs";
import { ordersStoreIntance } from "@/mobx/ordersStore";
import { Button, Form, Select } from "antd";
import { toast } from "react-toastify";

const statusOptions = [
  { value: 0, label: "Đang chờ xác nhận" },
  { value: 1, label: "Đang giao" },
  { value: 2, label: "Đã giao thành công" },
  { value: 3, label: "Đã hủy" },
];

export interface IChangeStatusFormProps {
  order_id: number;
  handleCancel: () => void;
}

export function ChangeStatusForm(props: IChangeStatusFormProps) {
  const onFinish = async (values: any) => {
    const res = await Api.order.changeStatus(props.order_id, values.status);

    if (res.ok) {
      toast.success("Đổi trạng thái thành công");
      ordersStoreIntance.getAllStores();
    } else {
      toast.success("Có gì đó sai sai!");
    }
  };

  return (
    <Form
      name="product"
      labelCol={{ span: 10 }}
      style={{ maxWidth: 800 }}
      onFinish={onFinish}
      autoComplete="off"
      className="mt-4"
    >
      <Form.Item<any>
        label="Trạng thái đơn hàng"
        name="status"
        rules={[
          {
            required: true,
            message: "Trạng thái đơn hàng không được để trống!",
          },
        ]}
      >
        <Select options={statusOptions} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <div className="flex justify-end">
          <Button key="back" onClick={props.handleCancel}>
            Huỷ bỏ
          </Button>
          <Button className="ml-4" type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
