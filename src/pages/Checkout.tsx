import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Building,
  Truck,
  ArrowLeft,
  CheckCircle,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<"online" | "offline">(
    "online",
  );
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Mock cart summary
  const cartSummary = {
    items: 3,
    subtotal: 149.95,
    discount: 10.0,
    tax: 6.99,
    shipping: 5.0,
    total: 151.94,
  };

  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to the backend
    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);

    toast({
      title: "Order placed successfully",
      description: `Your order #${newOrderId} has been placed successfully.`,
    });
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header isLoggedIn={true} userName={user.email || "User"} />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Your order #{orderId} has been placed successfully.
              </p>

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Order Total:</span>
                  <span className="font-semibold">
                    ${cartSummary.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="font-semibold capitalize">
                    {paymentMethod}
                  </span>
                </div>
              </div>

              {paymentMethod === "offline" && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
                  <p className="text-blue-700 text-sm">
                    Please visit our store with your order ID to make the
                    payment and collect your items.
                  </p>
                </div>
              )}

              <div className="flex flex-col space-y-3">
                <Button onClick={() => navigate(`/orders/${orderId}`)}>
                  View Order Details
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Return to Home
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userName={user.email || "User"} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/cart")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cart
            </Button>
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping & Payment</CardTitle>
                  <CardDescription>Complete your order details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="shipping">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="shipping">
                        <Truck className="h-4 w-4 mr-2" /> Shipping
                      </TabsTrigger>
                      <TabsTrigger value="billing">
                        <Building className="h-4 w-4 mr-2" /> Billing
                      </TabsTrigger>
                      <TabsTrigger value="payment">
                        <CreditCard className="h-4 w-4 mr-2" /> Payment
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="shipping" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="Enter first name"
                            className="mt-1"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Enter last name"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          placeholder="Enter street address"
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="Enter city"
                            className="mt-1"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            placeholder="Enter postal code"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="Enter country"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter phone number"
                          className="mt-1"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="billing" className="space-y-4 pt-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <input
                          type="checkbox"
                          id="sameAsShipping"
                          className="rounded"
                        />
                        <Label htmlFor="sameAsShipping">
                          Same as shipping address
                        </Label>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="billingFirstName">First Name</Label>
                          <Input
                            id="billingFirstName"
                            placeholder="Enter first name"
                            className="mt-1"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="billingLastName">Last Name</Label>
                          <Input
                            id="billingLastName"
                            placeholder="Enter last name"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="billingAddress">Address</Label>
                        <Input
                          id="billingAddress"
                          placeholder="Enter street address"
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="billingCity">City</Label>
                          <Input
                            id="billingCity"
                            placeholder="Enter city"
                            className="mt-1"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="billingPostalCode">Postal Code</Label>
                          <Input
                            id="billingPostalCode"
                            placeholder="Enter postal code"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="billingCountry">Country</Label>
                        <Input
                          id="billingCountry"
                          placeholder="Enter country"
                          className="mt-1"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="payment" className="space-y-4 pt-4">
                      <div>
                        <Label>Payment Method</Label>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={(value) =>
                            setPaymentMethod(value as "online" | "offline")
                          }
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value="online" id="online" />
                            <Label
                              htmlFor="online"
                              className="flex-1 cursor-pointer"
                            >
                              <div className="flex items-center">
                                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                                <span>Online Payment (Bank Transfer)</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                Make a bank transfer and upload the receipt
                              </p>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 border p-4 rounded-md mt-2">
                            <RadioGroupItem value="offline" id="offline" />
                            <Label
                              htmlFor="offline"
                              className="flex-1 cursor-pointer"
                            >
                              <div className="flex items-center">
                                <Building className="h-5 w-5 mr-2 text-primary" />
                                <span>Offline Payment (In-Store)</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                Pay at our physical store using the provided QR
                                code
                              </p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "online" && (
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                          <p className="text-blue-700 text-sm">
                            After placing your order, you'll be able to upload
                            your payment receipt.
                          </p>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="notes">Order Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Special instructions for your order"
                          className="mt-1"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Items ({cartSummary.items})
                      </span>
                      <span>${cartSummary.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${cartSummary.discount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax</span>
                      <span>${cartSummary.tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span>${cartSummary.shipping.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${cartSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
