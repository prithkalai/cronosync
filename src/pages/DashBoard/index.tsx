import { useEffect, useState } from "react";
import DashBoard from "./DashBoard";

export interface Task {
  _id: string;
  taskData: string;
  startTime: string;
  endTime: string;
  interval: string;
  category: Category;
}

export interface Category {
  title: string;
  _id: string;
}

const DashBoardIndex = () => {
  useEffect(() => {
    // Set up an interval that updates the currentTime state every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toISOString()
  );
  return <DashBoard currentTime={currentTime} />;
};

export default DashBoardIndex;
