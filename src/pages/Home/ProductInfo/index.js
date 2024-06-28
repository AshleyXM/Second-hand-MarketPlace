import React, { useEffect, useState } from "react";
import { Image, Descriptions } from "antd";
import { getProductInfoAPI } from "@/apis/product";
import { useParams } from "react-router-dom";

import "./index.scss";

const ProductInfo = () => {
  const params = useParams();
  const productId = params.id;

  const [productInfo, setProductInfo] = useState({});

  async function fetchProduct() {
    const { data } = await getProductInfoAPI(productId);
    setProductInfo(data);
  }

  useEffect(() => {
    // get product details
    fetchProduct();
  }, []);

  const items = [
    {
      key: "name",
      label: "Name",
      children: `${productInfo.name}`,
    },
    {
      key: "price",
      label: "Price",
      children: `$${productInfo.price?.toFixed(2)}`,
    },
    {
      key: "category",
      label: "Category",
      children: `${productInfo.category}`,
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
      span: 3,
    },
    {
      key: "description",
      label: "Description",
      children: `${productInfo.description}`,
    },
  ];

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
