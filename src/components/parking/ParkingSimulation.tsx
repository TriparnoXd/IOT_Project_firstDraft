import React, { useState } from "react";
import { useInterval } from "../../lib/hooks/useInterval";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";
import { useSimulationContext } from "../SimulationContext";

interface Slot {
  id: string;
  floor: number;
  isOccupied: boolean;
  distance: number;
  type: "standard" | "ev" | "disabled";
}

export function useParkingSimulation(totalSlots: number = 96) {
  const { speed, scenario } = useSimulationContext();
  const [slots, setSlots] = useState<Slot[]>(() => {
    return Array.from({ length: totalSlots }).map((_, i) => ({
      id: `P${Math.floor(i / 32) + 1}-${String(i % 32 + 1).padStart(2, '0')}`,
      floor: Math.floor(i / 32) + 1,
      isOccupied: Math.random() > (scenario === 'rush-hour' ? 0.2 : 0.6),
      distance: Math.random() * 200,
      type: i % 10 === 0 ? "ev" : i % 24 === 0 ? "disabled" : "standard",
    }));
  });
  
  const [logs, setLogs] = useState<string[]>([]);

  useInterval(() => {
    setSlots((prev) => {
      const idx = Math.floor(Math.random() * prev.length);
      const newSlots = [...prev];
      const slot = newSlots[idx];
      const newlyOccupied = scenario === 'rush-hour' ? Math.random() > 0.1 : !slot.isOccupied;
      
      slot.isOccupied = newlyOccupied;
      slot.distance = newlyOccupied ? 8.2 + Math.random() * 5 : 150 + Math.random() * 100;
      
      const time = new Date().toISOString().substring(11, 19);
      const newLog = `> [${time}] Sensor ${slot.id}: ${slot.distance.toFixed(1)}cm → ${newlyOccupied ? "OCCUPIED" : "AVAILABLE"}`;
      
      setLogs(l => [newLog, ...l].slice(0, 50));
      return newSlots;
    });
  }, 800 / speed);

  return { slots, logs };
}

export function LCDDisplay({ freeSlots }: { freeSlots: number }) {

  return (
    <Card className="bg-[#0A1A0A] border-[#1f3f1f] shadow-inner p-4 font-mono w-full max-w-sm self-center">
      <div className="text-[#00FF41] text-lg leading-relaxed whitespace-pre" style={{ textShadow: "0 0 5px #00FF41" }}>
        WELCOME!<br/>
        Slot Left: {String(freeSlots).padStart(2, '0')}
        <span className="animate-pulse">_</span>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#00FF41_3px,#00FF41_4px)]" />
    </Card>
  );
}
