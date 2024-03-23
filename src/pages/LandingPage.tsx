import HeadLine from "../components/HeadLine";
import LoginSignupSelector from "../components/LoginSignupSelector";
import TaskCarousel from "../components/TaskCarousel";

const LandingPage = () => {
  return (
    <div className="mx-10 min-[1350px]:mx-auto xl:max-w-[1280px] flex flex-col gap-20 lg:gap-0 lg:flex-row h-fit lg:h-screen items-center">
      <div className="flex flex-col gap-16 w-full items-center lg:items-start">
        <div className="h-[50px] lg:hidden"></div>
        <HeadLine />
        <TaskCarousel />
      </div>
      <div className="w-full flex items-center justify-center lg:justify-end xl:justify-center">
        <LoginSignupSelector />
      </div>
      <div className="h-[50px] lg:hidden"></div>
    </div>
  );
};

export default LandingPage;
