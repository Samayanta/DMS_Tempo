import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Order {
  id: string;
  retailer: string;
  date: string;
  amount: number;
  status: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
  const navigate = useNavigate();

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
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest order activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                  Order ID
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                  Retailer
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                  Amount
                </th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm font-medium">{order.id}</td>
                  <td className="py-3 px-2 text-sm">{order.retailer}</td>
                  <td className="py-3 px-2 text-sm">{order.date}</td>
                  <td className="py-3 px-2 text-sm text-right">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-2 text-sm text-center">
                    {getStatusBadge(order.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/admin/orders")}
        >
          <FileText className="mr-2 h-4 w-4" /> View All Orders
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentOrdersTable;
