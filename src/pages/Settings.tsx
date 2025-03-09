import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Bell, Shield, Smartphone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Settings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    orderUpdates: true,
    promotions: false,
    newsletter: false,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleSavePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description:
        "Your notification preferences have been updated successfully.",
    });
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userName={user.email || "User"} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

          <Tabs defaultValue="profile">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <TabsList className="flex flex-row md:flex-col w-full h-auto">
                  <TabsTrigger value="profile" className="justify-start w-full">
                    <User className="h-4 w-4 mr-2" /> Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className="justify-start w-full"
                  >
                    <Lock className="h-4 w-4 mr-2" /> Password
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start w-full"
                  >
                    <Bell className="h-4 w-4 mr-2" /> Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="justify-start w-full"
                  >
                    <Shield className="h-4 w-4 mr-2" /> Security
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="md:w-3/4">
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            defaultValue="John"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            defaultValue="Doe"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          defaultValue={user.email || ""}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          defaultValue="+1 (555) 123-4567"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          defaultValue="123 Business Street"
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            defaultValue="New York"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            defaultValue="10001"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          defaultValue="United States"
                          className="mt-1"
                        />
                      </div>

                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-blue-700 text-sm">
                          Your password should be at least 8 characters long and
                          include a mix of letters, numbers, and special
                          characters.
                        </p>
                      </div>

                      <Button onClick={handleSavePassword}>
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Notification Channels
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Bell className="h-4 w-4 text-gray-500" />
                              <Label htmlFor="emailNotifications">
                                Email Notifications
                              </Label>
                            </div>
                            <Switch
                              id="emailNotifications"
                              checked={notificationSettings.email}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  email: checked,
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Smartphone className="h-4 w-4 text-gray-500" />
                              <Label htmlFor="smsNotifications">
                                SMS Notifications
                              </Label>
                            </div>
                            <Switch
                              id="smsNotifications"
                              checked={notificationSettings.sms}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  sms: checked,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Notification Types
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="orderUpdates">Order Updates</Label>
                            <Switch
                              id="orderUpdates"
                              checked={notificationSettings.orderUpdates}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  orderUpdates: checked,
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="promotions">
                              Promotions and Offers
                            </Label>
                            <Switch
                              id="promotions"
                              checked={notificationSettings.promotions}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  promotions: checked,
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="newsletter">Newsletter</Label>
                            <Switch
                              id="newsletter"
                              checked={notificationSettings.newsletter}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  newsletter: checked,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleSaveNotifications}>
                        Save Preferences
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Two-Factor Authentication
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              Protect your account with 2FA
                            </p>
                            <p className="text-sm text-gray-500">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Button variant="outline">Enable 2FA</Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Login Sessions
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-sm text-gray-500">
                                  Started: Today, 10:30 AM
                                </p>
                                <p className="text-sm text-gray-500">
                                  IP: 192.168.1.1
                                </p>
                                <p className="text-sm text-gray-500">
                                  Device: Chrome on Windows
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                Active
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="mt-4">
                          Sign Out All Devices
                        </Button>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Delete Account
                        </h3>
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                          <p className="text-red-700 text-sm">
                            Warning: This action is irreversible. All your data
                            will be permanently deleted.
                          </p>
                        </div>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
