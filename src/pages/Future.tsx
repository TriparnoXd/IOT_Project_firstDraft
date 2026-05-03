import React from "react";
import { Zap, Network, ShieldCheck, Route, Coins } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

const ROADMAP = [
  {
    id: "q2_2026",
    title: "Phase 1: Foundation",
    date: "Q2 2026 (NOW)",
    active: true,
    items: [
      { title: "IoT Sensor Fabric", desc: "Deployment of 10,000 HC-SR04/inductive loop arrays.", icon: Network },
      { title: "Dynamic Signal Control", desc: "Gaussian edge-computed traffic mitigation.", icon: Route },
    ]
  },
  {
    id: "q4_2026",
    title: "Phase 2: Decentralization",
    date: "Q4 2026",
    active: false,
    items: [
      { title: "V2G Expansion", desc: "Bi-directional EV charging network enabled city-wide.", icon: Zap },
      { title: "Blockchain Micro-payments", desc: "Automated toll and parking settlements via smart contracts.", icon: Coins },
    ]
  },
  {
    id: "q2_2027",
    title: "Phase 3: Digital Twin",
    date: "Q2 2027",
    active: false,
    items: [
      { title: "Full System Sync", desc: "Real-time 3D simulation of all municipal assets.", icon: Network },
      { title: "Autonomous Corridors", desc: "Dedicate AV-only lanes responding to live V2X telemetry.", icon: Route },
    ]
  },
  {
    id: "2029",
    title: "Phase 4: Sentience",
    date: "2029",
    active: false,
    items: [
      { title: "Predictive Incident Response", desc: "AI preempts accidents before they happen and routes EMS.", icon: ShieldCheck },
    ]
  }
];

export default function Future() {
  return (
    <div className="flex flex-col flex-1 p-4 md:p-12 gap-12 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-8 mt-12">
        <h1 className="font-display text-4xl md:text-5xl mb-6 tracking-tight">
          Beyond Infrastructure
        </h1>
        <p className="text-[var(--text-secondary)] font-body text-lg leading-relaxed">
          The current operating model is only the foundation. Over the next three years, the system will evolve from reactive automation to predictive, decentralized orchestration.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-[23px] md:left-1/2 w-0.5 bg-[var(--border-subtle)] -translate-x-[1px]" />

        <div className="space-y-16 relative z-10">
          {ROADMAP.map((phase, index) => (
            <div key={phase.id} className="flex flex-col md:flex-row items-start gap-8">
              {/* Timeline marker */}
              <div className={`hidden md:flex flex-1 justify-end pt-2 ${phase.active ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                <div className="text-right">
                  <div className="font-accent tracking-widest text-sm mb-1">{phase.date}</div>
                  <div className="font-mono text-xs opacity-60">{phase.id.toUpperCase()}</div>
                </div>
              </div>

              {/* Node */}
              <div className="relative flex items-center justify-center shrink-0 w-12 h-12 bg-[var(--bg-base)] rounded-full z-10 border-[4px] border-[var(--bg-base)]">
                 <div className={`w-full h-full rounded-full border-2 flex items-center justify-center
                   ${phase.active 
                     ? 'border-[var(--accent)] bg-[var(--accent-dim)] animate-pulse shadow-[0_0_15px_var(--accent)]' 
                     : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)]'
                   }`}
                 >
                   <span className="w-2 h-2 rounded-full bg-current" />
                 </div>
              </div>
              
              {/* Mobile date */}
              <div className={`md:hidden font-accent tracking-widest text-sm mt-3 ${phase.active ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                 {phase.date}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4 pt-1 md:pt-0 w-full ml-12 md:ml-0">
                <h2 className={`font-display text-xl ${phase.active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  {phase.title}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {phase.items.map((item, i) => (
                    <Card key={i} className={`flex flex-col gap-3 ${!phase.active && 'opacity-60 grayscale hover:grayscale-0 transition-all border-[var(--border-subtle)] border-dashed'}`}>
                       <div className="flex items-center gap-3">
                         <div className={`p-2 rounded ${phase.active ? 'bg-[var(--accent-dim)] text-[var(--accent)]' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'}`}>
                           <item.icon size={16} />
                         </div>
                         <h3 className="font-accent text-xs tracking-wider uppercase text-[var(--text-primary)]">{item.title}</h3>
                       </div>
                       <p className="text-sm font-body text-[var(--text-secondary)]">{item.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
