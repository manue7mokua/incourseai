"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
} from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-screen bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="max-w-screen-2xl mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold hidden md:inline-block">
              InCourse
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant={isActive("/dashboard") ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link href="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/course") ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link href="/dashboard">
                <BookOpen className="h-4 w-4 mr-2" />
                Courses
              </Link>
            </Button>
            <Button
              variant={isActive("/calendar") ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link href="/calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <User className="h-5 w-5" />
                <span className="hidden md:inline-block">Alex</span>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="grid gap-2">
            <Button
              variant={isActive("/dashboard") ? "secondary" : "ghost"}
              className="justify-start"
              asChild
            >
              <Link href="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant={pathname.startsWith("/course") ? "secondary" : "ghost"}
              className="justify-start"
              asChild
            >
              <Link href="/dashboard">
                <BookOpen className="h-4 w-4 mr-2" />
                Courses
              </Link>
            </Button>
            <Button
              variant={isActive("/calendar") ? "secondary" : "ghost"}
              className="justify-start"
              asChild
            >
              <Link href="/calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </Link>
            </Button>
            <Button
              variant={isActive("/settings") ? "secondary" : "ghost"}
              className="justify-start"
              asChild
            >
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
