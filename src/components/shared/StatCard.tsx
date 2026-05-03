import React from "react";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    direction: "up" | "down";
    label?: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, unit, trend, icon, className }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between text-[var(--text-secondary)]">
        <span className="text-xs font-accent uppercase tracking-wider">{label}</span>
        {icon && <span className="opacity-50">{icon}</span>}
      </div>
      
      <div className="flex items-end gap-2">
        <span className="font-display text-3xl font-light text-[var(--text-primary)]">
          {value}
        </span>
        {unit && (
          <span className="mb-1 font-mono text-sm text-[var(--text-muted)]">
            {unit}
          </span>
        )}
      </div>

      {trend && (
        <div
          className={cn("text-xs font-mono mt-1", {
            "text-[var(--signal-red)]": trend.direction === "up", // Assuming up is bad for traffic/occupancy
            "text-[var(--signal-green)]": trend.direction === "down",
          })}
        >
          {trend.direction === "up" ? "▲" : "▼"} {Math.abs(trend.value)}%
          {trend.label && (
            <span className="ml-1 text-[var(--text-muted)]">{trend.label}</span>
          )}
        </div>
      )}
    </Card>
  );
}
