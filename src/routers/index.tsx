import Home from "@/pages/Home";
import { RouteObject } from "./interface";
import LayoutIndex from "@/layouts";
import ErrorPage from "@/pages/ErrorPage";
import Test from "@/pages/Test";
import { useRoutes } from "react-router-dom";
import RenderOptimize from "@/pages/RenderOptimize";
import ReduxPage from "@/pages/ReduxPage";
import ControllOrNot from "@/pages/ControllOrNot";
import ErrorBoundaryPage from "@/pages/ErrorBoundary";
import EventPage from "@/pages/EventPage";
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
        path: "test",
        element: <Test />,
        meta: {
          title: "测试",
        },
      },
      {
        path: "render-optimize",
        element: <RenderOptimize />,
        meta: {
          title: "渲染优化",
        },
      },
      {
        path: "redux",
        element: <ReduxPage />,
        meta: {
          title: "Redux",
        },
      },
      {
        path: "controllOrNot",
        element: <ControllOrNot />,
        meta: {
          title: "受控/非受控",
        },
      },
      {
        path: "errorBoundary",
        element: <ErrorBoundaryPage />,
        meta: {
          title: "错误边界",
        },
      },
      {
        path: "eventPage",
        element: <EventPage />,
        meta: {
          title: "事件机制",
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
