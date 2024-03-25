import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  // const token = localStorage.getItem("cronoToken");

  // if (!token) {
  //   return <Navigate to="/" />;
  // }
  return <Outlet />;
};

export default PrivateRoutes;
