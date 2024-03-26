import { useToast } from "@/components/ui/use-toast";
import { Category, Task } from "@/pages/DashBoard";
import apiClient from "@/services/api-client";
import { useEffect } from "react";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setDisplayTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
  setCurrCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const useFetchInitialData = ({
  setTasks,
  setDisplayTasks,
  setCategory,
  setCurrCategory,
}: Props) => {
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksRes = await apiClient.getTasks();
        setTasks(tasksRes.data.data);
        setDisplayTasks(tasksRes.data.data);
        const categoriesRes = await apiClient.getCategory();
        setCategory(categoriesRes.data.data);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to retrieve data.",
        });
      }
    };
    fetchData();
  }, []);
};
