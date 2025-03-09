import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { useAuth } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Settings = lazy(() => import("./pages/Settings"));
const RetailerDashboard = lazy(() => import("./pages/RetailerDashboard"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const RetailerManagement = lazy(
  () => import("./pages/admin/RetailerManagement"),
);
const ProductManagement = lazy(() => import("./pages/admin/ProductManagement"));

function App() {
  const { user, loading, userRole } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <>
        <Routes>
          {/* Home route - redirect based on user role */}
          <Route
            path="/"
            element={
              !user ? (
                <Home />
              ) : userRole === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/retailer/dashboard" />
              )
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                userRole === "admin" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Navigate to="/retailer/dashboard" />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={user ? <Orders /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders/:orderId"
            element={user ? <OrderDetail /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={user ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/login" />}
          />

          {/* Retailer Dashboard */}
          <Route
            path="/retailer/dashboard"
            element={
              user && userRole === "retailer" ? (
                <RetailerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Admin Routes - only accessible to admin users */}
          <Route
            path="/admin/dashboard"
            element={
              user && userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/retailers"
            element={
              user && userRole === "admin" ? (
                <RetailerManagement />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/products"
            element={
              user && userRole === "admin" ? (
                <ProductManagement />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Add this before the catchall route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}

          {/* Catchall route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster />
      </>
    </Suspense>
  );
}

export default App;
