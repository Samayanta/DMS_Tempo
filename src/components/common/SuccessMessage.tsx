import React from "react";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  title?: string;
  message?: string;
  submissionDate?: string;
  estimatedTime?: string;
  onClose?: () => void;
  onViewStatus?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title = "Registration Submitted Successfully",
  message = "Your retailer registration has been submitted for review. Our team will verify your information and get back to you soon.",
  submissionDate = new Date().toLocaleDateString(),
  estimatedTime = "24-48 hours",
  onClose = () => {},
  onViewStatus = () => {},
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <Card className="border-none shadow-none">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Submission Date:</span>
              <span className="text-sm font-medium">{submissionDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Estimated Response Time:
              </span>
              <span className="text-sm font-medium">{estimatedTime}</span>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 text-left">
                  You will receive an email and SMS notification once your
                  application is reviewed.
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={onViewStatus} className="w-full">
            View Application Status
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessMessage;
