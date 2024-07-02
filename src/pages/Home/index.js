import "./index.scss";
import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Card,
  Modal,
  Typography,
  Select,
  Row,
  Col,
} from "antd";
import { PlusCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getAllProductsAPI } from "@/apis/product";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "@/store/modules/product";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { CATEGORY_LIST } from "../Post/AddPost";
const { Meta } = Card;
const { Option } = Select;

const { Paragraph } = Typography;

const Home = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.product.productList);

  useEffect(() => {
    async function fetchProducts() {
      const res = await getAllProductsAPI();
      dispatch(setProductList(res.data));
    }
    fetchProducts();
  }, [dispatch]);

  const onFinish = () => {};

  const handleInfoCheck = (productId) => {
    navigate(`/${productId}`);
  };

  const handlePurchase = (name) => {
    Modal.confirm({
      title: `Confirm to buy this ${name}?`,
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {},
    });
  };

  const handleFormClear = () => {
    form.resetFields();
  };
  return (
    <>
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        initialValues={{ name: "", category: [], condition: [] }}
      >
        <Row style={{ width: "100%" }}>
          <Col span={5}>
            <Form.Item name="name" label="Name">
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="category" label="Category">
              <Select placeholder="Select category">
                {_.map(CATEGORY_LIST, (value, key) => (
                  <Option key={value} value={key}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="condition" label="Condition">
              <Select placeholder="Select condition">
                <Option value="new">New</Option>
                <Option value="used">Used</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button htmlType="submit" onClick={handleFormClear}>
                  Clear
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="card-wrapper">
        {productList.map((item) => {
          return (
            <Card
              className="product-card"
              style={{
                width: 230,
              }}
              cover={
                <img alt="example" src={item.image} style={{ height: 180 }} />
              }
              actions={[
                <InfoCircleOutlined
                  key="detail"
                  onClick={() => handleInfoCheck(item.id)}
                />,
                <PlusCircleOutlined
                  key="purchase"
                  onClick={() => handlePurchase(item.name)}
                />,
              ]}
            >
              <Meta
                title={item.name}
                description={
                  <Paragraph
                    ellipsis={{
                      rows: 2,
                      tooltip: item.description,
                    }}
                  >
                    {item.description}
                  </Paragraph>
                }
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Home;
