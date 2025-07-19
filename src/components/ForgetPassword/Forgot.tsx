"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "@/services/passwordreset";
import Alert from "@/shared/Alert";
import { josefin } from "@/utils/font";

type EmailFormFields = {
    email: string;
};

const Forgot=()=> {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const emailForm = useForm<EmailFormFields>();

    const sendOtpMutation = useMutation({
        mutationFn: (email: string) => sendOTP(email),
        onSuccess: () => {
        toast.success(`Recovery code sent to ${emailForm.getValues().email}`);
        localStorage.setItem("resetPasswordEmail", emailForm.getValues().email);
        router.push("/otp");
        },
        onError: (error: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
        toast.error(error?.response?.data?.message || "Failed to send OTP");
        setErrorMessage(error?.response?.data?.message || "Failed to send OTP");
        }
    });

    const onEmailSubmit = async (data: EmailFormFields) => {
        setErrorMessage(null);
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
        setErrorMessage("Please enter a valid email address");
        return;
        }
        
        sendOtpMutation.mutate(data.email);
    };

    return (
        <div className="h-[60vh] flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
            <div className="text-center">
            <h2 className={`${josefin.className} text-primary mt-6 text-3xl text-gray-90`}>Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-400">
                Enter your email address to receive a recovery code
            </p>
            </div>
            
            {errorMessage && <Alert message={errorMessage} />}
            
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="mt-8 space-y-6">
            <Input
                isRequired
                label="Email Address"
                labelPlacement="outside"
                placeholder="Enter your email address"
                type="email"
                variant="bordered"
                size="md"
                radius="sm"
                {...emailForm.register("email")}
                classNames={{
                label: "!text-black",
                }}
            />
            <div>
                <Button
                type="submit"
                className="bg-primary w-full rounded-sm text-white"
                isLoading={sendOtpMutation.isPending}
                >
                Send Recovery Code
                </Button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default Forgot