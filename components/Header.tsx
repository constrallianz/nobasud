"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Menu, MessageCircle } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/data/constants";
import { logoPath } from "@/data/header";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";


export function Header() {
  const location = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img 
                src={logoPath} 
                alt="NOBASUD Logo" 
                className="h-12 w-auto cursor-pointer"
                data-testid="logo-nobasud"
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 ml-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-semibold ${
                  location === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Feedback CTA Button - Centered */}
          <div className="hidden lg:flex justify-center flex-1">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <Link href="/feedback" data-testid="button-feedback-desktop">
                <MessageCircle className="mr-2 h-4 w-4" />
                Feedback Citoyen
              </Link>
            </Button>
          </div>
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {NAVIGATION_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg py-2 transition-colors ${
                        location === item.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                      data-testid={`nav-link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                    <Link href="/feedback" onClick={() => setIsOpen(false)} data-testid="button-feedback-mobile">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Feedback Citoyen
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
