import React from "react";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        </div>
        {trend && (
          <div className="mt-4">
            <div
              className={`flex items-center ${trend.positive ? "text-green-500" : "text-red-500"}`}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">{trend.value}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  stats: {
    totalRetailers: number;
    pendingApprovals: number;
    totalProducts: number;
    lowStockItems: number;
    totalOrders: number;
    revenue: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Retailers"
        value={stats.totalRetailers}
        description="Total retailers"
        icon={<Users className="h-6 w-6 text-primary" />}
        trend={{
          value: `${stats.pendingApprovals} pending approvals`,
          positive: false,
        }}
      />

      <StatsCard
        title="Products"
        value={stats.totalProducts}
        description="Total products"
        icon={<Package className="h-6 w-6 text-primary" />}
        trend={{
          value: `${stats.lowStockItems} items low in stock`,
          positive: false,
        }}
      />

      <StatsCard
        title="Orders"
        value={stats.totalOrders}
        description="Total orders"
        icon={<ShoppingCart className="h-6 w-6 text-primary" />}
        trend={{
          value: `$${stats.revenue.toLocaleString()} total revenue`,
          positive: true,
        }}
      />
    </div>
  );
};

export default DashboardStats;
