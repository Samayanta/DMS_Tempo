import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
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

interface Retailer {
  id: string;
  name: string;
  email: string;
  date: string;
  type: string;
}

interface PendingRetailersListProps {
  retailers: Retailer[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const PendingRetailersList: React.FC<PendingRetailersListProps> = ({
  retailers,
  onApprove,
  onReject,
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <CardDescription>Retailers waiting for approval</CardDescription>
      </CardHeader>
      <CardContent>
        {retailers.length > 0 ? (
          <div className="space-y-4">
            {retailers.map((retailer) => (
              <div
                key={retailer.id}
                className="border rounded-md p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{retailer.name}</h3>
                    <p className="text-sm text-gray-500">{retailer.email}</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="capitalize text-xs">
                        {retailer.type}
                      </Badge>
                      <span className="text-xs text-gray-500 ml-2">
                        Applied: {retailer.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => onReject(retailer.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => onApprove(retailer.id)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium">All caught up!</h3>
            <p className="text-gray-500">
              No pending retailer approvals at the moment.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/admin/retailers")}
        >
          Manage All Retailers
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingRetailersList;
