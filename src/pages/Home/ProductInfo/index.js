import React, { useEffect, useState } from "react";
import { Image, Descriptions, Tag } from "antd";
import { getProductInfoAPI } from "@/apis/product";
import { useParams } from "react-router-dom";

import "./index.scss";

const ProductInfo = () => {
  const params = useParams();
  const productId = params.id;

  const [productInfo, setProductInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await getProductInfoAPI(productId);
      setProductInfo(data);
      setLoading(false);
    }
    // get product details
    fetchProduct();
  }, [productId]);

  const items = [
    {
      key: "name",
      label: "Name",
      children: productInfo.name,
      span: 2,
    },
    {
      key: "price",
      label: "Price",
      children: productInfo.price?.toFixed(2),
      span: 2,
    },
    {
      key: "category",
      label: "Category",
      children: productInfo.category,
      span: 2,
    },

    {
      key: "condition",
      label: "Condition",
      children:
        productInfo.condition !== "new" ? (
          <Tag color="success">New</Tag>
        ) : (
          <Tag color="warning">Used</Tag>
        ),
      span: 2,
    },
    {
      key: "image",
      label: "Image",
      children: (
        <Image
          src={productInfo.image}
          alt={productInfo.name}
          width={300}
          height={300}
        />
      ),
      span: 4,
    },
    {
      key: "description",
      label: "Description",
      children: productInfo.description,
    },
  ];

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="loading"></div>
        <div className="loading-text">loading...</div>
      </div>
    );
  }

  return (
    <Descriptions
      className="description-wrapper"
      title="Product Info"
      bordered
      items={items}
    />
  );
};

export default ProductInfo;
