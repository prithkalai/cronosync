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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiGuest from "@/services/api-guest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "../../../components/ui/use-toast";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("cronoToken");

    if (token != undefined) {
      navigate("/");
    }
  }, []);

  const formSchema = z.object({
    name: z.string().min(4, "Name is required").max(50),
    email: z.string().email("Enter a valid email").min(3, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    apiGuest
      .signup(formData.name, formData.email, formData.password)
      .then((res) => {
        localStorage.setItem("cronoToken", res.data.token);
        setLoading(false);
        toast({
          title: "Created Account",
          description: "Welcome to CronoSync. Happy Scheduling!",
        });
        navigate("/dashboard");
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
      });
    console.log(formData);
  }

  return (
    <div className="w-fit h-fit grid items-center justify-items-center mx-auto">
      <div className="flex flex-col gap-5 items-center">
        <Form {...form}>
          <Card className="w-[350px] shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>Enter your credentials</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

export default SignupForm;
