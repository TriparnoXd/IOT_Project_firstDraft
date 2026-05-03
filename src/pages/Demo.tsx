import React, { useEffect, useState } from "react";
import { MousePointer2, Play, Pause, RotateCcw, FastForward } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useSimulationContext, Scenario } from "../components/SimulationContext";
import { cn } from "../lib/utils";
import { useInterval } from "../lib/hooks/useInterval";

function CircuitDiagram({ scenario }: { scenario: Scenario }) {
  // SVG drawing of Arduino with LEDs showing states based on scenario
  return (
    <Card className="h-full bg-[#0a0a0a] border-[#222] flex items-center justify-center p-8 relative overflow-hidden group">
      <div className="absolute top-2 left-2 text-[10px] font-mono text-[var(--text-muted)]">CIRCUIT_SCHEMATIC</div>
      
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-sm">
        {/* Arduino Board */}
        <rect x="50" y="80" width="160" height="120" rx="4" fill="#006468" stroke="#004c4e" strokeWidth="2" />
        <text x="130" y="145" fill="white" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.8">Arduino UNO</text>
        
        {/* Connections and LEDs */}
        <g stroke="#555" strokeWidth="2" fill="none">
           {/* Sensor lines */}
           <path d="M 210 110 L 280 110" />
           <path d="M 210 130 L 280 130" />
           
           {/* Signal lines */}
           <path d="M 210 160 L 260 160 L 260 210 L 290 210" />
           <path d="M 210 170 L 250 170 L 250 240 L 290 240" />
        </g>
        
        {/* Components */}
        {/* HC-SR04 */}
        <rect x="280" y="100" width="40" height="40" fill="#222" stroke="#555" strokeWidth="2" />
        <circle cx="290" cy="120" r="10" fill="#银" stroke="#888" />
        <circle cx="310" cy="120" r="10" fill="#银" stroke="#888" />
        <text x="300" y="155" fill="var(--text-muted)" fontSize="8" fontFamily="monospace" textAnchor="middle">HC-SR04</text>
        
        {/* LEDs */}
        <circle cx="300" cy="210" r="8" fill={scenario !== "rush-hour" ? "#00FF94" : "#113322"} stroke="#222" className="transition-colors duration-500" />
        <text x="320" y="213" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">GREEN</text>
        
        <circle cx="300" cy="240" r="8" fill={scenario === "rush-hour" ? "#FF4444" : "#441111"} stroke="#222" className="transition-colors duration-500" />
        <text x="320" y="243" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">RED</text>

        {/* Pulsing data lines */}
        <line x1="210" y1="110" x2="280" y2="110" stroke="#00D4FF" strokeWidth="2" strokeDasharray="5 5" className="animate-[flowRight_1s_linear_infinite]" opacity="0.6" />
      </svg>
      
      <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none" />
    </Card>
  );
}

