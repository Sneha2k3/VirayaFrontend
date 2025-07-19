import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalContent, ModalHeader
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { z } from "zod";
import Alert from "../Alert";


interface Props {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void;
}

const schema = z.object({
    identifier: z
        .string()
        .transform((value) => value.replaceAll(" ", ""))
        .pipe(z.string().min(1, { message: "Username is required" })),
    password: z.string().min(6, { message: "Password is required" }),
    isRemembered: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

const Login: React.FC<Props> = ({ isOpen, onOpenChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    // Handling form submission
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setErrorMessage(null); // Clear previous errors
        const result = await signIn("credentials", {
            redirect: false,
            email: data.identifier,
            password: data.password,
        });

        if (result && result.error) {
            setErrorMessage(result.error);
        } else {
            // On successful sign in close modal
            onOpenChange(false);
        }
    };


    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="opaque"
                placement="center"
                className="p-2 lg:p-4 mx-4 lg:mx-0"
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-2">
                            <h1>Sign In To Your Account</h1>
                            <p className="text-sm text-gray-400 font-normal">
                                Kindly fill in your details to sign in
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            {errorMessage && <Alert message={errorMessage} />}
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-3"
                            >
                                <Input
                                    isRequired
                                    label="E-mail"
                                    labelPlacement="outside"
                                    placeholder="eg. Johndoe"
                                    type="text"
                                    variant="bordered"
                                    size="md"
                                    radius="sm"
                                    isInvalid={!!errors.identifier}
                                    errorMessage={errors.identifier?.message}
                                    {...register("identifier")}
                                    classNames={{
                                        label: "!text-black",
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    labelPlacement="outside"
                                    placeholder="Create a password"
                                    isInvalid={!!errors.password}
                                    errorMessage={errors.password?.message}
                                    classNames={{
                                        label: "!text-black",
                                    }}
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
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
                                    type={isVisible ? "text" : "password"}
                                    variant="bordered"
                                    size="md"
                                    radius="sm"
                                    {...register("password")}
                                />
                                <div className="flex justify-between py-2 px-1">
                                    <Checkbox
                                        size="sm"
                                        radius="sm"
                                        classNames={{
                                            label: "text-small text-gray-700",
                                        }}
                                        {...register("isRemembered")}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link
                                        href="/forgot-password"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        <h1 className="text-small text-gray-700">Forgot Password?</h1>
                                    </Link>
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        className="bg-primary w-full rounded-sm text-white"
                                    >
                                        Log In
                                    </Button>
                                </div>
                            </form>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}


export default Login