import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
}

const LoginForm = ({
  onSubmit = () => {},
  onForgotPassword = () => {},
  isLoading = false,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleSubmit = (data: LoginFormValues) => {
    // Pass the data to the parent component for Supabase authentication
    onSubmit(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === "email" ? "phone" : "email");
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <div className="flex rounded-md overflow-hidden border border-gray-300">
          <button
            type="button"
            className={`px-4 py-2 ${loginMethod === "email" ? "bg-primary text-white" : "bg-gray-100"}`}
            onClick={() => setLoginMethod("email")}
          >
            Email
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${loginMethod === "phone" ? "bg-primary text-white" : "bg-gray-100"}`}
            onClick={() => setLoginMethod("phone")}
          >
            Phone
          </button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {loginMethod === "email" ? "Email" : "Phone Number"}
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {loginMethod === "email" ? (
                          <Mail className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Phone className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                      <Input
                        {...field}
                        placeholder={
                          loginMethod === "email"
                            ? "Enter your email"
                            : "Enter your phone number"
                        }
                        type={loginMethod === "email" ? "email" : "tel"}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