export default function Demo() {
  const { scenario, setScenario, speed, setSpeed } = useSimulationContext();
  const [isPlaying, setIsPlaying] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  useInterval(() => {
    if (!isPlaying) return;
    
    const messages = [
      `Sensor 1: ${(Math.random() * 50 + (scenario === 'rush-hour' ? 10 : 80)).toFixed(1)} cm → ${scenario === 'rush-hour' ? 'HIGH' : 'LOW'} density`,
      `Signal changed: North=${scenario === 'rush-hour' ? 'RED' : 'GREEN'}, South=${scenario === 'rush-hour' ? 'GREEN' : 'RED'}`,
      `Sensor 2: ${(Math.random() * 20).toFixed(1)} cm → ${Math.random() > 0.5 ? 'OCCUPIED' : 'AVAILABLE'}`,
      `LCD updated: Slot Left: ${Math.floor(Math.random() * 96)}`,
      `EV Comm: Target 80%, Current Power: ${(Math.random() * 50 + 50).toFixed(1)}kW`
    ];
    
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const time = new Date().toISOString().substring(11, 19);
    
    setLogs(prev => [`> [${time}] ${msg}`, ...prev].slice(0, 50));
  }, isPlaying ? 1200 / speed : null);

  const handleScenarioChange = (s: Scenario) => {
    setScenario(s);
    setLogs(prev => [`> --- SCENARIO CHANGED: ${s.toUpperCase()} ---`, ...prev]);
  };

  return (
    <div className="flex flex-col flex-1 p-4 md:p-6 gap-6 max-w-7xl mx-auto w-full h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between">
        <h1 className="font-accent text-2xl tracking-widest flex items-center gap-2">
          <MousePointer2 className="text-[var(--signal-blue)]" /> LOGIC_SIMULATION
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
         {/* Left Controls */}
         <div className="w-full lg:w-64 flex flex-col gap-6">
            <Card className="flex flex-col gap-4">
              <h3 className="text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 mb-2">SCENARIO_SELECT</h3>
              
              <div className="space-y-2">
                {(['normal', 'rush-hour', 'off-peak'] as Scenario[]).map(s => (
                  <Button 
                    key={s} 
                    variant={scenario === s ? "secondary" : "ghost"}
                    className={cn("w-full justify-start font-mono text-xs", scenario === s && "border-l-2 border-[var(--accent)]")}
                    onClick={() => handleScenarioChange(s)}
                  >
                    {s.toUpperCase()}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="flex flex-col gap-4">
               <h3 className="text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 mb-2">EXECUTION_CTRL</h3>
               
               <div className="flex gap-2">
                 <Button variant={isPlaying ? "primary" : "outline"} size="sm" className="flex-1" onClick={() => setIsPlaying(!isPlaying)}>
                   {isPlaying ? <Pause size={14}/> : <Play size={14} />} {isPlaying ? 'PAUSE' : 'PLAY'}
                 </Button>
                 <Button variant="outline" size="sm" onClick={() => setLogs([])}>
                   <RotateCcw size={14} />
                 </Button>
               </div>

               <div className="mt-4">
                 <div className="text-[10px] text-[var(--text-muted)] font-mono mb-2">CLOCK_SPEED</div>
                 <div className="flex bg-[var(--bg-elevated)] rounded border border-[var(--border-subtle)] p-1">
                   {([0.5, 1, 2, 4] as const).map(spd => (
                     <button
                       key={spd}
                       onClick={() => setSpeed(spd)}
                       className={cn(
                         "flex-1 text-xs font-mono py-1 rounded transition-colors",
                         speed === spd ? "bg-[var(--border-active)] text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                       )}
                     >
                       {spd}x
                     </button>
                   ))}
                 </div>
               </div>
            </Card>
         </div>

         {/* Center Circuit Schema */}
         <div className="flex-1">
            <CircuitDiagram scenario={scenario} />
         </div>

         {/* Right Serial Monitor */}
         <div className="w-full lg:w-80 lg:h-full h-64">
           <Card className="h-full bg-[#05080a] flex flex-col font-mono text-xs p-0 overflow-hidden">
             <div className="px-3 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex justify-between items-center text-[var(--text-muted)]">
               <span>SERIAL_MONITOR</span>
               <div className="flex gap-2 items-center">
                 <span className={cn("w-2 h-2 rounded-full", isPlaying ? "bg-[var(--signal-green)] animate-pulse" : "bg-[var(--text-muted)]")} />
               </div>
             </div>
             <div className="flex-1 overflow-y-auto p-3 space-y-1">
               {logs.map((log, i) => (
                 <div key={i} className={cn(
                   "whitespace-pre-wrap break-all",
                   i === 0 ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]",
                   log.includes("RED") ? "text-[var(--signal-red)]" : 
                   log.includes("GREEN") ? "text-[var(--signal-green)]" : ""
                 )}>
                   {log}
                 </div>
               ))}
               {logs.length === 0 && <div className="text-[var(--text-muted)] opacity-50">Waiting for data...</div>}
             </div>
           </Card>
         </div>
      </div>
    </div>
  );
}
