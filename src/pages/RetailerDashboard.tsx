import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Clock,
  FileText,
  Settings,
  AlertTriangle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RetailerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock retailer data - in a real app, this would come from your database
  const retailerData = {
    id: "RET-1001",
    name: "Sample Retail Store",
    status: "approved", // This would be "pending" or "approved" or "rejected"
    lastOrderDate: "2023-06-01",
    totalOrders: 12,
    totalSpent: 4850.75,
    pendingOrders: 2,
    recentActivity: [
      {
        id: "ACT-001",
        type: "order_placed",
        date: "2023-06-01",
        description: "Order #ORD-001 placed",
      },
      {
        id: "ACT-002",
        type: "payment_confirmed",
        date: "2023-05-28",
        description: "Payment for Order #ORD-002 confirmed",
      },
      {
        id: "ACT-003",
        type: "order_delivered",
        date: "2023-05-25",
        description: "Order #ORD-003 delivered",
      },
    ],
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  // If retailer is not approved, show pending approval message
  if (retailerData.status === "pending") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header isLoggedIn={true} userName={user.email || "User"} />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-lg shadow-md">
              <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-yellow-700 mb-4">
                Account Pending Approval
              </h1>
              <p className="text-gray-600 mb-6">
                Your retailer account is currently under review by our admin
                team. You'll receive an email notification once your account has
                been approved.
              </p>
              <p className="text-gray-600 mb-6">
                This process typically takes 1-2 business days. If you have any
                questions, please contact our support team.
              </p>
              <Button variant="outline" onClick={() => navigate("/profile")}>
                View Profile
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // If retailer is rejected, show rejection message
  if (retailerData.status === "rejected") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header isLoggedIn={true} userName={user.email || "User"} />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-red-50 border-l-4 border-red-400 p-8 rounded-lg shadow-md">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-red-700 mb-4">
                Account Application Rejected
              </h1>
              <p className="text-gray-600 mb-6">
                We regret to inform you that your retailer account application
                has been rejected. This could be due to incomplete information
                or not meeting our retailer criteria.
              </p>
              <p className="text-gray-600 mb-6">
                Please contact our support team for more information and to
                discuss the next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate("/profile")}>
                  View Profile
                </Button>
                <Button onClick={() => navigate("/contact")}>
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // If retailer is approved, show dashboard
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userName={user.email || "User"} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Retailer Dashboard</h1>
              <p className="text-gray-500 mt-1">
                Welcome back, {retailerData.name}
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" onClick={() => navigate("/orders")}>
                <FileText className="mr-2 h-4 w-4" /> My Orders
              </Button>
              <Button onClick={() => navigate("/products")}>
                <Package className="mr-2 h-4 w-4" /> Browse Products
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">
                      {retailerData.totalOrders}
                    </p>
                    <p className="text-sm text-gray-500">Total orders</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">
                      {retailerData.pendingOrders} pending orders
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/orders")}
                >
                  View All Orders
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">
                      ${retailerData.totalSpent.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">Lifetime purchases</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm">
                      Last order: {retailerData.lastOrderDate}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/profile")}
                >
                  View Account
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full justify-start"
                  onClick={() => navigate("/products")}
                >
                  <Package className="mr-2 h-4 w-4" /> Browse Catalog
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> View Cart
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" /> Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {retailerData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="mr-4">
                      {activity.type === "order_placed" && (
                        <div className="bg-blue-100 p-2 rounded-full">
                          <ShoppingCart className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                      {activity.type === "payment_confirmed" && (
                        <div className="bg-green-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                      {activity.type === "order_delivered" && (
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Package className="h-5 w-5 text-purple-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RetailerDashboard;
