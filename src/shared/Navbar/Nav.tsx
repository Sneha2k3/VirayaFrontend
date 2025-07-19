"use client";
import { RootState } from "@/store";
import { AuthResponse } from "@/types/types";
import { stylishFont } from "@/utils/font";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Login from "../Login/Login";
import Signup from "../SignUp/SignUp";
import ExpandableSearch from "./ExpandableSearch";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = React.useState(false);

  const { data: sessionData, status } = useSession();
  const session = sessionData as unknown as AuthResponse;
  const isLoggedIn = status === "authenticated";
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const nav = [
    { title: "Home", link: "/" },
    { title: "Pot", link: "/pot" },
    { title: "Plates", link: "/mala" },
    { title: "Mug", link: "/mug" },
    { title: "Customize", link: "/customize" },
    // { title: "Exclusives", link: "/exclusive" },
    // { title: "Consultation", link: "/consultation" }
  ];

  const dropdownItems = [
    { title: "About", link: "/about" },
    { title: "FAQs", link: "/faqs" },
    { title: "Privacy Policy", link: "/privacy-policy" },
    { title: "Terms and Conditions", link: "/terms-and-conditions" },
    { title: "View Reviews", link: "/reviews" },
  ];

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const handleLogin = () => {
    setOpen(!open);
    setSidebarOpen(false);
  };
  const handleSign = () => {
    setSignUpOpen(!signUpOpen);
    setSidebarOpen(false);
  };
  const handleMobileSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div className="shadow-sm top-0 fixed flex flex-col items-center justify-between px-4 md:px-8 py-2 bg-white w-full z-[9999]">
        <div className="w-full flex justify-between items-center font-medium uppercase text-sm tracking-wide">
          <div className="flex md:gap-40 items-center">
            <Link href="/">
              <div className="flex items-center gap-4">
                <section className="size-12 md:size-16 rounded-full">
                  <Image
                    src={"/logoo.png"}
                    alt="logo"
                    height={1000}
                    width={1000}
                    className="object-cover h-full w-full rounded-full"
                  />
                </section>
                <div className="flex flex-col -gap-2">
                  <h1
                    className={`${stylishFont.className} text-xl md:text-2xl leading-5`}
                  >
                    Vitraya
                  </h1>
                  <p className="text-xs capitalize text-gray-500">
                    Ceramic Suppliers
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <section className="hidden md:flex items-center justify-center">
              <div className="flex gap-14">
                {nav.map((item) => (
                  <Link key={item.title} href={item.link!}>
                    <div className="group relative">
                      <p className="font-normal text-sm text-gray-600 uppercase tracking-wider">
                        {item.title}
                      </p>
                      <span
                        className={`${isActive(item.link!) ? "w-full" : "w-0"
                          } bottom-[-4px] group-hover:w-full absolute bg-primary h-[2px] rounded-full transition-all duration-400`}
                      ></span>
                    </div>
                  </Link>
                ))}
                {/* <div className='flex gap-10'>
                                {nav.map(item => (
                                    <Link key={item.title} href={item.link!}>
                                        <div className='group relative px-2 py-1'>
                                            <p className='font-semibold text-base text-gray-700 uppercase tracking-wider'>{item.title}</p>
                                            <span
                                                className={`${isActive(item.link!) ? "w-full" : "w-0"} bottom-[-4px] group-hover:w-full absolute bg-primary h-[2px] rounded-full transition-all duration-400`}
                                            ></span>
                                        </div>
                                    </Link>
                                ))} */}
                <Dropdown>
                  <DropdownTrigger>
                    <div className="group relative cursor-pointer">
                      <p className="font-normal text-sm text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        More <IoIosArrowDown />
                      </p>
                      <span
                        className={`${isActive("/more") ? "w-full" : "w-0"
                          } bottom-[-4px] group-hover:w-full absolute bg-primary h-[2px] rounded-full transition-all duration-400`}
                      ></span>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="More options">
                    {dropdownItems.map((item) => (
                      <DropdownItem key={item.title}>
                        <Link href={item.link} className="w-full">
                          {item.title}
                        </Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </section>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {/* <Button
              className="bg-primary"
              size="md"
              onPress={() => setSearchOpen(!searchOpen)}
              isIconOnly
            >
              <CiSearch size={30} className="text-white" />
            </Button> */}

            {true && (
              <div className="flex gap-8 items-center relative">
                <div className="bg-yellow-500 size-5 absolute top-[-4px] -right-[6px] rounded-full flex items-center justify-center p-2 text-white">
                  <p className="text-xs">{cartItems.length}</p>
                </div>
                <Link href={"/checkout"}>
                  <Button
                    variant="light"
                    isIconOnly
                    className="bg-transparent text-base text-primary underline underline-offset-4"
                    startContent={
                      <CiShoppingCart size={28} className="text-[#E8B86D]" />
                    }
                  ></Button>
                </Link>
              </div>
            )}
            {isLoggedIn ? (
              <Dropdown>
                <DropdownTrigger>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar
                      color="warning"
                      as="button"
                      size="md"
                      src={`https://ui-avatars.com/api/?name=${session?.user?.name}&background=E4C087&color=ffff`}
                    />
                    <div className="flex flex-col">
                      <p className="text-gray-600 capitalize">
                        {sessionData?.user?.name}
                      </p>
                      <p className="text-xs text-gray-400 lowercase">
                        {sessionData?.user?.email}
                      </p>
                    </div>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="More options">
                  <DropdownItem key="Profile">
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownItem>
                  {/* <DropdownItem key="My Orders">
                    <Link href="/my-orders" className="w-full">
                      My Orders
                    </Link>
                  </DropdownItem> */}
                  <DropdownItem onClick={() => signOut()}>
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="flex gap-2 items-center">
                <Button
                  size="sm"
                  className="text-white rounded-2xl bg-primary px-4"
                  onPress={() => handleLogin()}
                >
                  Login
                </Button>
                <Button
                  variant="light"
                  className="text-primary hover:underline hover:underline-offset-2 cursor-pointer"
                  onPress={() => handleSign()}
                >
                  Signup
                </Button>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-4">
            {isLoggedIn && (
              <div className="flex items-center relative">
                <div className="bg-yellow-500 size-4 absolute top-[-4px] -right-[4px] rounded-full flex items-center justify-center p-1 text-white">
                  <p className="text-xs">{cartItems.length}</p>
                </div>
                <Link href={"/checkout"}>
                  {/* <Button
                    variant="light"
                    isIconOnly
                    className="bg-transparent text-base text-primary p-0"
                    startContent={
                      <CiShoppingCart size={24} className="text-[#E8B86D]" />
                    }
                  ></Button> */}

                  <CiShoppingCart size={24} className="text-[#E8B86D]" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {10}
                  </span>
                </Link>
              </div>
            )}

            <Button
              className="bg-transparent"
              size="sm"
              onPress={() => setSidebarOpen(!sidebarOpen)}
              isIconOnly
            >
              <RiMenu3Line size={24} className="text-gray-700" />
            </Button>
          </div>
        </div>
        {/* <ExpandableSearch isOpen={searchOpen} onOpenChange={setSearchOpen} /> */}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-[10000] transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <section className="size-10 rounded-full">
                <Image
                  src={"/Logo.webp"}
                  alt="logo"
                  height={1000}
                  width={1000}
                  className="object-cover h-full w-full rounded-full"
                />
              </section>
              <h1 className={`${stylishFont.className} text-xl leading-5`}>
                Khandbari
              </h1>
            </div>
            <Button
              className="bg-transparent p-0"
              size="sm"
              onPress={() => setSidebarOpen(false)}
              isIconOnly
            >
              <IoMdClose size={24} className="text-gray-700" />
            </Button>
          </div>

          <div className="p-4 border-b">
            <form onSubmit={handleMobileSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-2 py-1 border rounded-l-md focus:outline-none"
                endContent={
                  <Button isIconOnly type="submit" className="bg-primary">
                    <CiSearch size={20} className="text-white" />
                  </Button>
                }
              />
            </form>
          </div>

          {isLoggedIn ? (
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar
                  color="warning"
                  size="md"
                  src={`https://ui-avatars.com/api/?name=${session?.user?.name}&background=E4C087&color=ffff`}
                />
                <div className="flex flex-col">
                  <p className="text-gray-600 capitalize">
                    {sessionData?.user?.name}
                  </p>
                  <p className="text-xs text-gray-400 lowercase">
                    {sessionData?.user?.email}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/profile">
                  <p className="text-sm text-gray-600 hover:text-primary">
                    Profile
                  </p>
                </Link>
                <Link href="/my-orders">
                  <p className="text-sm text-gray-600 hover:text-primary">
                    My Orders
                  </p>
                </Link>
                <p
                  className="text-sm text-gray-600 hover:text-primary cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sign out
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b">
              <div className="flex flex-col gap-3">
                <Button
                  size="sm"
                  className="text-white rounded-md bg-primary w-full"
                  onPress={() => handleLogin()}
                >
                  Login
                </Button>
                <Button
                  variant="light"
                  className="text-primary border border-primary rounded-md w-full"
                  onPress={() => handleSign()}
                >
                  Signup
                </Button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4">
            <ul className="flex flex-col gap-4">
              {nav.map((item) => (
                <li key={item.title}>
                  <Link href={item.link!} onClick={() => setSidebarOpen(false)}>
                    <div
                      className={`p-2 rounded-md ${isActive(item.link!)
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600"
                        }`}
                    >
                      <p className="font-normal text-sm uppercase tracking-wider">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}

              <li>
                <div
                  className="p-2 rounded-md text-gray-600 cursor-pointer"
                  onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-normal text-sm uppercase tracking-wider">
                      More
                    </p>
                    <IoIosArrowDown
                      className={`transition-transform duration-300 ${mobileMoreOpen ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </div>

                {mobileMoreOpen && (
                  <ul className="ml-4 mt-2 flex flex-col gap-2">
                    {dropdownItems.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.link}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <p className="text-sm text-gray-500 p-2 hover:text-primary">
                            {item.title}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[9999] md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Login isOpen={open} onOpenChange={setOpen} />
      <Signup isOpen={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  );
};

export default Navbar;
