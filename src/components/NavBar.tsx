import UserGuide from "@/pages/DashBoard/UserGuide";
import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa6";
import { SiReact } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./DarkModeToggle/mode-toggle";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useToast } from "./ui/use-toast";

const NavBar = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const { toast } = useToast();
  const token = localStorage.getItem("cronoToken");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("cronoToken");
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
    navigate("/");
  };

  if (token) {
    useEffect(() => {
      apiClient.userInfo().then((res) => {
        setUserEmail(res.data.data.email);
      });
    }, []);
  }

  return (
    <nav className="w-screen h-[60px] flex items-center justify-between pl-2 pr-2">
      <div className="flex items-center gap-2">
        <SiReact className="text-4xl animate-spin duration-5000 hover:duration-1000 transition-none" />
        <h1 className="font-bold text-2xl">CronoSync</h1>
      </div>
      <div className="flex items-center gap-2">
        <p className="mr-2 text-sm">{userEmail}</p>
        <ModeToggle />
        <Dialog>
          <DialogTrigger>
            <Button className="p-3">
              <FaInfo />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UserGuide />
          </DialogContent>
        </Dialog>

        <Button onClick={onLogout} disabled={!token}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
