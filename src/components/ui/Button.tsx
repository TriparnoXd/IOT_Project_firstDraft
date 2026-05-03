import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-sm font-accent text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90":
              variant === "primary",
            "bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border-active)]":
              variant === "secondary",
            "border border-[var(--border-active)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]":
              variant === "outline",
            "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]":
              variant === "ghost",
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 py-2": size === "md",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
