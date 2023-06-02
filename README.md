# AMPLIFY + AWS SAM APPLICATION

Hello! Welcome to the Amplify + AWS SAM Full Stack Application project.

This project is aimed at providing a comprehensive guide and structure to build a full-stack application using AWS Amplify and AWS Serverless Application Model (SAM). We leverage the powerful features of these services to create a scalable, secure, and easily maintainable web application.

## About the project

AWS Amplify enables developers to develop and deploy cloud-powered mobile and web applications. It includes a broad set of tools and services that can create scalable, full stack applications, with a focus on simplicity and ease of use.

AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications. It extends AWS CloudFormation to provide a simplified way of defining the Amazon API Gateway APIs, AWS Lambda functions, and Amazon DynamoDB tables needed by your serverless application.

The combination of Amplify and AWS SAM allows developers to rapidly build and scale applications without worrying about managing servers. This project provides a ready-to-use template to bootstrap your next full stack application.

## Project structure

The project is divided into two main sections:

1. Frontend (Amplify): This is where we design our user interfaces, authenticate users, manage user state, and interact with our backend resources. The frontend part is handled by AWS Amplify. [https://github.com/Ethanlloyd21/amplify-sam-app]

2. Backend (AWS SAM): This includes serverless functions (Lambda), API endpoints (API Gateway), and data storage (DynamoDB). The backend is managed using AWS SAM. [https://github.com/Ethanlloyd21/amplify-sam-app-backend]

## Pre-requisite:
1. Install Node.js. Node version 18 was the latest when this project was created. [https://nodejs.org/en]
2. AWS account [https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html]
3. Install AWS CLI using your command prompt [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions]
4. Install AWS SAM using your command prompt [https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html]
5. Install Docker (optional) [https://docs.docker.com/desktop/install/windows-install/]

## Front End code
This project is to show the viewers how to create a full stack application using Amplify and SAM. For simplicity I will be copying the front end of my old project serverless-no-iac [https://github.com/Ethanlloyd21/serverless-no-iac] using create-react-app. 

### Let's create the front end using create-react-app
All information about the front end code is on the serverless-no-iac video.

1. Create a front end app using create-react-app with the template typescript
```bash
npx create-react-app frontend --template typescript
```

2. Lets install some dependencies. 
Ant Design and Ant Design icons: This will be our table and form design
```bash
npm install antd @ant-design/icons 
```

Axios: a JavaScript library that we will use to fetch from our API
```bash
npm install axios
```

3. From the src folder create 2 folders 'components' and 'api'
4. From the src/api folder create a file name 'apiEndPoint.ts' and paste the following code:
```javascript
import axios from "axios";
import { Item } from "../components/Home";

const apiInventory = `${process.env.REACT_APP_ENDPOINT}inventory`; //link from the .env file

const apiHealthCheck = `${process.env.REACT_APP_ENDPOINT}check`; //link from the .env file

const apiCars = `${process.env.REACT_APP_ENDPOINT}car`; //link from the .env file

//function to generate random ID:
const id = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const getInventory = () => {
  axios
    .get(apiInventory)
    .then((response) => {
      return response.data.inventory;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const healthCheck = () => {
  axios
    .get(apiHealthCheck)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCar = () => {
  axios
    .get(apiCars)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postCar = (value: Item) => {
  axios
    .post(
      apiCars,
      {
        model: value.model,
        maker: value.maker,
        engineCyl: value.engineCyl,
        rating: value.rating,
        mpgHighway: value.mpgHighway,
        year: value.year,
        id: id(),
        mpgCity: value.mpgCity,
        mpgCombined: value.mpgCombined,
        engineSize: value.engineSize,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putCar = (value: Item) => {
  axios
    .post(
      apiCars,
      {
        model: value.model,
        maker: value.maker,
        engineCyl: value.engineCyl,
        rating: value.rating,
        mpgHighway: value.mpgHighway,
        year: value.year,
        id: value.id,
        mpgCity: value.mpgCity,
        mpgCombined: value.mpgCombined,
        engineSize: value.engineSize,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCar = async (id: string) => {
  const data = JSON.stringify({
    id: id,
  });

  const config = {
    method: "delete",
    url: apiCars,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
```
5. From the src/components folder create a file named 'Home.tsx'
```javascript
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import { putCar, deleteCar } from "../api/apiEndPoint";
import FormComponent from "./FormComponent";


export interface Item {
  id: string;
  engineCyl: string;
  engineSize: string;
  maker: string;
  model: string;
  mpgCity: string;
  mpgCombined: string;
  mpgHighway: string;
  rating: string;
  year: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const { Title } = Typography; //Typography for Ant Design

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Home: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const api = `${process.env.REACT_APP_ENDPOINT}inventory`; //link from the .env file
    axios
      .get(api)
      .then((response) => {
        const dataWithKeys = response.data.inventory.map(
          (item: { id: string }) => ({ ...item, key: item.id })
        );
        setData(dataWithKeys);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Item) => record.id === editingKey;

  
  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({
      engineCyl: "",
      engineSize: "",
      maker: "",
      model: "",
      mpgCity: "",
      mpgCombined: "",
      mpgHighway: "",
      rating: "",
      year: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        console.log(newData[index]);
        putCar(newData[index]);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        putCar(newData[index]);
        console.log(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key: React.Key) => {
    const dataSource = [...data];
    const newData = dataSource.filter((item) => item.id !== key);
    setData(newData);
  };

  const columns = [
    {
      title: "model",
      dataIndex: "model",
      width: "10%",
      editable: true,
    },
    {
      title: "maker",
      dataIndex: "maker",
      width: "10%",
      editable: true,
    },
    {
      title: "year",
      dataIndex: "year",
      width: "10%",
      editable: true,
    },
    {
      title: "engineCyl",
      dataIndex: "engineCyl",
      width: "10%",
      editable: true,
    },
    {
      title: "engine size",
      dataIndex: "engineSize",
      width: "10%",
      editable: true,
    },
    {
      title: "mpgCity",
      dataIndex: "mpgCity",
      width: "10%",
      editable: true,
    },
    {
      title: "mpgHighway",
      dataIndex: "mpgHighway",
      width: "10%",
      editable: true,
    },
    {
      title: "mpgCombined",
      dataIndex: "mpgCombined",
      width: "10%",
      editable: true,
    },
    {
      title: "rating 1-10",
      dataIndex: "rating",
      width: "5%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: unknown, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
              Cancel
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                deleteCar(record.id);
                handleDelete(record.id);
              }}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "none" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Title level={1}> Amplify + AWS SAM Application</Title>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <FormComponent />
    </>
  );
};

export default Home;
```
6. From the src/components folder create another file named 'FormComponent.tsx'
```javascript
import { Button, Form, Input, notification } from "antd";
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
```
7. Navigate to the 'App.tsx' and paste this code
```javascript
import { ConfigProvider, theme } from "antd";
import Home from "./components/Home";
import "./App.css";

function App() {
  const { darkAlgorithm } = theme;

  console.log(`${process.env.REACT_APP_ENDPOINT}inventory`);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        <Home />
      </ConfigProvider>
    </>
  );
}

export default App;
```

### For the backend read me file please visit [https://github.com/Ethanlloyd21/amplify-sam-app-backend]