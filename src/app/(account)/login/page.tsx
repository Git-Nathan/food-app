"use client";

import { Api } from "@/api/configs";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  // Notification
  const router = useRouter();

  // Login
  const [loading, setLoading] = useState(false);

  type FieldType = {
    username: string;
    password: string;
  };

  const onFinish = (values: FieldType) => {
    const register = async () => {
      setLoading(true);

      const response = await Api.admin.signin({
        username: values.username,
        password: values.password,
      });

      if (response.ok) {
        const { data } = await response.json();

        localStorage.setItem("profile", JSON.stringify(data));
        toast.success("Login successfully");

        router.push("/");
      }

      setLoading(false);
    };
    register();
  };

  return (
    <>
      <div className="mx-auto mt-20 w-min rounded border border-solid border-blue-400 bg-white p-10 pb-4">
        <div className="mb-8 flex justify-center">
          <h1 className="text-4xl">Login</h1>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800, width: 400 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
