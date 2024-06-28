import "./index.scss";
import React, { useEffect } from "react";
import { Button, Form, Input, Space, Card } from "antd";
import { PlusCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getAllProductsAPI } from "@/apis/product";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "@/store/modules/product";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const Home = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.product.productList);

  async function fetchProducts() {
    const res = await getAllProductsAPI();
    dispatch(setProductList(res.data));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const onFinish = () => {};

  const handleInfoCheck = (productId) => {
    navigate(`/${productId}`);
  };

  const handlePurchase = () => {};
  return (
    <>
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button htmlType="submit">Clear</Button>
          </Space>
        </Form.Item>
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
                <PlusCircleOutlined key="purchase" onClick={handlePurchase} />,
              ]}
            >
              <Meta title={item.name} description={item.description} />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Home;
