"use client";
import React, { useState, useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useSession, signIn } from 'next-auth/react';
import { AuthResponse } from '@/types/types';
import { Avatar, Button, Input } from '@nextui-org/react';
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";
import { changePassword, updateProfile } from '@/services/user'; // Assuming you have these services

// Schema for form validation
const profileSchema = z.object({
  name: z.string().min(3, { message: "name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: "Current password is required" }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ProfileFields = z.infer<typeof profileSchema>;
type PasswordFields = z.infer<typeof passwordSchema>;

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const { data: sessionData, status} = useSession();
  const session = sessionData as unknown as AuthResponse;

  // Toggle visibility for password fields
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const toggleCurrentPasswordVisibility = () => setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: profileErrors } } = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });

  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors } } = useForm<PasswordFields>({
    resolver: zodResolver(passwordSchema),
  });

  // Mutation for changing password
  const { mutate: mutatePassword, isPending: isPasswordPending } = useMutation({
    mutationFn: (data: PasswordFields) => changePassword(session?.user?.id || "", data),
    onSuccess: () => {
      toast.success("Password changed successfully.");
      setIsChangePassword(false);
    },
    onError: (error: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
      const message = error.response?.data?.error?.message || "An error occurred while changing the password.";
      toast.error(message);
    },
  });

  // Mutation for updating profile
  const { mutate: mutateProfile, isPending: isProfilePending } = useMutation({
    mutationFn: (data: Partial<ProfileFields>) => updateProfile(session?.user?.id || "", data),
    onSuccess: async () => {
      toast.success("Profile updated successfully.");
      setIsEdit(false);
      
    },
    onError: (error: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
      const message = error.response?.data?.error?.message || "An error occurred while updating the profile.";
      toast.error(message);
    },
  });

  const onSubmitProfile: SubmitHandler<ProfileFields> = (data) => {
    const updatedFields: Partial<ProfileFields> = {};

    // Check if the name has been changed
    updatedFields.name = data.name;
    
    // Check if the email has been changed
    updatedFields.email = data.email;

    // Only call the mutation if there are changes
    if (Object.keys(updatedFields).length > 0) {
      mutateProfile(updatedFields);
    } else {
      toast.info("No changes were made.");
    }
  };

  const onSubmitPassword: SubmitHandler<PasswordFields> = (data) => {
    mutatePassword(data);
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-20 pt-6 lg:pt-10 pb-12">
      <div className='flex gap-4 md:gap-14 items-center'>
        <Button isIconOnly variant='light' onPress={() => window.history.back()}>
          <IoArrowBack size={24}  className="cursor-pointer" />
        </Button> 
        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold'>My Profile</h1>
      </div>
      
      {/* Main content container - changes from row to column on mobile */}
      <div className='flex flex-col md:flex-row md:gap-8 lg:gap-32'>
        {/* Avatar and buttons section */}
        <div className='flex flex-col items-center mt-6 md:mt-9 py-4 md:py-6 w-full md:w-1/4 md:px-4 lg:px-8'>
          <Avatar
            className='w-20 h-20 md:w-24 md:h-24'
            color='warning'
            as="button"
            src={`https://ui-avatars.com/api/?name=${session?.user?.name}&background=E4C087&color=ffff`}
          />
          <div className='flex flex-col gap-3 items-center mt-6 md:mt-8 lg:mt-14 w-full'>
            <Button 
              variant='light' 
              className='text-white rounded-sm w-full max-w-xs md:w-full lg:w-64 bg-primary hover:bg-primary'
              onPress={() => { setIsEdit(!isEdit); setIsChangePassword(false); }}
            >
              {isEdit ? "View Profile" : "Edit Profile"}
            </Button>
            <Button 
              variant='light' 
              className='text-primary rounded-sm w-full max-w-xs md:w-full lg:w-64 border border-primary bg-white'
              onPress={() => { setIsChangePassword(true); setIsEdit(false); }}
            >
              Change Password
            </Button>
          </div>
        </div>
        
        {/* Form section */}
        <div className='flex flex-col gap-6 md:gap-10 mt-8 md:mt-12 lg:m-20 w-full md:w-2/3 lg:w-[26rem]'>
          {isChangePassword ? (
            <div>
              <div className='flex gap-3 md:gap-4 items-center'>
                <MdEdit size={24} />
                <h1 className='text-lg md:text-xl font-semibold'>Change Password</h1>
              </div>
              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-5">
                {/* Current Password Field */}
                <div className="flex w-full md:w-96 py-1 px-2 md:px-3 flex-wrap md:flex-nowrap gap-2 md:gap-4">
                  <Input
                    isRequired
                    label="Current Password"
                    classNames={{
                      label:"!text-black",
                      inputWrapper: "w-full"
                    }}
                    labelPlacement="outside"
                    placeholder="Enter current password"
                    isInvalid={!!passwordErrors.currentPassword}
                    errorMessage={passwordErrors.currentPassword?.message}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleCurrentPasswordVisibility}>
                        {isCurrentPasswordVisible ? (
                          <LuEyeOff size={20} className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <LuEye size={20} className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isCurrentPasswordVisible ? "text" : "password"}
                    variant="bordered"
                    size="md"
                    radius="sm"
                    {...registerPassword("currentPassword")}
                  />
                </div>

                {/* New Password Field */}
                <div className="flex w-full md:w-96 py-1 px-2 md:px-3 flex-wrap md:flex-nowrap gap-2 md:gap-4">
                  <Input
                    classNames={{
                      label:"!text-black",
                      inputWrapper: "w-full"
                    }}
                    isRequired
                    label="New Password"
                    labelPlacement="outside"
                    placeholder="Enter new password"
                    isInvalid={!!passwordErrors.newPassword}
                    errorMessage={passwordErrors.newPassword?.message}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleNewPasswordVisibility}>
                        {isNewPasswordVisible ? (
                          <LuEyeOff size={20} className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <LuEye size={20} className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isNewPasswordVisible ? "text" : "password"}
                    variant="bordered"
                    size="md"
                    radius="sm"
                    {...registerPassword("newPassword")}
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="flex w-full md:w-96 py-1 px-2 md:px-3 flex-wrap md:flex-nowrap gap-2 md:gap-4">
                  <Input
                    isRequired
                    classNames={{
                      label:"!text-black",
                      inputWrapper: "w-full"
                    }}
                    label="Confirm Password"
                    labelPlacement="outside"
                    placeholder="Confirm new password"
                    isInvalid={!!passwordErrors.confirmPassword}
                    errorMessage={passwordErrors.confirmPassword?.message}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
                        {isConfirmPasswordVisible ? (
                          <LuEyeOff size={20} className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <LuEye size={20} className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    variant="bordered"
                    size="md"
                    radius="sm"
                    {...registerPassword("confirmPassword")}
                  />
                </div>

                <div className='flex gap-3 items-center w-full md:w-[23rem] justify-between mt-2 md:m-4'>
                  <Button 
                    variant='light' 
                    className='text-primary rounded-sm flex-1 md:w-40 border border-primary bg-white' 
                    onClick={() => { setIsChangePassword(false); setIsEdit(false); }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type='submit' 
                    variant='light' 
                    className='text-white rounded-sm flex-1 md:w-40 bg-primary hover:bg-primary' 
                    disabled={isPasswordPending}
                  >
                    {isPasswordPending ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              {isEdit ? (
                <div className='flex gap-3 md:gap-4 items-center'>
                  <MdEdit size={24} />
                  <h1 className='text-lg md:text-xl font-semibold'>Edit Information</h1>
                </div>
              ) : (
                <div className='flex gap-3 md:gap-4 items-center'>
                  <FaUser size={18}/>
                  <h1 className='text-lg md:text-xl font-semibold'>Personal Information</h1>
                </div>
              )}
              {isEdit ? (
                <form onSubmit={handleSubmitProfile(onSubmitProfile)} className='flex flex-col gap-4 md:gap-6 mt-4 md:mt-5'>
                  <div className="flex w-full  md:w-96 py-1 px-2 md:px-3 flex-wrap md:flex-nowrap gap-2 md:gap-4">
                    <Input
                      variant='bordered'
                      classNames={{
                        label:"!text-black",
                        inputWrapper: "w-full"
                      }}
                      label="Name"
                      labelPlacement='outside'
                      placeholder="Enter name"
                      isInvalid={!!profileErrors.name}
                      errorMessage={profileErrors.name?.message}
                      {...registerProfile("name")}
                    />
                  </div>
                  <div className="flex w-full md:w-96 py-1 px-2 md:px-3 flex-wrap md:flex-nowrap gap-2 md:gap-4">
                    <Input
                      variant='bordered'
                      classNames={{
                        label:"!text-black",
                        inputWrapper: "w-full"
                      }}
                      label="Email"
                      labelPlacement='outside'
                      placeholder="Enter email"
                      isInvalid={!!profileErrors.email}
                      errorMessage={profileErrors.email?.message}
                      {...registerProfile("email")}
                    />
                  </div>
                  <div className='flex gap-3 items-center w-full md:w-[23rem] justify-between mt-2 md:m-4'>
                    <Button 
                      variant='light' 
                      className='text-primary rounded-sm flex-1 md:w-40 border border-primary bg-white' 
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel Edit
                    </Button>
                    <Button 
                      type='submit' 
                      variant='light' 
                      className='text-white rounded-sm flex-1 md:w-40 bg-primary hover:bg-primary' 
                      disabled={isProfilePending}
                    >
                      {isProfilePending ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className='flex flex-col gap-4 md:gap-6 mt-4 md:mt-5'>
                  <div className="flex w-full md:w-96 py-1 px-2 md:px-3 flex-wrap md:flex-nowrap gap-2 md:gap-4">
                    <Input 
                      disabled 
                      variant='bordered' 
                      classNames={{
                        label:"!text-black",
                        inputWrapper: "w-full"
                      }} 
                      label="Name" 
                      labelPlacement='outside' 
                      placeholder={session?.user?.name}  
                    />
                  </div>
                  <div className="flex w-full md:w-96 py-1 px-2 md:px-3 flex-wrap md:flex-nowrap gap-2 md:gap-4">
                    <Input 
                      disabled 
                      variant='bordered' 
                      classNames={{
                        label:"!text-black",
                        inputWrapper: "w-full"
                      }} 
                      label="Email" 
                      labelPlacement='outside' 
                      placeholder={session?.user?.email}  
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;