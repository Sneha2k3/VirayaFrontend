"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail, sendOTP } from "@/services/passwordreset";
import Alert from "@/shared/Alert";
import { josefin } from "@/utils/font";

type OtpFormFields = {
  otp: string;
};

const OTP = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const otpForm = useForm<OtpFormFields>();

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetPasswordEmail");
    
    if (!storedEmail) {
      toast.error("Email not found. Please start the process again.");
      router.push("/forgot-password");
      return;
    }
    
    setEmail(storedEmail);
  }, [router]);

  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) => verifyEmail(email, otp),
    onSuccess: () => {
      toast.success("OTP verified successfully");
      localStorage.setItem("resetPasswordOtp", otpForm.getValues().otp);
      router.push("/password-reset");
    },
    onError: (error: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(error?.response?.data?.message || "Invalid OTP");
      setErrorMessage(error?.response?.data?.message || "Invalid OTP");
    }
  });

  const resendOtpMutation = useMutation({
    mutationFn: (email: string) => sendOTP(email),
    onSuccess: () => {
      toast.success("A new code has been sent to your email");
    },
    onError: (error: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(error?.response?.data?.message || "Failed to resend code");
    }
  });

  const onOtpSubmit = async (data: OtpFormFields) => {
    setErrorMessage(null);
    
    // Simple OTP validation
    if (!/^\d+$/.test(data.otp) || data.otp.length < 4 || data.otp.length > 6) {
      setErrorMessage("OTP must be 4-6 digits");
      return;
    }
    
    verifyOtpMutation.mutate({ email, otp: data.otp });
  };

  return (
    <div className="h-[60vh] flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className={`${josefin.className} text-primary mt-6 text-3xl text-gray-90`}>Enter Recovery Code</h2>
        </div>
        
        {errorMessage && <Alert message={errorMessage} />}
        
        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="mt-8 space-y-6">
          <Input
            isRequired
            label="Recovery Code"
            labelPlacement="outside"
            placeholder="Enter the 6-digit code"
            type="text"
            variant="bordered"
            size="md"
            radius="sm"
            maxLength={6}
            inputMode="numeric"
            {...otpForm.register("otp")}
            classNames={{
              label: "!text-black",
            }}
          />
          <div className="flex gap-2">
            <Button
              variant="bordered"
              className="flex-1 rounded-sm text-black"
              onClick={() => {
                localStorage.removeItem("resetPasswordEmail");
                router.push("/forgot-password");
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-primary flex-1 rounded-sm text-white"
              isLoading={verifyOtpMutation.isPending}
            >
              Verify Code
            </Button>
          </div>
          <div className="text-center">
            <Button
              variant="light"
              className="text-gray-500"
              onClick={() => {
                resendOtpMutation.mutate(email);
              }}
              isLoading={resendOtpMutation.isPending}
            >
              Resend Code
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTP;