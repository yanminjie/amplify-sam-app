import { Button, Form, Input, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { postCar } from "../api/apiEndPoint";

type LayoutType = Parameters<typeof Form>[0]["layout"];

interface FormValueProps {
  model: string;
  maker: string;
  engineCyl: string;
  rating: string;
  mpgHighway: string;
  year: string;
  id: string;
  mpgCity: string;
  mpgCombined: string;
  engineSize: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

const FormComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  //Ant Design Notifications
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: type === "success" ? "Notification" : "Alert",
      description:
        type === "success"
          ? "The form is submitted successfully!"
          : "An error has occured! Please try again!",
    });
  };

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? { wrapperCol: { span: 14, offset: 4 } }
      : null;

  // const onFinish = (values: FormValueProps) => {
  //   console.log("Received values of form: ", values);
  //   postCar(values);
  //   form.resetFields();
  // };

  const onFinish = async (values: FormValueProps) => {
    console.log("Received values of form: ", values);
    try {
      await postCar(values);
      form.resetFields();
      openNotificationWithIcon("success");
    } catch (error) {
      console.error("Error while submitting: ", error);
      openNotificationWithIcon("warning");
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        // onValuesChange={onFormLayoutChange}
        style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Car Model"
          name="model"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Car Maker"
          name="maker"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Engine Cylinder"
          name="engineCyl"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Engine Size"
          name="engineSize"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="MPG City"
          name="mpgCity"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="MPG Highway"
          name="mpgHighway"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="MPG Combined"
          name="mpgCombined"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please input a value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormComponent;
