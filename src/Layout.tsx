import { ReactNode } from "react";
import { ModeToggle } from "./components/DarkModeToggle/mode-toggle";

interface Props {
  children: ReactNode;
}

// The component function
const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      {children}
      <div className="fixed top-4 left-4">
        <h1 className="font-bold">CronoSync</h1>
      </div>
    </div>
  );
};

export default Layout;
