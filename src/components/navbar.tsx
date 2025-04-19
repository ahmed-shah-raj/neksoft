"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hide navbar on login and home page
  if (!isMounted || pathname === "/login" || pathname === "/") {
    return null;
  }

  // Sign out and redirect
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/data">
          <h1 className="text-white text-2xl font-bold">Data Page</h1>
        </Link>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_1280.png"
                  alt="Avatar"
                />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled className="cursor-default">
                AHMED SHAH
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-600"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
