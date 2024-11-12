"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode, useState } from "react";
import ThemeToggle from "./theme-toggle";
import { SidebarCloseIcon, SidebarOpen } from "lucide-react";

export const Nav = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when clicking outside
  const handleClose = () => setIsOpen(false);

  return (
    <nav className="bg-primary text-primary-foreground flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3 shadow-lg relative">
      {/* Desktop navigation */}
      <div className="hidden md:flex space-x-4 sm:space-x-6">{children}</div>

      {/* Theme Toggle Button (Visible on both mobile and desktop) */}
      <ThemeToggle />

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-primary-foreground hover:text-secondary text-3xl"
        aria-label="Toggle navigation"
      >
        <SidebarOpen />
      </button>

      {/* Sidebar for mobile */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full bg-primary text-primary-foreground w-3/4 max-w-xs p-6 shadow-lg transform transition-transform duration-300 ease-in-out z-20",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={handleClose}
          className="flex absolute top-4 right-4 text-2xl text-primary-foreground hover:text-secondary"
          aria-label="Close navigation"
        >
          <SidebarCloseIcon />
        </button>
        <div className="flex flex-col space-y-4 mt-8">{children}</div>
      </div>

      {/* Overlay only renders when sidebar is open */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
};

export const NavLink = (
  props: Omit<ComponentProps<typeof Link>, "className"> & { label?: string }
) => {
  const pathName = usePathname();
  const isActive = pathName === props.href;

  return (
    <Link
      {...props}
      className={cn(
        "relative px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-300 ease-out",
        isActive
          ? 'bg-secondary text-secondary-foreground after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:w-3/4 after:h-0.5 after:bg-accent after:transform after:translate-x-[-50%]'
          : "hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground"
      )}
      aria-current={isActive ? "page" : undefined}
      aria-label={props.label || "Navigation link"}
    />
  );
};
