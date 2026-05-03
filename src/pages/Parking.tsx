import React, { useState } from "react";
import { useParkingSimulation, LCDDisplay } from "../components/parking/ParkingSimulation";
import { StatCard } from "../components/shared/StatCard";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Car, Battery, AlertCircle, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function Parking() {
  const { slots, logs } = useParkingSimulation(96);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const available = slots.filter(s => !s.isOccupied).length;
  const occupied = slots.length - available;
  const evSlots = slots.filter(s => s.type === "ev");
  const evAvailable = evSlots.filter(s => !s.isOccupied).length;

  const activeSlot = selectedSlot ? slots.find(s => s.id === selectedSlot) : null;

  return (
    <div className="flex flex-col flex-1 p-4 md:p-6 gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-accent text-2xl tracking-widest flex items-center gap-2">
          <Car className="text-[var(--signal-green)]" /> PARK_SENSE
        </h1>
        <div className="flex gap-2">
           {[1, 2, 3].map(floor => (
             <button
               key={floor}
               onClick={() => setSelectedFloor(floor)}
               className={cn(
                 "px-4 py-1.5 font-mono text-sm border transition-colors",
                 selectedFloor === floor 
                   ? "bg-[var(--bg-elevated)] border-[var(--signal-green)] text-[var(--signal-green)]" 
                   : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
               )}
             >
               [P{floor}]
             </button>
           ))}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <StatCard label="Total Capacity" value={slots.length} icon={<Car />} />
         <StatCard label="Available" value={available} trend={{value: 2, direction: "up"}} icon={<ArrowUpRight />} className="border border-[var(--signal-green)]/30 bg-[var(--signal-green)]/5" />
         <StatCard label="Occupied" value={occupied} trend={{value: 1.5, direction: "down"}} icon={<AlertCircle />} />
         <StatCard label="EV Slots Free" value={evAvailable} unit={`/ ${evSlots.length}`} icon={<Battery />} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left: Grid + LCD */}
        <div className="flex-1 flex flex-col gap-6">
          <Card className="flex-1 min-h-[300px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-xs text-[var(--text-muted)]">GRID__VIEW_FLOOR_{selectedFloor}</span>
              <Badge variant="dot" status="green">LIVE SCAN</Badge>
            </div>
            <div className="flex-1 grid grid-cols-8 sm:grid-cols-12 gap-1 sm:gap-2 auto-rows-fr">
              {slots.filter(s => s.floor === selectedFloor).map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={cn(
                    "relative rounded-sm border transition-all overflow-hidden aspect-square flex items-center justify-center group",
                    slot.isOccupied 
                      ? "bg-[var(--signal-red)]/10 border-[var(--signal-red)]/30 text-[var(--signal-red)]" 
                      : "bg-[var(--signal-green)]/10 border-[var(--signal-green)]/30 text-[var(--signal-green)]",
                    selectedSlot === slot.id && "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg-base)]",
                    slot.type === "ev" && !slot.isOccupied && "border-[var(--signal-amber)]/50 bg-[var(--signal-amber)]/10 text-[var(--signal-amber)]"
                  )}
                >
                  <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100">{slot.id.split('-')[1]}</span>
                  {slot.type === "ev" && <ZapIcon className="absolute top-0.5 right-0.5 w-2 h-2 opacity-50" />}
                </button>
              ))}
            </div>
          </Card>
          
          <div className="flex justify-center">
            <LCDDisplay freeSlots={available} />
          </div>
        </div>

        {/* Right: Detail + Console */}
        <div className="lg:w-80 flex flex-col gap-6">
          <Card className="h-48 border-[var(--accent)]/30">
             <div className="mb-4 text-xs font-mono text-[var(--text-muted)]">SLOT__DETAILS</div>
             {activeSlot ? (
               <div className="space-y-4">
                 <div className="flex justify-between items-baseline">
                   <h2 className="font-display text-4xl">{activeSlot.id}</h2>
                   <Badge status={activeSlot.isOccupied ? "red" : "green"} variant="outline">
                     {activeSlot.type.toUpperCase()}
                   </Badge>
                 </div>
                 <div className="space-y-2 font-mono text-sm">
                   <div className="flex justify-between">
                     <span className="text-[var(--text-muted)]">STATUS</span>
                     <span className={activeSlot.isOccupied ? "text-[var(--signal-red)]" : "text-[var(--signal-green)]"}>
                       {activeSlot.isOccupied ? "OCCUPIED" : "AVAILABLE"}
                     </span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-[var(--text-muted)]">SENSOR_DIST</span>
                     <span className="text-[var(--text-primary)]">{activeSlot.distance.toFixed(1)} cm</span>
                   </div>
                 </div>
               </div>
             ) : (
               <div className="h-full flex items-center justify-center font-mono text-sm text-[var(--text-muted)]">
                 SELECT_SLOT_ON_GRID
               </div>
             )}
          </Card>

          <Card className="flex-1 min-h-[250px] bg-[#05080a] flex flex-col font-mono text-xs p-0 overflow-hidden">
             <div className="px-3 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex justify-between items-center text-[var(--text-muted)]">
               <span>/dev/ttyACM0</span>
               <div className="flex gap-2 items-center">
                 <span className="w-2 h-2 rounded-full bg-[var(--signal-green)] animate-pulse" />
                 <span>9600 baud</span>
               </div>
             </div>
             <div className="flex-1 overflow-y-auto p-3 space-y-1">
               {logs.map((log, i) => (
                 <div key={i} className={cn(
                   "whitespace-pre-wrap break-all",
                   i === 0 ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]",
                   log.includes("OCCUPIED") ? "text-[var(--signal-red)]/80" : "text-[var(--signal-green)]/80"
                 )}>
                   {log}
                 </div>
               ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple embedded icon to avoid missing import
function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
}
