"use client";

import { AnimatedThemeIcon } from "@/components/ui/animated-theme-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { ChevronDown, Settings, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface NavbarProps {
  session: any;
}

export default function Navbar({ session }: NavbarProps) {
  const { isOpen: isSidebarOpen } = useSidebar();

  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`flex z-10 justify-end items-center py-3 px-10 bg-sidebar h-16 
      border-b border-sidebar-border fixed transition-all duration-300 ease-in-out 
      ${isSidebarOpen ? "w-[calc(100%-70px)] sm:w-[calc(100%-256px)]" : "w-[calc(100%-70px)]"}`}
    >
      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer focus:outline-none ">
          {/* Avatar */}
          <Avatar className="w-8 h-8">
            <AvatarImage src={session.user.image || ""} alt="User Avatar" />
            <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          {/* Name and Icon */}
          <span className="text-sm font-medium text-sidebar-foreground">{session.user.name}</span>
          <ChevronDown className="w-4 h-4 text-sidebar-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex gap-3 cursor-pointer">
              <UserRound /> <p>Perfil</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex gap-3 cursor-pointer">
              <Settings /> <p>Configuración</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <div onClick={toggleTheme} className="flex gap-3 cursor-pointer">
              <AnimatedThemeIcon /> <p>Toggle Theme</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
