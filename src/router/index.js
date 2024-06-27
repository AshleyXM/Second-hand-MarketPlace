import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import AddPost from "@/pages/Post/AddPost";
import Transaction from "@/pages/Transaction";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "post",
        element: <Post />,
      },
      {
        path: "post/add",
        element: <AddPost />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
