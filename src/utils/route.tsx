import { ComponentType } from "react";
import { NonIndexRouteObject, createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { ContentDetail, ErrorPage, Home } from "./../pages";

export interface MenuItem extends NonIndexRouteObject {
  icon?: ComponentType
  title: string,
  children?: Array<MenuItem>
}

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      {
        id: 'home',
        path: '/',
        Component: Home,
      },
      {
        id: 'content',
        path: 'content/:id',
        Component: ContentDetail,
      },
    ]
  }
]);