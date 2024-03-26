import { ReactNode } from "react";
import NavBar from "./components/NavBar";
import { Toaster } from "./components/ui/toaster";

interface Props {
  children: ReactNode;
}

// The component function
const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen overflow-x-hidden hide-scrollbar">
      <NavBar />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
