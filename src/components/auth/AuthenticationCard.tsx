import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthenticationCardProps {
  defaultTab?: "login" | "register";
  onLoginSubmit?: (data: any) => void;
  onRegistrationSubmit?: (data: any) => void;
  onForgotPassword?: () => void;
  onVerifyEmail?: (email: string) => void;
  onVerifyPhone?: (phone: string) => void;
  isLoading?: boolean;
}

const AuthenticationCard: React.FC<AuthenticationCardProps> = ({
  defaultTab = "login",
  onLoginSubmit = () => {},
  onRegistrationSubmit = () => {},
  onForgotPassword = () => {},
  onVerifyEmail = () => {},
  onVerifyPhone = () => {},
  isLoading = false,
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="text-2xl font-bold text-center text-primary">
          {activeTab === "login" ? "Retailer Login" : "Retailer Registration"}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login"
            ? "Access your retailer account"
            : "Create a new retailer account"}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs
          defaultValue={defaultTab}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-0">
            <LoginForm
              onSubmit={onLoginSubmit}
              onForgotPassword={onForgotPassword}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="register" className="mt-0">
            <RegistrationForm
              onSubmit={onRegistrationSubmit}
              onVerifyEmail={onVerifyEmail}
              onVerifyPhone={onVerifyPhone}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {activeTab === "login" ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => setActiveTab("register")}
                className="text-primary hover:underline font-medium"
              >
                Register now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setActiveTab("login")}
                className="text-primary hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthenticationCard;
