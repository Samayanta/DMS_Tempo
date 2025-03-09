import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  AlertCircle,
  MoreHorizontal,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProductManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock products data
  const products = [
    {
      id: "PRD-1001",
      name: "Premium Widget",
      category: "Widgets",
      description: "High-quality widget for professional use",
      price: 29.99,
      stock: 150,
      sku: "WDG-PRM-001",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    },
    {
      id: "PRD-1002",
      name: "Deluxe Gadget",
      category: "Gadgets",
      description: "Feature-rich gadget with advanced capabilities",
      price: 49.99,
      stock: 75,
      sku: "GDG-DLX-002",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    },
    {
      id: "PRD-1003",
      name: "Standard Tool",
      category: "Tools",
      description: "Reliable tool for everyday tasks",
      price: 19.99,
      stock: 200,
      sku: "TL-STD-003",
      image:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&q=80",
    },
    {
      id: "PRD-1004",
      name: "Basic Component",
      category: "Components",
      description: "Essential component for various applications",
      price: 9.99,
      stock: 300,
      sku: "CMP-BSC-004",
      image:
        "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?w=300&q=80",
    },
    {
      id: "PRD-1005",
      name: "Advanced Mechanism",
      category: "Mechanisms",
      description: "Sophisticated mechanism for specialized use",
      price: 39.99,
      stock: 50,
      sku: "MCH-ADV-005",
      image:
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45d7?w=300&q=80",
    },
    {
      id: "PRD-1006",
      name: "Economy Widget",
      category: "Widgets",
      description: "Cost-effective widget for basic needs",
      price: 14.99,
      stock: 5,
      sku: "WDG-ECO-006",
      image:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&q=80",
    },
  ];

  // Mock categories
  const categories = [
    "Widgets",
    "Gadgets",
    "Tools",
    "Components",
    "Mechanisms",
  ];

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock <= 10) ||
      (stockFilter === "out" && product.stock === 0) ||
      (stockFilter === "in" && product.stock > 10);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          Out of Stock
        </Badge>
      );
    } else if (stock <= 10) {
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200"
        >
          Low Stock
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          In Stock
        </Badge>
      );
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setShowAddEditDialog(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowAddEditDialog(true);
  };

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  const handleSaveProduct = (formData: any) => {
    // In a real app, this would call an API to save the product
    console.log("Saving product:", formData);
    setShowAddEditDialog(false);
    // Then update the UI
  };

  const handleConfirmDelete = () => {
    // In a real app, this would call an API to delete the product
    console.log(`Deleting product ${selectedProduct?.id}`);
    setShowDeleteDialog(false);
    // Then update the UI
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
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-gray-500">Manage your product catalog</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  View and manage your product inventory
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stock</SelectItem>
                      <SelectItem value="in">In Stock</SelectItem>
                      <SelectItem value="low">Low Stock</SelectItem>
                      <SelectItem value="out">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button onClick={handleAddProduct}>
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="in-stock">In Stock</TabsTrigger>
                <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredProducts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Product
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            SKU
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">
                            Category
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500 text-right">
                            Price
                          </th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500 text-right">
                            Stock
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
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden mr-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-gray-500 truncate max-w-xs">
                                    {product.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm">{product.sku}</td>
                            <td className="px-4 py-4 text-sm">
                              {product.category}
                            </td>
                            <td className="px-4 py-4 text-sm text-right font-medium">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-sm text-right">
                              {product.stock}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              {getStockStatus(product.stock)}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 border-red-200 hover:bg-red-50"
                                  onClick={() => handleDeleteProduct(product)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
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
                      No products found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery ||
                      categoryFilter !== "all" ||
                      stockFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "No products have been added yet"}
                    </p>
                    <Button onClick={handleAddProduct}>
                      <Plus className="h-4 w-4 mr-2" /> Add Product
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Other tab contents would be similar but filtered */}
              <TabsContent value="in-stock" className="space-y-4">
                {/* Similar content but filtered for in-stock products */}
              </TabsContent>
              <TabsContent value="low-stock" className="space-y-4">
                {/* Similar content but filtered for low-stock products */}
              </TabsContent>
              <TabsContent value="out-of-stock" className="space-y-4">
                {/* Similar content but filtered for out-of-stock products */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        {products.some((p) => p.stock <= 10) && (
          <Card className="mt-6 border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                <CardTitle className="text-lg font-medium text-yellow-700">
                  Low Stock Alert
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700 mb-4">
                The following products are running low on stock and may need
                replenishment soon:
              </p>
              <div className="space-y-2">
                {products
                  .filter((p) => p.stock <= 10 && p.stock > 0)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center bg-white p-3 rounded border border-yellow-200"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 rounded overflow-hidden mr-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            SKU: {product.sku}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-yellow-700 font-medium">
                          {product.stock} left
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                        >
                          Update Stock
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Add/Edit Product Dialog */}
      <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the product details below"
                : "Fill in the product details below"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  defaultValue={selectedProduct?.name || ""}
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <Label htmlFor="productCategory">Category</Label>
                <Select defaultValue={selectedProduct?.category || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="productSKU">SKU</Label>
                <Input
                  id="productSKU"
                  defaultValue={selectedProduct?.sku || ""}
                  placeholder="Enter product SKU"
                />
              </div>

              <div>
                <Label htmlFor="productDescription">Description</Label>
                <Textarea
                  id="productDescription"
                  defaultValue={selectedProduct?.description || ""}
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="productPrice">Price ($)</Label>
                <Input
                  id="productPrice"
                  type="number"
                  step="0.01"
                  defaultValue={selectedProduct?.price || ""}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="productStock">Stock Quantity</Label>
                <Input
                  id="productStock"
                  type="number"
                  defaultValue={selectedProduct?.stock || ""}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="productImage">Product Image</Label>
                <div className="mt-1">
                  {selectedProduct?.image ? (
                    <div className="mb-2">
                      <div className="w-full h-32 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Package className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="mt-1 text-sm text-gray-500">
                          No image selected
                        </div>
                      </div>
                    </div>
                  )}
                  <Button variant="outline" className="mt-2 w-full">
                    {selectedProduct?.image ? "Change Image" : "Upload Image"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddEditDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSaveProduct({})}>
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="flex items-center p-4 border rounded-md">
              <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden mr-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{selectedProduct.name}</div>
                <div className="text-sm text-gray-500">
                  SKU: {selectedProduct.sku}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ProductManagement;
