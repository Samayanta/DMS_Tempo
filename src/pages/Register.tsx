import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthenticationCard from "@/components/auth/AuthenticationCard";
import VerificationModal from "@/components/auth/VerificationModal";
import SuccessMessage from "@/components/common/SuccessMessage";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Register: React.FC = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationType, setVerificationType] = useState<"email" | "phone">(
    "email",
  );
  const [contactValue, setContactValue] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrationSubmit = async (data: any) => {
    setRegistrationData(data);
    setIsLoading(true);

    try {
      // For email/password registration with Supabase
      if (data.email && data.password) {
        const { error } = await signUp(data.email, data.password, data.name);

        if (error) {
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: error.message,
          });
          setIsLoading(false);
          return;
        }
      }

      // Store additional user data in a separate table (mock implementation)
      if (registrationData) {
        // In a real app, this would save to Supabase
        console.log("Would save profile data:", {
          business_name: data.name,
          email: data.email,
          phone: data.phone,
          status: "pending",
        });
      }

      // Show email verification modal
      setContactValue(data.email);
      setVerificationType("email");
      setShowVerificationModal(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = (code: string) => {
    // In a real app, this would verify the code with your backend
    console.log(`Verification code submitted: ${code}`);
    setShowVerificationModal(false);

    // If phone is provided, show phone verification
    if (registrationData?.phone) {
      setContactValue(registrationData.phone);
      setVerificationType("phone");
      setShowVerificationModal(true);
    } else {
      // If no phone, show success message
      setShowSuccessMessage(true);
    }
  };

  const handleVerifyPhone = (code: string) => {
    // In a real app, this would verify the code with your backend
    console.log(`Verification code submitted: ${code}`);
    setShowVerificationModal(false);

    // Show success message after both verifications
    setShowSuccessMessage(true);
  };

  const handleResendCode = () => {
    // In a real app, this would resend the verification code
    console.log(`Resending code to ${contactValue}`);
    toast({
      title: "Code Resent",
      description: `A new verification code has been sent to ${contactValue}`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container max-w-md px-4">
          {showSuccessMessage ? (
            <SuccessMessage
              onClose={() => navigate("/")}
              onViewStatus={() => navigate("/retailer/dashboard")}
            />
          ) : (
            <AuthenticationCard
              defaultTab="register"
              onRegistrationSubmit={handleRegistrationSubmit}
              onVerifyEmail={() => {}}
              onVerifyPhone={() => {}}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      {/* Verification Modal */}
      <VerificationModal
        open={showVerificationModal}
        onOpenChange={setShowVerificationModal}
        verificationType={verificationType}
        contactValue={contactValue}
        title={`${verificationType === "email" ? "Email" : "Phone"} Verification`}
        description={`Please enter the verification code we sent to your ${verificationType}.`}
        onVerify={
          verificationType === "email" ? handleVerifyEmail : handleVerifyPhone
        }
        onResend={handleResendCode}
        onCancel={() => setShowVerificationModal(false)}
      />

      <Footer />
    </div>
  );
};

export default Register;
