// src/app/providers/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/shared/ui/MainLayout";
import { HomePage } from "@/pages/home";
import { DetailPage } from "@/pages/detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "detail/:lat/:lon/:name",
        element: <DetailPage />,
      },
    ],
  },
]);
