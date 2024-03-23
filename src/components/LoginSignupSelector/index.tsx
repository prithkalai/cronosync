import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LoginSignupSelector = () => {
  return (
    <Tabs defaultValue="login" className="w-fit">
      <TabsList>
        <TabsTrigger value="login">Login to existing Account</TabsTrigger>
        <TabsTrigger value="signup">Create a new Account</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
};

export default LoginSignupSelector;
