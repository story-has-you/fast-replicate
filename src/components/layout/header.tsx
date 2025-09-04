/**
 * Header Component
 * Navigation header with logo, main navigation, and user actions
 */
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, User } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigationItems = [
    { label: 'Home', href: '/', current: true },
    { label: 'Models', href: '/models' },
    { label: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-black">Fast Replicate</span>
          </Link>

          {/* Main Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-black ${
                  item.current 
                    ? 'text-black' 
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-black"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
            
            <Button 
              size="sm"
              className="bg-black hover:bg-gray-800 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;