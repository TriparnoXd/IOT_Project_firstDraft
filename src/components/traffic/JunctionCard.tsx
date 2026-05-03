import React from "react";
import { Card } from "../ui/Card";
import { StatusDot } from "../ui/StatusDot";
import { useTrafficSensor } from "../../lib/hooks/useSimulatedData";
import { THRESHOLDS } from "../../lib/constants/thresholds";

interface JunctionCardProps {
  id: string;
  name: string;
  initialCount: number;
}

export function JunctionCard({ id, name, initialCount }: JunctionCardProps) {
  const data = useTrafficSensor(id, initialCount);
  
  const getSignalState = (count: number) => {
    if (count > THRESHOLDS.traffic.medium.maxVehicles) return "red";
    if (count > THRESHOLDS.traffic.low.maxVehicles) return "amber";
    return "green";
  };

  const nsState = getSignalState(data.vehicleCount);
  // Opposite for East-West to simulate cross traffic wait
  const ewState = nsState === "green" ? "red" : nsState === "amber" ? "amber" : "green";

  const densityPercent = Math.min((data.vehicleCount / 120) * 100, 100);

  return (
    <Card variant="elevated" className="font-mono text-sm">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-[var(--border-subtle)]">
        <span className="font-accent tracking-widest text-xs text-[var(--text-secondary)]">{id} &middot; {name}</span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--text-muted)]">DENSITY</span>
          <span className="text-[var(--text-primary)]">{data.vehicleCount} VEH/MIN</span>
        </div>
        <div className="h-1.5 w-full bg-[var(--bg-base)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--accent)] transition-all duration-1000 ease-linear"
            style={{ width: `${densityPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-4 text-[var(--text-muted)]">N</span>
            <StatusDot status={nsState} />
            <span className="text-xs">{nsState.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 text-[var(--text-muted)]">S</span>
            <StatusDot status={nsState} />
            <span className="text-xs">{nsState.toUpperCase()}</span>
          </div>
        </div>
        <div className="space-y-2">
           <div className="flex items-center gap-2">
            <span className="w-4 text-[var(--text-muted)]">E</span>
            <StatusDot status={ewState} />
            <span className="text-xs">{ewState.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 text-[var(--text-muted)]">W</span>
            <StatusDot status={ewState} />
            <span className="text-xs">{ewState.toUpperCase()}</span>
          </div>
        </div>
      </div>
      
      {/* Fake timer simulation for visuals */}
      <div className="flex justify-between items-center border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">SWITCHING IN</span>
        <span className="text-[var(--signal-amber)]">[{String(Math.floor((data.vehicleCount * id.length) % 30)).padStart(2, '0')}:14]</span>
      </div>
    </Card>
  );
}
