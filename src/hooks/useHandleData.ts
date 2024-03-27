import { Category, Task } from "@/pages/DashBoard";
import { useEffect } from "react";

interface Props {
  tasks: Task[];
  category: Category[];
  currCategory: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setDisplayTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const useHandleData = ({
  tasks,
  category,
  currCategory,
  setDisplayTasks,
  setTasks,
  setCategory,
}: Props) => {
  // Update displayTasks whenever tasks or currCategory changes
  useEffect(() => {
    filterTasksByCategory(currCategory);
  }, [tasks, currCategory]);

  const filterTasksByCategory = (category: string) => {
    if (category === "all" || category === "") {
      setDisplayTasks(tasks);
    } else {
      const filteredTasks = tasks.filter(
        (task) => task.category.title === category
      );
      setDisplayTasks(filteredTasks);
    }
  };

  const handleReset = (newTask: Task) => {
    const newTasks = tasks.map((task) =>
      task._id === newTask._id ? newTask : task
    );
    setTasks(newTasks);
    // No need to manually update displayTasks due to useEffect
  };

  const handleSubmit = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
    // displayTasks will be automatically updated via useEffect
  };

  const handleDelete = (deletedTask: Task) => {
    setTasks(tasks.filter((task) => task._id !== deletedTask._id));
    // displayTasks will be automatically updated via useEffect
  };

  const handleAddCategory = (newCategory: Category) => {
    setCategory((prev) => [...prev, newCategory]);
  };

  const handleDeleteCategory = (deletedCategory: Category) => {
    setCategory(category.filter((cat) => cat._id !== deletedCategory._id));
  };

  return {
    handleReset,
    handleDelete,
    handleSubmit,
    handleAddCategory,
    handleDeleteCategory,
  };
};
