import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Category } from "..";
import ButtonLoading from "../../../components/ButtonLoading";

interface Props {
  handleDeleteCategory: (category: Category) => void;
  category: Category[];
}

const DeleteCategoryForm = ({ handleDeleteCategory, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    categoryId: z.string().min(3, "Category is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    setLoading(true);
    const index = category.findIndex((cat) => cat.title === "Uncategorized");
    apiClient
      .deleteCategory(formData.categoryId, category[index]._id)
      .then((res) => {
        setLoading(false);
        toast({
          title: "Success",
          description: "Category was deleted",
        });
        handleDeleteCategory(res.data.data);
        form.reset();
      })
      .catch((err) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: err.response
            ? JSON.stringify(err.response.data.message)
            : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        console.log(err);
      });
  }

  return (
    <div className="w-fit h-fit  items-center justify-items-center">
      <div className="flex flex-col gap-7 items-center">
        <Form {...form}>
          <Card className="w-[350px] shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Delete a Category</CardTitle>
              <CardDescription>
                Be careful while deleting because all tasks associated with the
                selected category will become uncategorized.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {category.map(
                              (cat, index) =>
                                cat.title !== "Uncategorized" && (
                                  <SelectItem key={index} value={cat._id}>
                                    {cat.title}
                                  </SelectItem>
                                )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>{" "}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-end">
                  {!loading ? (
                    <Button variant="destructive" type="submit">
                      Delete
                    </Button>
                  ) : (
                    <ButtonLoading />
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default DeleteCategoryForm;
