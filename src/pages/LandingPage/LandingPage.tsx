import { useEffect } from "react";
import HeadLine from "../../components/HeadLine";
import LoginSignupSelector from "./LoginSignupSelector";
import TaskCarousel from "./TaskCarousel";
import { useLocation, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("cronoToken", token);
      console.log(token);
      navigate("/dashboard");
    }
  }, [location.search]);

  return (
    <div className="mx-10 min-[1350px]:mx-auto xl:max-w-[1280px] flex flex-col gap-20 lg:gap-0 lg:flex-row h-fit lg:h-screen items-center">
      <div className="flex flex-col gap-16 w-full items-center lg:items-start">
        <div className="h-[50px] lg:hidden"></div>
        <HeadLine />
        <TaskCarousel />
        <div className="h-10"></div>
      </div>
      <div className="w-full flex flex-col items-center justify-center lg:justify-end xl:justify-center">
        <LoginSignupSelector />
        <div className="h-24"></div>
      </div>

      <div className="h-[50px] lg:hidden"></div>
    </div>
  );
};

export default LandingPage;
