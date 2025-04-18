"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
  const [userName] = useState<string>("Ahmed Shah");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // to hide navbar from home and login page
  if (!isMounted || pathname === "/login" || pathname === "/") {
    return null;
  }

  // to delete token
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/data"}>
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
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled className="cursor-default">
                {userName}
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
