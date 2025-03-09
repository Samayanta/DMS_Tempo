import React, { useState } from "react";
import { ArrowRight, Building2, ShoppingBag, Users } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import AuthenticationCard from "./auth/AuthenticationCard";
import VerificationModal from "./auth/VerificationModal";
import SuccessMessage from "./common/SuccessMessage";

const Home: React.FC = () => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationType, setVerificationType] = useState<"email" | "phone">(
    "email",
  );
  const [contactValue, setContactValue] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLoginSubmit = (data: any) => {
    console.log("Login submitted:", data);
    // Redirect to the login page for Supabase authentication
    window.location.href = "/login";
  };

  const handleRegistrationSubmit = (data: any) => {
    console.log("Registration submitted:", data);
    // Redirect to the registration page for Supabase authentication
    window.location.href = "/register";
  };

  const handleVerifyEmail = (email: string) => {
    setContactValue(email);
    setVerificationType("email");
    setShowVerificationModal(true);
  };

  const handleVerifyPhone = (phone: string) => {
    setContactValue(phone);
    setVerificationType("phone");
    setShowVerificationModal(true);
  };

  const handleVerificationComplete = (code: string) => {
    console.log(`Verification code submitted: ${code}`);
    setShowVerificationModal(false);

    // If this was the final verification step, show success message
    if (verificationType === "phone") {
      setShowSuccessMessage(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Distribution Management System
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                A complete B2B platform connecting wholesalers and retailers.
                Manage inventory, place orders, and grow your business with our
                streamlined solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <button className="px-6 py-3 bg-primary text-white rounded-md font-medium flex items-center justify-center hover:bg-primary/90 transition-colors">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
                <Link to="/about">
                  <button className="px-6 py-3 bg-white text-primary border border-primary rounded-md font-medium hover:bg-gray-50 transition-colors">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80"
                alt="Distribution Management System"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Admin Dashboard</h3>
                <p className="text-gray-600">
                  Comprehensive admin interface with retailer approval system,
                  product management, and order tracking capabilities.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Retailer Portal</h3>
                <p className="text-gray-600">
                  Secure registration with verification, real-time inventory
                  view, and streamlined order placement process.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Order Management</h3>
                <p className="text-gray-600">
                  Efficient order processing with payment receipt uploads, QR
                  codes for offline transactions, and status tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-md mx-auto">
              {showSuccessMessage ? (
                <SuccessMessage
                  onClose={() => setShowSuccessMessage(false)}
                  onViewStatus={() => console.log("View status clicked")}
                />
              ) : (
                <AuthenticationCard
                  onLoginSubmit={handleLoginSubmit}
                  onRegistrationSubmit={handleRegistrationSubmit}
                  onVerifyEmail={handleVerifyEmail}
                  onVerifyPhone={handleVerifyPhone}
                />
              )}
            </div>
          </div>
        </section>

        {/* Verification Modal */}
        <VerificationModal
          open={showVerificationModal}
          onOpenChange={setShowVerificationModal}
          verificationType={verificationType}
          contactValue={contactValue}
          title={`${verificationType === "email" ? "Email" : "Phone"} Verification`}
          description={`Please enter the verification code we sent to your ${verificationType}.`}
          onVerify={handleVerificationComplete}
          onResend={() => console.log("Resend code requested")}
          onCancel={() => setShowVerificationModal(false)}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
