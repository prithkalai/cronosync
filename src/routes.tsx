import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import DashBoard from "./pages/DashBoard";
import LandingPage from "./pages/LandingPage";
import PrivateRoutes from "./pages/PrivateRoutes";

const router = createBrowserRouter([
  { path: "/", element: <Layout children={<LandingPage />} /> },
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: <Layout children={<DashBoard />} />,
      },
    ],
  },
]);

export default router;
