import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Task } from "..";
import AddTaskForm from "./AddTaskForm";
import AddCategoryForm from "./AddCategoryForm";

interface Props {
  handleSubmit: (task: Task) => void;
  category: Category[];
  handleAddCategory: (category: Category) => void;
}

const FormSelectors = ({
  handleSubmit,
  category,
  handleAddCategory,
}: Props) => {
  return (
    <Tabs defaultValue="createTask" className="w-fit">
      <TabsList>
        <TabsTrigger value="createTask">New Task</TabsTrigger>
        <TabsTrigger value="createCategory">New Category</TabsTrigger>
        <TabsTrigger value="deleteCategory">Delete a Category</TabsTrigger>
      </TabsList>
      <TabsContent value="createTask">
        <AddTaskForm category={category} handleSubmit={handleSubmit} />
      </TabsContent>
      <TabsContent value="createCategory">
        <AddCategoryForm handleAddCategory={handleAddCategory} />
      </TabsContent>
      <TabsContent value="deleteCategory">Delete a Category</TabsContent>
    </Tabs>
  );
};

export default FormSelectors;
