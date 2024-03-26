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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonLoading from "./ButtonLoading";
import apiClient from "@/services/apiClient";
import { Task } from "@/pages/DashBoard";

interface Props {
  handleSubmit: (task: Task) => void;
}

const AddTaskForm = ({ handleSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    taskData: z.string().min(3, "Task is required."),
    interval: z.string().min(1, "Please enter a valid number"),
    intervalType: z.enum([
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskData: "",
      interval: "",
      intervalType: undefined,
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    setLoading(true);
    apiClient
      .addTasks(
        formData.taskData,
        `${formData.interval} ${formData.intervalType}`
      )
      .then((res) => {
        setLoading(false);
        toast({
          title: "Success",
          description: "New task added.",
        });
        handleSubmit(res.data.data);
        form.reset();
      })
      .catch((err) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: err.response ? err.response.data : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        console.log(err);
      });
    console.log(
      `{ title: ${formData.taskData}, interval: ${formData.interval} ${formData.intervalType} }`
    );
  }

  return (
    <div className="w-fit h-fit  items-center justify-items-center">
      <div className="flex flex-col gap-7 items-center">
        <Form {...form}>
          <Card className="w-[350px] shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Task</CardTitle>
              <CardDescription>Create a new task</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="taskData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interval</FormLabel>
                      <div className="flex gap-4">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Number"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <Controller
                          control={form.control}
                          name="intervalType"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select onValueChange={field.onChange}>
                                  <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Duration" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="years">
                                      Year(s)
                                    </SelectItem>
                                    <SelectItem value="months">
                                      Month(s)
                                    </SelectItem>
                                    <SelectItem value="days">Day(s)</SelectItem>
                                    <SelectItem value="hours">
                                      Hour(s)
                                    </SelectItem>
                                    <SelectItem value="minutes">
                                      Minute(s)
                                    </SelectItem>
                                    <SelectItem value="seconds">
                                      Second(s)
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormDescription>
                        Enter the duration between which a reminder should be
                        sent.
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

export default AddTaskForm;
