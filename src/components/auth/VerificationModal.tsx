import React, { useState } from "react";
import { RefreshCw } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VerificationModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  contactValue?: string;
  verificationType?: "email" | "phone";
  onVerify?: (code: string) => void;
  onResend?: () => void;
  onCancel?: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  open = true,
  onOpenChange = () => {},
  title = "Verification Required",
  description = "Please enter the verification code we sent you.",
  contactValue = "your contact",
  verificationType = "email",
  onVerify = () => {},
  onResend = () => {},
  onCancel = () => {},
}) => {
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting multiple digits, distribute them across inputs
      const digits = value.split("").slice(0, 6 - index);
      const newVerificationCode = [...verificationCode];

      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newVerificationCode[index + i] = digit;
        }
      });

      setVerificationCode(newVerificationCode);

      // Focus on the next empty input or the last one
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Handle single digit input
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Auto-focus next input if current input is filled
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResend();
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      // In development mode, accept any 6-digit code
      onVerify(code);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
            {contactValue && (
              <span className="font-medium block mt-1">
                {verificationType === "email" ? "Email" : "Phone"}:{" "}
                {contactValue}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <div className="flex justify-center gap-2 w-full mb-6">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button
            variant="link"
            size="sm"
            onClick={handleResend}
            disabled={isResending}
            className="mb-4"
          >
            {isResending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              "Didn't receive a code? Resend"
            )}
          </Button>
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-between">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            disabled={verificationCode.join("").length !== 6}
            className="flex-1"
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
