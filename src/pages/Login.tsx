import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthenticationCard from "@/components/auth/AuthenticationCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.identifier, data.password);

      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      // Redirect happens automatically based on user role in App.tsx
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container max-w-md px-4">
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Demo Credentials</AlertTitle>
            <AlertDescription className="text-blue-700">
              <p className="mb-1">
                <strong>Admin:</strong> admin@example.com / admin123
              </p>
              <p>
                <strong>Retailer:</strong> retailer@example.com / retailer123
              </p>
            </AlertDescription>
          </Alert>

          <AuthenticationCard
            defaultTab="login"
            onLoginSubmit={handleLoginSubmit}
            isLoading={isLoading}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
