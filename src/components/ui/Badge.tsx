import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dot" | "outline";
  status?: "green" | "amber" | "red" | "blue" | "purple";
}

export function Badge({
  className,
  variant = "default",
  status = "blue",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-accent uppercase tracking-wider",
        {
          "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]": variant === "default",
          "bg-transparent border border-[var(--border-subtle)]": variant === "outline",
          "bg-[var(--bg-elevated)] border border-[var(--border-subtle)] gap-2": variant === "dot",
        },
        className
      )}
      {...props}
    >
      {variant === "dot" && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-[var(--signal-green)]": status === "green",
            "bg-[var(--signal-amber)]": status === "amber",
            "bg-[var(--signal-red)]": status === "red",
            "bg-[var(--signal-blue)]": status === "blue",
            "bg-[var(--signal-purple)]": status === "purple",
          })}
        />
      )}
      {children}
    </div>
  );
}
