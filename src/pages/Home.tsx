import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GitCommitHorizontal, Car, Zap } from "lucide-react";
import { useCountUp } from "../lib/hooks/useSimulatedData";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--bg-base)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--bg-base)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#grid-fade)" />
      </svg>
      {/* Animated Flow Lines */}
      <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50 animate-[flowRight_8s_linear_infinite]" />
      <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--signal-blue)] to-transparent opacity-50 animate-[flowLeft_12s_linear_infinite]" />
      <div className="absolute left-[30%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--signal-purple)] to-transparent opacity-50 animate-[flowDown_10s_linear_infinite]" />
    </div>
  );
}

function StatTicker() {
  const events = useCountUp(1247853, 3000);
  const activeSensors = useCountUp(1247, 2000);
  const aiPredictions = useCountUp(48291, 2500);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 text-sm font-mono tracking-wider">
      <div className="flex items-center gap-2">
        <span className="text-[var(--text-muted)]">EVENTS/24H:</span>
        <span className="text-[var(--accent)]">{events.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[var(--text-muted)]">ACTIVE_SENSORS:</span>
        <span className="text-[var(--signal-green)]">{activeSensors.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[var(--text-muted)]">AI_PREDICTIONS:</span>
        <span className="text-[var(--signal-purple)]">{aiPredictions.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 pb-20">
      <AnimatedGrid />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center z-10 scan-lines">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-active)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs font-accent text-[var(--text-secondary)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--signal-blue)] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--signal-blue)]"></span>
          </span>
          SYSTEM ONLINE
        </div>
        
        <h1 className="mb-6 font-display text-5xl font-medium tracking-tight md:text-7xl">
          Infrastructure <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-muted)]">Intelligence</span>
        </h1>
        
        <p className="mb-10 max-w-2xl text-[var(--text-secondary)] font-body md:text-lg">
          A living showcase of a smart city's nervous system. Real-time traffic flow, predictive parking, and dynamic EV charging integrated into a single control plane.
        </p>

        <div className="flex gap-4">
          <Link to="/traffic">
            <Button size="lg" className="gap-2">
              ACCESS TERMINAL <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline" size="lg">
              VIEW SIMULATION
            </Button>
          </Link>
        </div>
      </section>

      <StatTicker />

      {/* Modules Grid */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-accent text-2xl tracking-widest text-[var(--accent)]">/CORE_MODULES</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Traffic Card */}
          <Link to="/traffic" className="group">
            <Card variant="elevated" className="h-full border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <GitCommitHorizontal size={100} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[var(--accent-dim)] rounded text-[var(--accent)]">
                  <GitCommitHorizontal size={20} />
                </div>
                <h3 className="font-accent tracking-widest">TRAFFIC_NET</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-6 flex-1 text-sm">
                Density-based signal control using Gaussian drift models. Watch nodes adapt flow state based on simulated vehicle volume.
              </p>
              <div className="mt-auto h-20 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded flex flex-col justify-end overflow-hidden p-2">
                 <div className="w-full flex items-end gap-1 h-full opacity-60">
                   {[40, 60, 45, 80, 50, 90, 70, 55, 85, 40].map((h, i) => (
                     <div key={i} className="flex-1 bg-[var(--signal-blue)] rounded-t-sm" style={{ height: `${h}%` }} />
                   ))}
                 </div>
              </div>
            </Card>
          </Link>

          {/* Parking Card */}
          <Link to="/parking" className="group">
            <Card variant="elevated" className="h-full border-[var(--border-subtle)] hover:border-[var(--signal-green)] transition-colors relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Car size={100} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[var(--signal-green)]/10 rounded text-[var(--signal-green)]">
                  <Car size={20} />
                </div>
                <h3 className="font-accent tracking-widest">PARK_SENSE</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-6 flex-1 text-sm">
                Distance sensor array simulation. 96 slots tracked in real-time with retro LCD displays and direct serial-style data stream.
              </p>
              <div className="mt-auto h-20 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded grid grid-cols-6 grid-rows-2 gap-1 p-2">
                 {Array.from({length: 12}).map((_, i) => (
                   <div key={i} className={`rounded-sm ${i % 3 === 0 ? 'bg-[var(--signal-red)]/50' : 'bg-[var(--signal-green)]/50'}`} />
                 ))}
              </div>
            </Card>
          </Link>

          {/* EV Card */}
          <Link to="/ev-charging" className="group">
             <Card variant="elevated" className="h-full border-[var(--border-subtle)] hover:border-[var(--signal-amber)] transition-colors relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={100} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[var(--signal-amber)]/10 rounded text-[var(--signal-amber)]">
                  <Zap size={20} />
                </div>
                <h3 className="font-accent tracking-widest">ENERGY_LINK</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-6 flex-1 text-sm">
                V2G (Vehicle-to-Grid) energy routing. Real-time cost calculation and grid-sync simulation visualizing energy flow.
              </p>
              <div className="mt-auto h-20 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded flex gap-2 items-center justify-center p-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--signal-amber)] border-t-transparent animate-spin" />
                  <span className="font-mono text-xs text-[var(--signal-amber)]">42kW FLOW</span>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Global CSS overrides for the page */}
      <style dangerouslySetInnerHTML={{__html: `
        .scan-lines::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 212, 255, 0.03) 3px,
            rgba(0, 212, 255, 0.03) 4px
          );
          pointer-events: none;
          z-index: -1;
        }

        @keyframes flowRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes flowLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes flowDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />
    </div>
  );
}
