import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import DashBoardIndex from "./pages/DashBoard";

const router = createBrowserRouter([
  { path: "/", element: <Layout children={<LandingPage />} /> },
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: <Layout children={<DashBoardIndex />} />,
      },
    ],
  },
]);

export default router;
