import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SalesAnalyticsProps {
  revenue: number;
  period?: "daily" | "weekly" | "monthly";
  onPeriodChange?: (period: "daily" | "weekly" | "monthly") => void;
}

const SalesAnalytics: React.FC<SalesAnalyticsProps> = ({
  revenue,
  period = "weekly",
  onPeriodChange,
}) => {
  const handlePeriodChange = (newPeriod: "daily" | "weekly" | "monthly") => {
    if (onPeriodChange) {
      onPeriodChange(newPeriod);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>Overview of sales performance</CardDescription>
          </div>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={period === "daily" ? "default" : "ghost"}
              className="rounded-none h-8"
              onClick={() => handlePeriodChange("daily")}
            >
              Daily
            </Button>
            <Button
              variant={period === "weekly" ? "default" : "ghost"}
              className="rounded-none h-8"
              onClick={() => handlePeriodChange("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={period === "monthly" ? "default" : "ghost"}
              className="rounded-none h-8"
              onClick={() => handlePeriodChange("monthly")}
            >
              Monthly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
          <p className="text-gray-500">Sales chart would be displayed here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold mt-1">
              ${(revenue / 1000).toFixed(1)}k