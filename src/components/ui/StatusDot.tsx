import React from "react";
import { cn } from "../../lib/utils";

interface StatusDotProps {
  status: "green" | "amber" | "red" | "blue" | "purple";
  animate?: boolean;
  className?: string;
}

export function StatusDot({ status, animate = true, className }: StatusDotProps) {
  return (
    <span className={cn("relative flex h-2.5 w-2.5", className)}>
      {animate && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
            {
              "bg-[var(--signal-green)]": status === "green",
              "bg-[var(--signal-amber)]": status === "amber",
              "bg-[var(--signal-red)]": status === "red",
              "bg-[var(--signal-blue)]": status === "blue",
              "bg-[var(--signal-purple)]": status === "purple",
            }
          )}
        />
      )}
      <span
        className={cn("relative inline-flex rounded-full h-2.5 w-2.5", {
          "bg-[var(--signal-green)] shadow-[0_0_8px_var(--signal-green)]":
            status === "green",
          "bg-[var(--signal-amber)] shadow-[0_0_8px_var(--signal-amber)]":
            status === "amber",
          "bg-[var(--signal-red)] shadow-[0_0_8px_var(--signal-red)]":
            status === "red",
          "bg-[var(--signal-blue)] shadow-[0_0_8px_var(--signal-blue)]":
            status === "blue",
          "bg-[var(--signal-purple)] shadow-[0_0_8px_var(--signal-purple)]":
            status === "purple",
        })}
      />
    </span>
  );
}
