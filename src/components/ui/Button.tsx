"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";

    const variants = {
      primary:
        "bg-[#0B1A17] text-white hover:bg-[#11241F] focus:ring-[#0B1A17]",
      secondary:
        "bg-[#B8935A] text-[#0B1A17] hover:bg-[#96763F] focus:ring-[#B8935A]",
      gold:
        "bg-gradient-to-r from-[#B8935A] to-[#D4B583] text-[#0B1A17] hover:from-[#96763F] hover:to-[#B8935A] font-semibold shadow-md hover:shadow-lg focus:ring-[#B8935A]",
      outline:
        "border-2 border-[#0B1A17] text-[#0B1A17] hover:bg-[#0B1A17] hover:text-white focus:ring-[#0B1A17]",
      ghost:
        "text-[#0B1A17] hover:bg-[#F4F6F9] focus:ring-[#0B1A17]",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 gap-1.5",
      md: "text-sm px-6 py-3 gap-2",
      lg: "text-base px-8 py-4 gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
