import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-primary">DMS Admin</h2>
        <p className="text-sm text-gray-500">Distribution Management</p>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1">
        <Button
          variant={isActive("/admin/dashboard") ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate("/admin/dashboard")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
        </Button>

        <Button
          variant={isActive("/admin/retailers") ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate("/admin/retailers")}
        >
          <Users className="mr-2 h-4 w-4" /> Retailers
        </Button>

        <Button
          variant={isActive("/admin/products") ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate("/admin/products")}
        >
          <Package className="mr-2 h-4 w-4" /> Products
        </Button>

        <Button
          variant={isActive("/admin/orders") ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate("/admin/orders")}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Orders
        </Button>

        <Button
          variant={isActive("/admin/analytics") ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate("/admin/analytics")}
        >
          <BarChart3 className="mr-2 h-4 w-4" /> Analytics
        </Button>

        <Button
          variant={isActive("/admin/settings") ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate("/admin/settings")}
        >
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
