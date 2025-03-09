import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingBag, CreditCard, Settings, LogOut } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { supabase } from "@/lib/supabase";

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        // Mock profile data instead of fetching from Supabase
        const mockProfileData = {
          business_name: "Sample Business",
          business_type: "retail",
          registration_number: "REG123456",
          address: "123 Business Street, City, Country",
          owner_name: user.email?.split("@")[0] || "Store Owner",
          email: user.email,
          phone: "+1 (555) 123-4567",
          alternate_phone: "+1 (555) 987-6543",
          status: "pending",
        };

        setProfileData(mockProfileData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        isLoggedIn={true}
        userName={profileData?.owner_name || user.email || "User"}
        userInitials={(profileData?.owner_name || user.email || "U").charAt(0)}
      />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate("/profile")}
                    >
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate("/orders")}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" /> Orders
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate("/payments")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Payments
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate("/settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    View and update your profile details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">
                      Loading profile data...
                    </div>
                  ) : profileData ? (
                    <Tabs defaultValue="business">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="business">
                          Business Details
                        </TabsTrigger>
                        <TabsTrigger value="contact">
                          Contact Information
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="business" className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Business Name
                            </h3>
                            <p className="mt-1">
                              {profileData.business_name || "Not provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Business Type
                            </h3>
                            <p className="mt-1 capitalize">
                              {profileData.business_type || "Not provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Registration Number
                            </h3>
                            <p className="mt-1">
                              {profileData.registration_number ||
                                "Not provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Status
                            </h3>
                            <p className="mt-1">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profileData.status === "approved" ? "bg-green-100 text-green-800" : profileData.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                              >
                                {profileData.status
                                  ? profileData.status.charAt(0).toUpperCase() +
                                    profileData.status.slice(1)
                                  : "Unknown"}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Business Address
                          </h3>
                          <p className="mt-1">
                            {profileData.address || "Not provided"}
                          </p>
                        </div>

                        <div className="pt-4">
                          <Button>Edit Business Details</Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="contact" className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Owner Name
                            </h3>
                            <p className="mt-1">
                              {profileData.owner_name || "Not provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Email Address
                            </h3>
                            <p className="mt-1">
                              {profileData.email ||
                                user.email ||
                                "Not provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Phone Number
                            </h3>
                            <p className="mt-1">
                              {profileData.phone || "Not provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Alternate Phone
                            </h3>
                            <p className="mt-1">
                              {profileData.alternate_phone || "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button>Edit Contact Information</Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="text-center py-4">
                      <p className="mb-4">
                        No profile data found. Please complete your
                        registration.
                      </p>
                      <Button onClick={() => navigate("/register")}>
                        Complete Registration
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
