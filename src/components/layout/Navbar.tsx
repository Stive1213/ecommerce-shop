"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "./ThemeToggle";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { logout } from "@/lib/store/authSlice";
import { SearchBar } from "@/components/common/SearchBar";
import { toast } from "@/components/ui/use-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.favorites.items);
  const user = useSelector((s: RootState) => s.auth.user);
  const favCount = favorites.length;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/create", label: "Create" },
    { href: "/favorites", label: "Favorites" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    toast({ title: "Logged out", description: "See you soon!" });
    router.replace("/login"); // client-side navigation keeps Redux state in sync
  };

  // Hide Navbar completely if user is not logged in
  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span role="img" aria-label="shopping bag">
            🛍️
          </span>{" "}
          eShop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
              {item.label === "Favorites" && favCount > 0 && (
                <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                  {favCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search Bar - Desktop */}
          <div className="hidden md:block w-64">
            <SearchBar placeholder="Search products..." />
          </div>

          <ThemeToggle />

          {/* Logout Button - Desktop */}
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium ${
                      pathname === item.href ? "text-primary" : ""
                    }`}
                  >
                    {item.label}
                    {item.label === "Favorites" && favCount > 0 && (
                      <span className="ml-2 text-sm bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                        {favCount}
                      </span>
                    )}
                  </Link>
                ))}

                {/* Mobile Logout */}
                {user && (
                  <button
                    onClick={handleLogout}
                    className="text-lg font-medium text-left flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                )}

                <div className="mt-4">
                  <SearchBar className="w-full" />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
