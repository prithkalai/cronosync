import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchInitialData } from "@/hooks/useFetchInitialData";
import { useHandleData } from "@/hooks/useHandleData";
import TaskCard from "@/pages/DashBoard/TaskCard";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Masonry from "react-masonry-css";
import { Category, Task } from ".";
import FormSelectors from "./FormSelectors";
import Selector from "./Selector";
import UserGuide from "./UserGuide";

interface Props {
  currentTime: string;
}

const DashBoard = ({ currentTime }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [displayTasks, setDisplayTasks] = useState<Task[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [currCategory, setCurrCategory] = useState<string>("");
  const {
    handleDelete,
    handleReset,
    handleSubmit,
    handleAddCategory,
    handleDeleteCategory,
  } = useHandleData({
    tasks,
    category,
    currCategory,
    setDisplayTasks,
    setTasks,
    setCategory,
  });

  useFetchInitialData({
    setTasks: setTasks,
    setDisplayTasks: setDisplayTasks,
    setCategory: setCategory,
    setCurrCategory: setCurrCategory,
  });

  const breakpointColumnsObj = {
    default: 5,
    1407: 4,
    1161: 3,
    918: 2,
    677: 1,
  };

  // FIXME: Fix the auto-scroll issue on dialog close

  return (
    <div className="w-full max-w-[1500px] h-full mx-auto">
      <div className="flex flex-col mt-6 gap-2 justify-center ml-4 mr-4">
        {tasks.length == 0 ? (
          <UserGuide className="fixed bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2" />
        ) : (
          <>
            <Selector category={category} setCurrCategory={setCurrCategory} />

            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="w-full flex gap-4"
              columnClassName="flex flex-col items-center gap-4"
            >
              {displayTasks.map((task, index) => (
                <TaskCard
                  className="shadow-md h-fit w-full max-w-xs p-0"
                  key={index}
                  task={task}
                  currentTime={currentTime}
                  handleReset={handleReset}
                  handleDelete={handleDelete}
                />
              ))}
            </Masonry>
          </>
        )}
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className="fixed rounded-full bottom-5 right-5 p-4 h-fit">
            <IoMenuOutline className="text-3xl" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note</DialogTitle>
            <DialogDescription>
              It is recommended to add a short titles for tasks and categories
              so its quickly and easily readable.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex justify-center">
            <FormSelectors
              handleDeleteCategory={handleDeleteCategory}
              handleAddCategory={handleAddCategory}
              category={category}
              handleSubmit={handleSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="h-[100px] w-full"></div>
    </div>
  );
};

export default DashBoard;
