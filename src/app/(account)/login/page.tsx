"use client";

import { Api } from "@/api/configs";
import { PasswordIcon, UserIcon } from "@/assets/icons";
import { Button, Form, Input } from "antd";
import Image from "next/image";
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

        router.push("/products");
      } else {
        toast.error("Something went wrong");
      }

      setLoading(false);
    };
    register();
  };

  return (
    <div className="relative mx-auto">
      <Image
        className="absolute -left-[30px] -top-[80px]"
        width={70}
        height={70}
        alt="ball"
        src="/icons/indigo-ball.svg"
      />
      <Image
        className="absolute -right-[40px] bottom-[20px]"
        width={80}
        height={80}
        alt="ball"
        src="/icons/white-ball.svg"
      />
      <div className="border-blue-400 bg-white relative flex w-min -translate-y-[5vh] overflow-hidden rounded-3xl bg-primary-white shadow-2xl">
        <div className="flex w-[420px] flex-col items-center pt-20">
          <div className="mb-8 flex justify-center">
            <h1 className="text-4xl font-bold">Login</h1>
          </div>
          <Form
            name="basic"
            style={{ maxWidth: 800, width: 400 }}
            onFinish={onFinish}
            autoComplete="off"
            className="!w-8/12"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="font-nunito"
                prefix={<UserIcon />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<PasswordIcon />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item className="flex justify-center">
              <Button
                className="font-nunito mt-2"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Login now
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div
          className="flex h-[500px] w-[420px] items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Rectangle-4.png')",
          }}
        >
          <div className="relative h-[340px] w-[260px] rounded-[30px] border border-solid border-[rgba(255,255,255,0.52)] bg-[rgba(255,255,255,0.21)] backdrop-blur-[6.8px]">
            <div
              className="absolute h-[340px] w-[400px] -translate-x-[130px] -translate-y-[2px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/images/women.png')` }}
            ></div>
            <Image
              className="absolute bottom-[60px] left-[-25px]"
              width={50}
              height={50}
              alt="thunder"
              src="/icons/thunder.svg"
            />
            <p className="ml-6 mt-6 w-[120px] text-lg font-bold  text-primary-white">
              Very good works are waiting for you Login Now!!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
