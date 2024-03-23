import ButtonLoading from "../ButtonLoading";
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
import { Input } from "@/components/ui/input";
//import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token != undefined) {
      navigate("/");
    }
  }, []);

  const formSchema = z.object({
    email: z.string().email("Enter a valid email").min(3, "Email is required"),
    password: z.string().min(1, "Password is required."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    setLoading(true);

    console.log(formData);
  }

  return (
    <div className="w-fit h-fit flex flex-row items-center justify-center mx-auto">
      <div className="flex flex-col gap-7 items-center">
        <Form {...form}>
          <Card className="w-[350px] shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>Enter your credentials</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!loading ? (
                  <Button type="submit">Submit</Button>
                ) : (
                  <ButtonLoading />
                )}
              </form>
            </CardContent>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
