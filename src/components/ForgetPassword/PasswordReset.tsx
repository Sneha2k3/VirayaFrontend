"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/passwordreset";
import Alert from "@/shared/Alert";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { josefin } from "@/utils/font";

type PasswordFormFields = {
  password: string;
  confirmPassword: string;
};

const PasswordReset=()=> {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const passwordForm = useForm<PasswordFormFields>();

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetPasswordEmail");
    const storedOtp = localStorage.getItem("resetPasswordOtp");
    
    if (!storedEmail || !storedOtp) {
      toast.error("Session expired. Please start the process again.");
      router.push("/forgot-password");
      return;
    }
    
    setEmail(storedEmail);
    setOtp(storedOtp);
  }, [router]);

  const resetPasswordMutation = useMutation({
    mutationFn: ({ email, otp, password }: { email: string; otp: string; password: string }) => 
      resetPassword(email, otp, password),
    onSuccess: () => {
      localStorage.removeItem("resetPasswordEmail");
      localStorage.removeItem("resetPasswordOtp");
      toast.success("Password reset successfully");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    },
    onError: (error: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(error?.response?.data?.message || "Failed to reset password");
      setErrorMessage(error?.response?.data?.message || "Failed to reset password");
    }
  });

  const onPasswordSubmit = async (data: PasswordFormFields) => {
    setErrorMessage(null);
    
    // Simple password validation
    if (data.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }
    
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    
    resetPasswordMutation.mutate({ email, otp, password: data.password });
  };

  return (
    <div className="h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className={`${josefin.className} text-primary mt-6 text-3xl text-gray-90`}>Create New Password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Create a new password for your account
          </p>
        </div>
        
        {errorMessage && <Alert message={errorMessage} />}
        
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="mt-8 space-y-6 flex flex-col gap-4">
          <Input
            isRequired
            label="New Password"
            labelPlacement="outside"
            placeholder="Enter your new password"
            classNames={{
              label: "!text-black",
            }}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <LuEye
                    size={22}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <LuEyeOff
                    size={22}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                )}
              </button>
            }
            type={isPasswordVisible ? "text" : "password"}
            variant="bordered"
            size="md"
            radius="sm"
            {...passwordForm.register("password")}
          />
          <Input
            isRequired
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Confirm your new password"
            classNames={{
              label: "!text-black",
            }}
            className="mt-4"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                {isConfirmPasswordVisible ? (
                  <LuEye
                    size={22}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <LuEyeOff
                    size={22}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                )}
              </button>
            }
            type={isConfirmPasswordVisible ? "text" : "password"}
            variant="bordered"
            size="md"
            radius="sm"
            {...passwordForm.register("confirmPassword")}
          />
          <div className="flex gap-2">
            <Button
              variant="bordered"
              className="flex-1 rounded-sm text-black"
              onClick={() => {
                localStorage.removeItem("resetPasswordOtp");
                router.push("/otp");
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-primary flex-1 rounded-sm text-white"
              isLoading={resetPasswordMutation.isPending}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordReset