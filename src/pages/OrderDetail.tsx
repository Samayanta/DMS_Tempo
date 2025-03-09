import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Package,
  ArrowLeft,
  Download,
  Upload,
  Printer,
  Clock,
  CheckCircle,
  XCircle,
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
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);

  // Mock order data
  const orderData = {
    id: orderId || "ORD-001",
    date: "2023-05-15",
    status: "processing",
    paymentStatus: "verified",
    paymentMethod: "online",
    total: 1250.99,
    subtotal: 1200.99,
    tax: 50.0,
    items: [
      {
        id: 1,
        name: "Premium Widget",
        quantity: 5,
        price: 29.99,
        total: 149.95,
      },
      { id: 2, name: "Deluxe Gadget", quantity: 2, price: 49.99, total: 99.98 },
      {
        id: 3,
        name: "Standard Tool",
        quantity: 10,
        price: 19.99,
        total: 199.9,
      },
      {
        id: 4,
        name: "Basic Component",
        quantity: 20,
        price: 9.99,
        total: 199.8,
      },
    ],
    shippingAddress: "123 Business Street, City, Country",
    trackingNumber: "TRK12345678",
    estimatedDelivery: "2023-05-20",
    notes: "Please deliver during business hours",
  };

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

  const getOrderProgress = (status: string) => {
    switch (status) {
      case "pending":
        return 20;
      case "approved":
        return 40;
      case "processing":
        return 60;
      case "completed":
        return 100;
      case "cancelled":
        return 0;
      default:
        return 0;
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
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/orders")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
            </Button>
            <h1 className="text-2xl font-bold">Order {orderData.id}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Order Summary</CardTitle>
                      <CardDescription>
                        Placed on {orderData.date}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(orderData.status)}
                      {getPaymentStatusBadge(orderData.paymentStatus)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">
                        Order Progress
                      </span>
                    </div>
                    <Progress
                      value={getOrderProgress(orderData.status)}
                      className="h-2"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Placed</span>
                      <span>Approved</span>
                      <span>Processing</span>
                      <span>Completed</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                            Item
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                            Quantity
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                            Price
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orderData.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-center text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-4 text-sm text-right text-gray-500">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-sm text-right font-medium text-gray-900">
                              ${item.total.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t">
                          <td colSpan={2} className="px-4 py-3"></td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-500">
                            Subtotal
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                            ${orderData.subtotal.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="px-4 py-3"></td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-500">
                            Tax
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                            ${orderData.tax.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td colSpan={2} className="px-4 py-3"></td>
                          <td className="px-4 py-3 text-base text-right font-bold text-gray-900">
                            Total
                          </td>
                          <td className="px-4 py-3 text-base text-right font-bold text-gray-900">
                            ${orderData.total.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 mr-2" /> Print Order
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/orders/${orderData.id}/invoice`)}
                  >
                    <Download className="h-4 w-4 mr-2" /> Download Invoice
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Order Details */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Shipping Address
                    </h3>
                    <p className="mt-1 text-sm">{orderData.shippingAddress}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Payment Method
                    </h3>
                    <p className="mt-1 text-sm capitalize">
                      {orderData.paymentMethod}
                    </p>
                  </div>

                  {orderData.trackingNumber && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Tracking Number
                        </h3>
                        <p className="mt-1 text-sm">
                          {orderData.trackingNumber}
                        </p>
                      </div>
                    </>
                  )}

                  {orderData.estimatedDelivery && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Estimated Delivery
                        </h3>
                        <p className="mt-1 text-sm">
                          {orderData.estimatedDelivery}
                        </p>
                      </div>
                    </>
                  )}

                  {orderData.notes && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Notes
                        </h3>
                        <p className="mt-1 text-sm">{orderData.notes}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  {orderData.paymentStatus === "pending" ? (
                    <div className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                        <div className="flex">
                          <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                          <div>
                            <h3 className="text-sm font-medium text-yellow-800">
                              Payment Pending
                            </h3>
                            <p className="text-sm text-yellow-700 mt-1">
                              Please complete your payment to process this
                              order.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button onClick={() => setShowUploadDialog(true)}>
                          <Upload className="h-4 w-4 mr-2" /> Upload Payment
                          Receipt
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowQRDialog(true)}
                        >
                          <Package className="h-4 w-4 mr-2" /> View QR Code for
                          Payment
                        </Button>
                      </div>
                    </div>
                  ) : orderData.paymentStatus === "verified" ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">
                            Payment Verified
                          </h3>
                          <p className="text-sm text-green-700 mt-1">
                            Your payment has been verified and your order is
                            being processed.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex">
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        <div>
                          <h3 className="text-sm font-medium text-red-800">
                            Payment Rejected
                          </h3>
                          <p className="text-sm text-red-700 mt-1">
                            Your payment was rejected. Please contact support
                            for assistance.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Payment Receipt Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Payment Receipt</DialogTitle>
            <DialogDescription>
              Please upload a clear image or PDF of your payment receipt.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">
                Drag and drop your file here, or click to browse
              </p>
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" className="mt-2">
                  Browse Files
                </Button>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // In a real app, this would upload the file
                setShowUploadDialog(false);
              }}
            >
              Upload Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to make an offline payment for your order.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="bg-white p-4 rounded-md border">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                {/* This would be a real QR code in production */}
                <Package className="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>Order ID: {orderData.id}</p>
            <p>Amount: ${orderData.total.toFixed(2)}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowQRDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default OrderDetail;
