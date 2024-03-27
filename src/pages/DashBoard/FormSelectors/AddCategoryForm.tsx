import ButtonLoading from "@/components/ButtonLoading";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Category } from "..";

interface Props {
  handleAddCategory: (category: Category) => void;
}

const AddCategoryForm = ({ handleAddCategory }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    title: z.string().min(3, "Category is required."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    setLoading(true);
    apiClient
      .addCategory(formData.title)
      .then((res) => {
        setLoading(false);
        toast({
          title: "Success",
          description: "New Category added.",
        });
        handleAddCategory(res.data.data);
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
              <CardTitle className="text-xl">Category</CardTitle>
              <CardDescription>Create a new category.</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>{" "}
                      <FormDescription>
                        Choose a short and easy name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-end">
                  {!loading ? (
                    <Button type="submit">Add</Button>
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

export default AddCategoryForm;
