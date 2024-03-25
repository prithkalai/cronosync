import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import Masonry from "react-masonry-css";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DashBoard = () => {
  const tasks = [
    {
      taskData: "Scratch Nose",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:00:30Z",
      currentTime: "2024-01-01T00:00:15Z",
    },
    {
      taskData: "Blink Eyes",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:00:20Z",
      currentTime: "2024-01-01T00:00:10Z",
    },
    {
      taskData: "Check Phone",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:05:00Z",
      currentTime: "2024-01-01T00:02:30Z",
    },
    {
      taskData: "Take Sips of Water",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:30:00Z",
      currentTime: "2024-01-01T00:15:00Z",
    },
    {
      taskData: "Stretch Legs",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T01:00:00Z",
      currentTime: "2024-01-01T00:30:00Z",
    },
    {
      taskData: "Study Break",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:45:00Z",
      currentTime: "2024-01-01T00:22:30Z",
    },
    {
      taskData: "Adjust Seating Position",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T02:00:00Z",
      currentTime: "2024-01-01T01:00:00Z",
    },
    {
      taskData: "Glance Out the Window",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T03:00:00Z",
      currentTime: "2024-01-01T01:30:00Z",
    },
    {
      taskData: "Take Nyquil",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T12:00:00Z",
      currentTime: "2024-01-01T06:00:00Z",
    },
    {
      taskData: "Snack Time",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T04:00:00Z",
      currentTime: "2024-01-01T02:00:00Z",
    },
    {
      taskData: "Walk Around",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T06:00:00Z",
      currentTime: "2024-01-01T03:00:00Z",
    },
    {
      taskData: "Quick Meditation",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T08:00:00Z",
      currentTime: "2024-01-01T04:00:00Z",
    },
    {
      taskData: "Oil Hair",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-11T00:00:00Z",
      currentTime: "2024-01-06T00:00:00Z",
    },
    {
      taskData: "Trim Nails",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-15T00:00:00Z",
      currentTime: "2024-01-08T00:00:00Z",
    },
    {
      taskData: "Change Toothbrush",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-04-01T00:00:00Z",
      currentTime: "2024-02-15T00:00:00Z",
    },
  ];

  const breakpointColumnsObj = {
    default: 5,
    1407: 4,
    1161: 3,
    918: 2,
    677: 1,
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto">
      <div className="flex mt-20 gap-2 justify-center ml-4 mr-4">
        <div className="min-w-[150px]">
          <h1 className="font-thin">Categories</h1>
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="w-full flex gap-4"
          columnClassName="flex flex-col items-center gap-4"
        >
          {tasks.map((task, index) => (
            <TaskCard
              className="shadow-md h-fit w-full max-w-xs p-0"
              key={index}
              task={task}
            />
          ))}
        </Masonry>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className="fixed rounded-full bottom-5 right-5 p-4 h-fit">
            <FaPlus className="text-3xl" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new Task</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="h-[100px] w-full"></div>
    </div>
  );
};

export default DashBoard;
