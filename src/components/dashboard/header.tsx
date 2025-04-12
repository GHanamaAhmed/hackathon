"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Search, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth, useUser } from "@clerk/nextjs";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = async () => {
    // In a real app, you would handle logout logic here
    await signOut({
      redirectUrl: "/sign-in",
    });
    // router.push("/sign-in");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static lg:h-[60px] lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="w-full flex-1">
        <div className="hidden md:flex">
          <form className="relative w-full lg:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-60 lg:w-80"
            />
          </form>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <SheetContent side="top" className="px-4 py-2">
            <form className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8"
              />
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>
                  {(user?.firstName?.charAt(0)?.toUpperCase() || "") +
                    (user?.lastName?.charAt(0)?.toUpperCase() ||
                      (user?.primaryEmailAddress?.emailAddress
                        .charAt(0)
                        ?.toUpperCase() || "") +
                        (user?.primaryEmailAddress?.emailAddress
                          .charAt(1)
                          ?.toUpperCase() || ""))}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push("/profile");
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
