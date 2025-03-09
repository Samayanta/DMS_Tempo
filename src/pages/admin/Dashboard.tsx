import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );

  // Mock data
  const stats = {
    totalRetailers: 124,
    pendingApprovals: 8,
    totalProducts: 256,
    totalOrders: 1458,
    revenue: 125890.75,
    lowStockItems: 12,
  };

  const recentOrders = [
    {
      id: "ORD-9876",
      retailer: "ABC Store",
      date: "2023-06-05",
      amount: 1250.99,
      status: "pending",
    },
    {
      id: "ORD-9875",
      retailer: "XYZ Mart",
      date: "2023-06-04",
      amount: 780.5,
      status: "processing",
    },
    {
      id: "ORD-9874",
      retailer: "123 Retail",
      date: "2023-06-04",
      amount: 2450.75,
      status: "completed",
    },
    {
      id: "ORD-9873",
      retailer: "Best Buy Shop",
      date: "2023-06-03",
      amount: 890.25,
      status: "cancelled",
    },
    {
      id: "ORD-9872",
      retailer: "Quick Mart",
      date: "2023-06-03",
      amount: 560.3,
      status: "completed",
    },
  ];

  const pendingRetailers = [
    {
      id: "RET-1234",
      name: "City Supermarket",
      email: "contact@citysupermarket.com",
      date: "2023-06-05",
      type: "retail",
    },
    {
      id: "RET-1235",
      name: "Metro Groceries",
      email: "info@metrogroceries.com",
      date: "2023-06-04",
      type: "wholesale",
    },
    {
      id: "RET-1236",
      name: "Family Mart",
      email: "support@familymart.com",
      date: "2023-06-04",
      type: "retail",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Processing
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Check if user is admin (in a real app, this would be based on user role)
  const isAdmin = true; // Mock admin check

  if (!user || !isAdmin) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userName="Admin" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your distribution system</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/retailers")}
            >
              <Users className="mr-2 h-4 w-4" /> Manage Retailers
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/products")}
            >
              <Package className="mr-2 h-4 w-4" /> Manage Products
            </Button>
            <Button onClick={() => navigate("/admin/orders")}>
              <ShoppingCart className="mr-2 h-4 w-4" /> View Orders
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Retailers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.totalRetailers}</p>
                  <p className="text-sm text-gray-500">Total retailers</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">
                    {stats.pendingApprovals} pending approvals
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                  <p className="text-sm text-gray-500">Total products</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm">
                    {stats.lowStockItems} items low in stock
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.totalOrders}</p>
                  <p className="text-sm text-gray-500">Total orders</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm">
                    ${stats.revenue.toLocaleString()} total revenue
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest order activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Retailer
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Date
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                        Amount
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 text-sm font-medium">
                          {order.id}
                        </td>
                        <td className="py-3 px-2 text-sm">{order.retailer}</td>
                        <td className="py-3 px-2 text-sm">{order.date}</td>
                        <td className="py-3 px-2 text-sm text-right">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-sm text-center">
                          {getStatusBadge(order.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/admin/orders")}
              >
                View All Orders
              </Button>
            </CardFooter>
          </Card>

          {/* Pending Retailer Approvals */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Retailers waiting for approval</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRetailers.length > 0 ? (
                <div className="space-y-4">
                  {pendingRetailers.map((retailer) => (
                    <div
                      key={retailer.id}
                      className="border rounded-md p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{retailer.name}</h3>
                          <p className="text-sm text-gray-500">
                            {retailer.email}
                          </p>
                          <div className="flex items-center mt-1">
                            <Badge
                              variant="outline"
                              className="capitalize text-xs"
                            >
                              {retailer.type}
                            </Badge>
                            <span className="text-xs text-gray-500 ml-2">
                              Applied: {retailer.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => {
                              // In a real app, this would reject the retailer
                              console.log(`Rejected ${retailer.id}`);
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              // In a real app, this would approve the retailer
                              console.log(`Approved ${retailer.id}`);
                            }}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">All caught up!</h3>
                  <p className="text-gray-500">
                    No pending retailer approvals at the moment.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/admin/retailers")}
              >
                Manage All Retailers
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Sales Analytics */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Overview of sales performance</CardDescription>
              </div>
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={period === "daily" ? "default" : "ghost"}
                  className="rounded-none h-8"
                  onClick={() => setPeriod("daily")}
                >
                  Daily
                </Button>
                <Button
                  variant={period === "weekly" ? "default" : "ghost"}
                  className="rounded-none h-8"
                  onClick={() => setPeriod("weekly")}
                >
                  Weekly
                </Button>
                <Button
                  variant={period === "monthly" ? "default" : "ghost"}
                  className="rounded-none h-8"
                  onClick={() => setPeriod("monthly")}
                >
                  Monthly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">
                Sales chart would be displayed here
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
                <p className="text-2xl font-bold mt-1">
                  ${(stats.revenue / 1000).toFixed(1)}k
                </p>
                <div className="flex items-center mt-2 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12.5% from last {period}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-500">Orders</h3>
                <p className="text-2xl font-bold mt-1">128</p>
                <div className="flex items-center mt-2 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8.2% from last {period}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-500">
                  Average Order Value
                </h3>
                <p className="text-2xl font-bold mt-1">$982.45</p>
                <div className="flex items-center mt-2 text-red-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>-2.1% from last {period}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
