"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock user state - replace with real authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(null);

  const modelCategories = [
    { name: "Text Generation", href: "/models/text" },
    { name: "Image Generation", href: "/models/image" },
    { name: "Audio Generation", href: "/models/audio" },
    { name: "Video Generation", href: "/models/video" },
  ];

  const MainNavigation = () => (
    <>
      <Link
        href="/"
        className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
      >
        Home
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-gray-800 p-0 h-auto font-medium"
          >
            Models
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white border-gray-200">
          {modelCategories.map((category) => (
            <DropdownMenuItem key={category.href} asChild>
              <Link
                href={category.href}
                className="w-full cursor-pointer hover:bg-gray-50 text-gray-900"
              >
                {category.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        href="/pricing"
        className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
      >
        Pricing
      </Link>
    </>
  );

  const UserArea = () => {
    if (isAuthenticated && user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gray-600 text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer">
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setIsAuthenticated(false);
                setUser(null);
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-white hover:text-gray-300 hover:bg-gray-800"
          onClick={() => {
            // Mock sign in - replace with real authentication
            setIsAuthenticated(true);
            setUser({ name: "John Doe" });
          }}
        >
          Sign In
        </Button>
        <Button
          className="bg-white text-black hover:bg-gray-200"
          onClick={() => {
            // Mock sign up - replace with real authentication
            setIsAuthenticated(true);
            setUser({ name: "New User" });
          }}
        >
          Sign Up
        </Button>
      </div>
    );
  };

  const MobileNavigation = () => (
    <div className="flex flex-col space-y-6 p-6">
      <Link
        href="/"
        className="text-gray-900 font-medium text-lg"
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </Link>
      
      <div className="space-y-3">
        <div className="text-gray-900 font-medium text-lg">Models</div>
        <div className="pl-4 space-y-3">
          {modelCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/pricing"
        className="text-gray-900 font-medium text-lg"
        onClick={() => setIsMenuOpen(false)}
      >
        Pricing
      </Link>

      <div className="pt-6 border-t border-gray-200">
        {isAuthenticated && user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gray-600 text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <div className="space-y-3 pl-11">
              <Link
                href="/dashboard"
                className="block text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/settings"
                className="block text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Account Settings
              </Link>
              <button
                className="block text-gray-600 hover:text-gray-900 text-left"
                onClick={() => {
                  setIsAuthenticated(false);
                  setUser(null);
                  setIsMenuOpen(false);
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto text-lg font-medium text-gray-900"
              onClick={() => {
                setIsAuthenticated(true);
                setUser({ name: "John Doe" });
                setIsMenuOpen(false);
              }}
            >
              Sign In
            </Button>
            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={() => {
                setIsAuthenticated(true);
                setUser({ name: "New User" });
                setIsMenuOpen(false);
              }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <header className={`bg-black text-white shadow-lg relative z-50 ${className}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">Fast Replicate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <MainNavigation />
          </div>

          {/* Desktop User Area */}
          <div className="hidden md:flex items-center">
            <UserArea />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex items-center justify-between pb-4">
                  <span className="text-xl font-bold text-black">Fast Replicate</span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm" className="text-black">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>
                <MobileNavigation />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.displayName = "Header";

export default Header;