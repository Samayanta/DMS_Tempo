import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Orders: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock orders data
  const mockOrders = [
    {
      id: "ORD-001",
      date: "2023-05-15",
      total: 1250.99,
      status: "completed",
      items: 12,
      paymentStatus: "verified",
    },
    {
      id: "ORD-002",
      date: "2023-05-20",
      total: 780.5,
      status: "processing",
      items: 8,
      paymentStatus: "verified",
    },
    {
      id: "ORD-003",
      date: "2023-05-25",
      total: 450.75,
      status: "pending",
      items: 5,
      paymentStatus: "pending",
    },
    {
      id: "ORD-004",
      date: "2023-05-28",
      total: 1890.25,
      status: "cancelled",
      items: 15,
      paymentStatus: "rejected",
    },
    {
      id: "ORD-005",
      date: "2023-06-01",
      total: 560.3,
      status: "approved",
      items: 6,
      paymentStatus: "verified",
    },
  ];

  const filteredOrders = mockOrders
    .filter((order) => filterStatus === "all" || order.status === filterStatus)
    .filter((order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );

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
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Approved
          </Badge>
        );
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
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

  const getPaymentStatusBadge = (status: string) => {
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
      case "verified":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userName={user.email || "User"} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-gray-500 mt-1">View and track your orders</p>
            </div>
            <Button
              onClick={() => navigate("/products")}
              className="mt-4 md:mt-0"
            >
              <Package className="mr-2 h-4 w-4" /> Place New Order
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    Track and manage your orders
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by order ID"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-40">
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-left">
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">
                              Order ID
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">
                              Date
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">
                              Items
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">
                              Total
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">
                              Status
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">
                              Payment
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                {order.id}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500">
                                {order.date}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500">
                                {order.items}
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                {getStatusBadge(order.status)}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                {getPaymentStatusBadge(order.paymentStatus)}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    navigate(`/orders/${order.id}`)
                                  }
                                >
                                  <FileText className="h-4 w-4 mr-1" /> View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No orders found
                      </h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery
                          ? "Try a different search term"
                          : "You haven't placed any orders yet"}
                      </p>
                      <Button onClick={() => navigate("/products")}>
                        Browse Products
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Other tab contents would be similar but filtered by status */}
                <TabsContent value="pending" className="space-y-4">
                  {/* Similar content but filtered for pending orders */}
                </TabsContent>
                <TabsContent value="processing" className="space-y-4">
                  {/* Similar content but filtered for processing orders */}
                </TabsContent>
                <TabsContent value="completed" className="space-y-4">
                  {/* Similar content but filtered for completed orders */}
                </TabsContent>
                <TabsContent value="cancelled" className="space-y-4">
                  {/* Similar content but filtered for cancelled orders */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
