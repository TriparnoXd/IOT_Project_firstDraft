import React, { useState } from "react";
import { Zap, MapPin, BatteryCharging, DollarSign } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useSimulationContext } from "../components/SimulationContext";
import { useInterval } from "../lib/hooks/useInterval";
import { cn } from "../lib/utils";

const STATIONS = [
  { id: "CS-01", lat: 51.505, lng: -0.09, status: "active", power: 120 },
  { id: "CS-02", lat: 51.51, lng: -0.1, status: "active", power: 85 },
  { id: "CS-03", lat: 51.515, lng: -0.095, status: "idle", power: 0 },
];

function EnergyFlowDiagram({ v2gActive }: { v2gActive: boolean }) {
  return (
    <Card className="h-64 relative overflow-hidden flex flex-col justify-center bg-[var(--bg-elevated)]">
       <div className="absolute top-4 left-4 text-xs font-mono text-[var(--text-muted)]">ENERGY__ROUTING</div>
       
       <div className="flex items-center justify-between px-8 w-full z-10">
         <div className="flex flex-col items-center gap-2">
           <div className="w-12 h-12 rounded-full border-2 border-[var(--signal-amber)] flex items-center justify-center bg-[#1a1505] text-[var(--signal-amber)] shadow-[0_0_15px_var(--signal-amber)]">
             <Zap size={20} />
           </div>
           <span className="font-mono text-xs">SOLAR/GRID</span>
         </div>

         <div className="flex-1 relative mx-4 h-12 flex items-center">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line 
                x1="0" y1="50%" x2="100%" y2="50%" 
                stroke="var(--border-active)" strokeWidth="2" strokeDasharray="4 4"
              />
              <line 
                x1="0" y1="50%" x2="100%" y2="50%" 
                stroke={v2gActive ? "var(--signal-green)" : "var(--signal-amber)"} 
                strokeWidth="2" 
                strokeDasharray="10 10"
                className={cn("transition-all duration-1000", v2gActive ? "animate-[flowLeft_1s_linear_infinite]" : "animate-[flowRight_1s_linear_infinite]")}
              />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg-elevated)] border border-[var(--border-active)] px-3 py-1 rounded font-mono text-xs font-bold text-[var(--text-primary)]">
              {v2gActive ? "- 42.5 kW" : "+ 120.4 kW"}
            </div>
         </div>

         <div className="flex flex-col items-center gap-2">
           <div className="w-12 h-12 rounded border-2 border-[var(--signal-blue)] flex items-center justify-center bg-[#05111a] text-[var(--signal-blue)] shadow-[0_0_15px_var(--signal-blue)]">
             <BatteryCharging size={20} />
           </div>
           <span className="font-mono text-xs">EV_FLEET</span>
         </div>
       </div>

       <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowRight { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
        @keyframes flowLeft { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 20; } }
       `}} />
    </Card>
  );
}

export default function EvCharging() {
  const { v2gActive, setV2gActive, speed } = useSimulationContext();
  const [sessions, setSessions] = useState([
    { id: "S-104", vehicle: "Tesla Model 3", soc: 45, target: 80, timeRemaining: 34 },
    { id: "S-105", vehicle: "Polestar 2", soc: 82, target: 90, timeRemaining: 12 },
    { id: "S-106", vehicle: "Hyundai Ioniq 5", soc: 20, target: 80, timeRemaining: 45 },
  ]);

  useInterval(() => {
    setSessions(prev => prev.map(s => {
      // Simulate charging up or V2G down
      const delta = v2gActive ? -0.1 : 0.2;
      return { ...s, soc: Math.min(100, Math.max(0, s.soc + delta)) };
    }));
  }, 1000 / speed);

  return (
    <div className="flex flex-col flex-1 p-4 md:p-6 gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-accent text-2xl tracking-widest flex items-center gap-2">
          <Zap className="text-[var(--signal-amber)]" /> ENERGY_LINK
        </h1>
        <Badge variant="outline" status="amber">SMART GRID ENABLED</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <EnergyFlowDiagram v2gActive={v2gActive} />
          
          <div className="grid md:grid-cols-2 gap-6 h-[400px]">
            {/* Map */}
            <Card className="p-0 overflow-hidden relative">
              <MapContainer 
                center={[51.508, -0.095]} 
                zoom={14} 
                style={{ height: "100%", width: "100%", background: 'var(--bg-base)' }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {STATIONS.map((s) => (
                  <CircleMarker 
                    key={s.id}
                    center={[s.lat, s.lng]}
                    radius={8}
                    pathOptions={{ 
                      color: s.status === 'active' ? 'var(--signal-amber)' : 'var(--border-active)',
                      fillColor: s.status === 'active' ? 'var(--signal-amber)' : 'var(--bg-surface)',
                      fillOpacity: 0.8,
                    }}
                  >
                    <Popup><div className="font-mono text-xs p-1">{s.id}<br/>{s.power}kW</div></Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </Card>

            {/* Live Sessions */}
            <Card className="flex flex-col overflow-hidden">
               <div className="mb-4 text-xs font-mono text-[var(--text-muted)] flex justify-between">
                 <span>ACTIVE_SESSIONS</span>
                 <span><span className="text-[var(--signal-amber)]">3</span> / 12</span>
               </div>
               <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                 {sessions.map(s => (
                   <div key={s.id} className="border border-[var(--border-subtle)] p-3 rounded bg-[var(--bg-base)]">
                     <div className="flex justify-between items-center mb-2">
                       <span className="font-accent text-sm">{s.id}</span>
                       <span className="font-mono text-xs text-[var(--text-muted)]">{s.timeRemaining}m rem</span>
                     </div>
                     <span className="text-xs text-[var(--text-secondary)] mb-2 block">{s.vehicle}</span>
                     <div className="flex items-center gap-2">
                       <div className="flex-1 h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                         <div 
                           className={cn("h-full transition-all duration-1000", v2gActive ? "bg-[var(--signal-blue)]" : "bg-[var(--signal-amber)]")} 
                           style={{ width: `${s.soc}%` }} 
                         />
                       </div>
                       <span className="font-mono text-xs w-10 text-right">{s.soc.toFixed(0)}%</span>
                     </div>
                   </div>
                 ))}
               </div>
            </Card>
          </div>
        </div>

        {/* Right Column - V2G & Calculator */}
        <div className="flex flex-col gap-6">
          <Card className={cn(
            "border-2 transition-all", 
            v2gActive ? "border-[var(--signal-blue)] bg-[var(--signal-blue)]/5" : "border-[var(--border-subtle)]"
          )}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-accent tracking-widest text-[var(--text-primary)]">V2G_MODE</h3>
              <div 
                className={cn("w-12 h-6 rounded-full cursor-pointer relative transition-colors", v2gActive ? "bg-[var(--signal-blue)]" : "bg-[var(--bg-elevated)]")}
                onClick={() => setV2gActive(!v2gActive)}
                aria-hidden="true"
              >
                 <div className={cn("absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform", v2gActive && "translate-x-6")} />
              </div>
            </div>
            
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Vehicle-to-Grid enables parked EVs to discharge power back to the network during peak demand.
            </p>
            
            {v2gActive && (
              <div className="space-y-4">
                <div className="bg-[var(--bg-base)] p-3 rounded border border-[var(--border-subtle)]">
                   <div className="text-xs text-[var(--signal-green)] mb-1">REVENUE EARNED</div>
                   <div className="font-display text-2xl font-light">+$28.40 <span className="text-sm opacity-50">THIS SESSION</span></div>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-muted)]">PROTECTED FLOOR</span>
                  <span className="text-[var(--text-primary)]">20% SOC</span>
                </div>
              </div>
            )}
          </Card>

          <Card className="flex-1 flex flex-col">
            <h3 className="font-accent tracking-widest text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <DollarSign size={16} className="text-[var(--signal-green)]"/> RATE_CALCULATOR
            </h3>

             <div className="space-y-6 flex-1">
               <div>
                 <div className="flex justify-between text-xs mb-2 text-[var(--text-muted)]">
                   <span>TARGET CHARGE</span>
                   <span>80%</span>
                 </div>
                 <input type="range" className="w-full h-1 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]" defaultValue={80} />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 border border-[var(--border-subtle)] rounded">
                   <div className="text-[10px] text-[var(--text-muted)] mb-1">PARKING RATE</div>
                   <div className="font-mono text-sm">$4.00 / hr</div>
                 </div>
                 <div className="p-3 border border-[var(--border-subtle)] rounded">
                   <div className="text-[10px] text-[var(--text-muted)] mb-1">ENERGY TARIFF</div>
                   <div className="font-mono text-sm">0.24 / kWh</div>
                 </div>
               </div>
               
               <div className="mt-auto p-4 bg-[var(--bg-elevated)] border border-[var(--border-active)] rounded text-center shadow-inner">
                 <div className="text-[10px] tracking-widest text-[var(--text-secondary)] mb-1">EST. COST TOTAL</div>
                 <div className="font-display text-4xl text-[var(--text-primary)]">$14.80</div>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
