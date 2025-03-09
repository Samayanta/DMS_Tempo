import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  ArrowLeft,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Retailer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  registrationDate: string;
  lastOrderDate: string | null;
  totalOrders: number;
  totalSpent: number;
}

const RetailerManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(
    null,
  );
  const [retailers, setRetailers] = useState<Retailer[]>([]);

  // Load retailers from localStorage or initialize with mock data
  useEffect(() => {
    const savedRetailers = localStorage.getItem("retailers");
    if (savedRetailers) {
      try {
        setRetailers(JSON.parse(savedRetailers));
      } catch (error) {
        console.error("Failed to parse retailers from localStorage", error);
        initializeWithMockData();
      }
    } else {
      initializeWithMockData();
    }
  }, []);

  // Save retailers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("retailers", JSON.stringify(retailers));
  }, [retailers]);

  // Initialize with mock data
  const initializeWithMockData = () => {
    const mockRetailers: Retailer[] = [
      {
        id: "RET-1001",
        name: "City Supermarket",
        email: "contact@citysupermarket.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Cityville, CA 12345",
        type: "retail",
        status: "approved",
        registrationDate: "2023-01-15",
        lastOrderDate: "2023-06-01",
        totalOrders: 42,
        totalSpent: 28750.5,
      },
      {
        id: "RET-1002",
        name: "Metro Groceries",
        email: "info@metrogroceries.com",
        phone: "+1 (555) 987-6543",
        address: "456 Broad Ave, Metroville, NY 54321",
        type: "wholesale",
        status: "approved",
        registrationDate: "2023-02-20",
        lastOrderDate: "2023-06-03",
        totalOrders: 36,
        totalSpent: 42150.75,
      },
      {
        id: "RET-1003",
        name: "Family Mart",
        email: "support@familymart.com",
        phone: "+1 (555) 456-7890",
        address: "789 Oak Rd, Familytown, TX 67890",
        type: "retail",
        status: "pending",
        registrationDate: "2023-06-04",
        lastOrderDate: null,
        totalOrders: 0,
        totalSpent: 0,
      },
      {
        id: "RET-1004",
        name: "Wholesale Depot",
        email: "sales@wholesaledepot.com",
        phone: "+1 (555) 234-5678",
        address: "101 Warehouse Blvd, Depotville, IL 13579",
        type: "distribution",
        status: "approved",
        registrationDate: "2023-03-10",
        lastOrderDate: "2023-05-28",
        totalOrders: 28,
        totalSpent: 67890.25,
      },
      {
        id: "RET-1005",
        name: "Corner Shop",
        email: "hello@cornershop.com",
        phone: "+1 (555) 876-5432",
        address: "202 Corner St, Shopville, WA 24680",
        type: "retail",
        status: "rejected",
        registrationDate: "2023-05-30",
        lastOrderDate: null,
        totalOrders: 0,
        totalSpent: 0,
      },
    ];

    // Check for registered users and add them as retailers
    try {
      const registeredUsers = localStorage.getItem("registeredUsers");
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers);
        Object.values(users).forEach((user: any) => {
          if (user.app_metadata?.role === "retailer") {
            const newRetailer: Retailer = {
              id: `RET-${Math.floor(1000 + Math.random() * 9000)}`,
              name: user.user_metadata?.businessName || "New Business",
              email: user.email,
              phone: user.phone || "+1 (555) 000-0000",
              address: "Address not provided",
              type: "retail",
              status: user.user_metadata?.status || "pending",
              registrationDate: new Date(user.created_at)
                .toISOString()
                .split("T")[0],
              lastOrderDate: null,
              totalOrders: 0,
              totalSpent: 0,
            };

            // Only add if not already in the list
            if (!mockRetailers.some((r) => r.email === user.email)) {
              mockRetailers.push(newRetailer);
            }
          }
        });
      }
    } catch (error) {
      console.error("Error loading registered users:", error);
    }

    setRetailers(mockRetailers);
    localStorage.setItem("retailers", JSON.stringify(mockRetailers));
  };

  // Filter retailers based on search query and filters
  const filteredRetailers = retailers.filter((retailer) => {
    const matchesSearch =
      retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retailer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retailer.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || retailer.status === statusFilter;

    const matchesType = typeFilter === "all" || retailer.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
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

  const handleViewDetails = (retailer: Retailer) => {
    setSelectedRetailer(retailer);
    setShowDetailsDialog(true);
  };

  const handleApproveRetailer = (retailerId: string) => {
    setRetailers(
      retailers.map((retailer) =>
        retailer.id === retailerId
          ? { ...retailer, status: "approved" }
          : retailer,
      ),
    );

    // Also update in registeredUsers if it exists there
    try {
      const registeredUsers = localStorage.getItem("registeredUsers");
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers);
        const retailer = retailers.find((r) => r.id === retailerId);

        if (retailer) {
          Object.keys(users).forEach((email) => {
            if (users[email].email === retailer.email) {
              users[email].user_metadata.status = "approved";
            }
          });

          localStorage.setItem("registeredUsers", JSON.stringify(users));
        }
      }
    } catch (error) {
      console.error("Error updating registered user status:", error);
    }

    toast({
      title: "Retailer approved",
      description: "The retailer has been approved successfully.",
    });

    // Close dialog if the approved retailer is the selected one
    if (selectedRetailer?.id === retailerId) {
      setSelectedRetailer((prev) =>
        prev ? { ...prev, status: "approved" } : null,
      );
    }
  };

  const handleRejectRetailer = (retailerId: string) => {
    setRetailers(
      retailers.map((retailer) =>
        retailer.id === retailerId
          ? { ...retailer, status: "rejected" }
          : retailer,
      ),
    );

    // Also update in registeredUsers if it exists there
    try {
      const registeredUsers = localStorage.getItem("registeredUsers");
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers);
        const retailer = retailers.find((r) => r.id === retailerId);

        if (retailer) {
          Object.keys(users).forEach((email) => {
            if (users[email].email === retailer.email) {
              users[email].user_metadata.status = "rejected";
            }
          });

          localStorage.setItem("registeredUsers", JSON.stringify(users));
        }
      }
    } catch (error) {
      console.error("Error updating registered user status:", error);
    }

    toast({
      title: "Retailer rejected",
      description: "The retailer has been rejected.",
    });

    // Close dialog if the rejected retailer is the selected one
    if (selectedRetailer?.id === retailerId) {
      setSelectedRetailer((prev) =>
        prev ? { ...prev, status: "rejected" } : null,
      );
    }
  };

  // Check if user is admin (in a real app, this would be based on user role)
  const isAdmin = user?.app_metadata?.role === "admin";

  if (!user || !isAdmin) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userName="Admin" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Retailer Management</h1>
            <p className="text-gray-500">Manage and approve retailers</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Retailers</CardTitle>
                <CardDescription>
                  View and manage retailer accounts
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search retailers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="distribution">Distribution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">All Retailers</TabsTrigger>
                <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                <TabsTrigger value="active">Active Retailers</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredRetailers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            ID
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Retailer
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Type
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Registration Date
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Status
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredRetailers.map((retailer) => (
                          <tr key={retailer.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                              {retailer.id}
                            </td>
                            <td className="px-4 py-4">
                              <div>
                                <div className="font-medium">
                                  {retailer.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {retailer.email}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm capitalize">
                              {retailer.type}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              {retailer.registrationDate}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              {getStatusBadge(retailer.status)}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewDetails(retailer)}
                                >
                                  View
                                </Button>

                                {retailer.status === "pending" && (
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-500 border-red-200 hover:bg-red-50"
                                      onClick={() =>
                                        handleRejectRetailer(retailer.id)
                                      }
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() =>
                                        handleApproveRetailer(retailer.id)
                                      }
                                    >
                                      Approve
                                    </Button>
                                  </div>
                                )}

                                {retailer.status !== "pending" && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          navigate(
                                            `/admin/retailers/${retailer.id}/orders`,
                                          )
                                        }
                                      >
                                        View Orders
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          navigate(
                                            `/admin/retailers/${retailer.id}/edit`,
                                          )
                                        }
                                      >
                                        Edit Details
                                      </DropdownMenuItem>
                                      {retailer.status === "approved" && (
                                        <DropdownMenuItem
                                          className="text-red-500"
                                          onClick={() =>
                                            handleRejectRetailer(retailer.id)
                                          }
                                        >
                                          Suspend Account
                                        </DropdownMenuItem>
                                      )}
                                      {retailer.status === "rejected" && (
                                        <DropdownMenuItem
                                          className="text-green-500"
                                          onClick={() =>
                                            handleApproveRetailer(retailer.id)
                                          }
                                        >
                                          Reactivate Account
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No retailers found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery ||
                      statusFilter !== "all" ||
                      typeFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "No retailers have registered yet"}
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Pending tab - show only pending retailers */}
              <TabsContent value="pending" className="space-y-4">
                {filteredRetailers.filter((r) => r.status === "pending")
                  .length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            ID
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Retailer
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Type
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Registration Date
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredRetailers
                          .filter((r) => r.status === "pending")
                          .map((retailer) => (
                            <tr key={retailer.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                {retailer.id}
                              </td>
                              <td className="px-4 py-4">
                                <div>
                                  <div className="font-medium">
                                    {retailer.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {retailer.email}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm capitalize">
                                {retailer.type}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                {retailer.registrationDate}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(retailer)}
                                  >
                                    View
                                  </Button>
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-500 border-red-200 hover:bg-red-50"
                                      onClick={() =>
                                        handleRejectRetailer(retailer.id)
                                      }
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() =>
                                        handleApproveRetailer(retailer.id)
                                      }
                                    >
                                      Approve
                                    </Button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No pending applications
                    </h3>
                    <p className="text-gray-500">
                      All retailer applications have been processed.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Active tab - show only approved retailers */}
              <TabsContent value="active" className="space-y-4">
                {filteredRetailers.filter((r) => r.status === "approved")
                  .length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            ID
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Retailer
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Type
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Orders
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Total Spent
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredRetailers
                          .filter((r) => r.status === "approved")
                          .map((retailer) => (
                            <tr key={retailer.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                {retailer.id}
                              </td>
                              <td className="px-4 py-4">
                                <div>
                                  <div className="font-medium">
                                    {retailer.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {retailer.email}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm capitalize">
                                {retailer.type}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                {retailer.totalOrders}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                ${retailer.totalSpent.toFixed(2)}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(retailer)}
                                  >
                                    View
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          navigate(
                                            `/admin/retailers/${retailer.id}/orders`,
                                          )
                                        }
                                      >
                                        View Orders
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          navigate(
                                            `/admin/retailers/${retailer.id}/edit`,
                                          )
                                        }
                                      >
                                        Edit Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-red-500"
                                        onClick={() =>
                                          handleRejectRetailer(retailer.id)
                                        }
                                      >
                                        Suspend Account
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No active retailers
                    </h3>
                    <p className="text-gray-500">
                      There are no approved retailers at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Retailer Details Dialog */}
      {selectedRetailer && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Retailer Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedRetailer.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Business Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">{selectedRetailer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Business Type</p>
                    <p className="font-medium capitalize">
                      {selectedRetailer.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium">
                      {selectedRetailer.registrationDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div>{getStatusBadge(selectedRetailer.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{selectedRetailer.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedRetailer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedRetailer.phone}</p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-6 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="font-medium">
                      {selectedRetailer.totalOrders}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="font-medium">
                      ${selectedRetailer.totalSpent.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Order Date</p>
                    <p className="font-medium">
                      {selectedRetailer.lastOrderDate || "No orders yet"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center">
              <div>
                {selectedRetailer.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="text-red-500"
                      onClick={() => handleRejectRetailer(selectedRetailer.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" /> Reject Application
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveRetailer(selectedRetailer.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Approve
                      Application
                    </Button>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowDetailsDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default RetailerManagement;
