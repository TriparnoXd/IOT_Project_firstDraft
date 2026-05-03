import React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-surface border-subtle",
      elevated: "bg-elevated border-border-active shadow-lg",
      outline: "bg-transparent border-subtle",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md border border-[var(--border-subtle)] p-4 transition-colors",
          variant === "default" && "bg-[var(--bg-surface)]",
          variant === "elevated" && "bg-[var(--bg-elevated)] border-[var(--border-active)] shadow-lg shadow-black/50",
          variant === "outline" && "bg-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
