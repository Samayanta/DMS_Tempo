import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, CreditCard, ArrowRight } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Cart: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Widget",
      price: 29.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    },
    {
      id: 2,
      name: "Deluxe Gadget",
      price: 49.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    },
    {
      id: 3,
      name: "Standard Tool",
      price: 19.99,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&q=80",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleApplyCoupon = () => {
    // Mock coupon logic
    if (couponCode.toUpperCase() === "DISCOUNT10") {
      setDiscount(10);
      toast({
        title: "Coupon applied",
        description: "10% discount has been applied to your order.",
      });
    } else {
      setDiscount(0);
      toast({
        variant: "destructive",
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.05; // 5% tax
  const total = subtotal - discountAmount + tax;

  const handleCheckout = () => {
    // In a real app, this would save the cart to the backend
    navigate("/checkout");
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
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                    <CardDescription>
                      Review your items before checkout
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center">
                                <button
                                  className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1,
                                    )
                                  }
                                >
                                  -
                                </button>
                                <div className="w-12 h-8 flex items-center justify-center border-t border-b">
                                  {item.quantity}
                                </div>
                                <button
                                  className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1,
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/products")}
                    >
                      Continue Shopping
                    </Button>
                    <Button onClick={() => setCartItems([])}>Clear Cart</Button>
                  </CardFooter>
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
                      {/* Coupon Code */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button variant="outline" onClick={handleApplyCoupon}>
                          Apply
                        </Button>
                      </div>

                      <Separator />

                      {/* Price Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>

                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount ({discount}%)</span>
                            <span>-${discountAmount.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-gray-500">Tax (5%)</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Proceed to
                      Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button onClick={() => navigate("/products")}>
                Browse Products
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
