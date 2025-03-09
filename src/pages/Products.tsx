import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Products: React.FC = () => {
  const { user } = useAuth();

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Premium Widget",
      category: "Widgets",
      price: 29.99,
      stock: 150,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    },
    {
      id: 2,
      name: "Deluxe Gadget",
      category: "Gadgets",
      price: 49.99,
      stock: 75,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    },
    {
      id: 3,
      name: "Standard Tool",
      category: "Tools",
      price: 19.99,
      stock: 200,
      image:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&q=80",
    },
    {
      id: 4,
      name: "Basic Component",
      category: "Components",
      price: 9.99,
      stock: 300,
      image:
        "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?w=300&q=80",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={!!user} userName={user?.email || "Guest"} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Products Catalog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm ${product.stock > 100 ? "text-green-600" : product.stock > 50 ? "text-yellow-600" : "text-red-600"}`}
                  >
                    {product.stock} in stock
                  </span>
                </div>
                <button className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
