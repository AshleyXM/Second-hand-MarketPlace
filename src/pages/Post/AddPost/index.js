import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { BASE_URL } from "@/constants";
import _ from "lodash";
import { createProductAPI } from "@/apis/product";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const { Option } = Select;

export const CATEGORY_LIST = {
  1: "Art",
  2: "Books",
  3: "Clothing, Shoes & Accessories",
  4: "Electronics",
  5: "Home & Garden",
  6: "Pet Supplies",
  7: "Sports",
  8: "Others",
};

const AddPost = () => {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([]);
  const handleChange = (values) => {
    setImageList(values.fileList);
  };

  const onFinish = async (formData) => {
    const reqData = {
      ...formData,
      images: imageList.map((image) => image.response.data.url),
    };
    await createProductAPI(reqData);
    message.success("Product posted successfully!");
    navigate("/");
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      initialValues={{ description: "" }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter name",
          },
        ]}
      >
        <Input placeholder="Please enter product name" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Please enter price",
          },
        ]}
      >
        <InputNumber min={0} placeholder="Price" />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please select category",
          },
        ]}
      >
        <Select placeholder="Please select product category">
          {_.map(CATEGORY_LIST, (value, key) => (
            <Option key={value} value={key}>
              {value}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Condition"
        name="condition"
        rules={[
          {
            required: true,
            message: "Please select condition",
          },
        ]}
      >
        <Select placeholder="Please select product condition">
          <Option value="new">New</Option>
          <Option value="used">Used</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Image" valuePropName="fileList">
        <Upload
          action={`${BASE_URL}/upload`}
          listType="picture-card"
          onChange={handleChange}
        >
          <button
            style={{
              border: 0,
              background: "none",
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} placeholder="Please enter product description" />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" size="large" htmlType="submit">
          Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPost;
