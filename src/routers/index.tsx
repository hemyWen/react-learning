import Home from "@/pages/Home";
import { RouteObject } from "./interface";
import LayoutIndex from "@/layouts";
import ErrorPage from "@/pages/ErrorPage";
import Test from "@/pages/Test";
import { useRoutes } from "react-router-dom";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutIndex />,
    children: [
      {
        index: true,
        path: "home",
        element: <Home />,
        meta: {
          title: "首页",
        },
      },
      {
        path: "测试",
        element: <Test />,
        meta: {
          title: "测试",
        },
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
const Router = () => {
  return useRoutes(routes);
};
export default Router;
