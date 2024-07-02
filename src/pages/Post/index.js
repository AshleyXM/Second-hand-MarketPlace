import { getAllProductsAPI } from "@/apis/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Tooltip, Tag, Image, Spin } from "antd";
import dayjs from "dayjs";

import "./index.scss";

const COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 100,
    ellipsis: true,
    render: (text) => {
      return (
        <Tooltip placement="bottomLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 80,
    render: (url) => {
      return <Image src={url} width={80} height={80}></Image>;
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 60,
    render: (text) => text.toFixed(2),
  },
  {
    title: "Condition",
    dataIndex: "condition",
    key: "condition",
    width: 70,
    render: (text) => {
      return text === "new" ? (
        <Tag color="success">New</Tag>
      ) : (
        <Tag color="warning">Used</Tag>
      );
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 150,
    ellipsis: true,
    render: (text) => {
      return (
        <Tooltip placement="bottomLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: "Last Updated Time",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 150,
    render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 130,
    render: () => (
      <>
        <Button type="link">Edit</Button>
        <Button type="link" danger>
          Delete
        </Button>
      </>
    ),
  },
];

const Post = () => {
  const userId = useSelector((state) => state.user.userInfo.id);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await getAllProductsAPI(userId);
      setDataSource(res.data);
      setLoading(false);
    }

    fetchPosts();
  }, [userId]);

  return (
    <Spin tip="Loading..." size="large" spinning={loading}>
      <Table
        className="table"
        columns={COLUMNS}
        dataSource={dataSource}
        scroll={{
          x: 1300,
        }}
      />
    </Spin>
  );
};

export default Post;
