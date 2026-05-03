import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Activity, Car, Zap, MousePointer2, GitCommitHorizontal, Menu, X } from "lucide-react";
import { StatusDot } from "../ui/StatusDot";
import { useSimulationContext } from "../SimulationContext";

const NAV_LINKS = [
  { href: "/", label: "Overview", icon: Activity },
  { href: "/traffic", label: "Traffic", icon: GitCommitHorizontal },
  { href: "/parking", label: "Parking", icon: Car },
  { href: "/ev-charging", label: "EV Charging", icon: Zap },
  { href: "/demo", label: "Demo", icon: MousePointer2 },
  { href: "/future", label: "Future", icon: Zap }, // Will replace icon if needed
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { v2gActive } = useSimulationContext();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--accent-dim)] text-[var(--accent)]">
              <Activity size={18} />
            </div>
            <span className="font-accent text-sm font-semibold tracking-widest text-[var(--text-primary)] hidden sm:inline-block">
              CITY.OS
            </span>
          </Link>
          
          <div className="hidden h-5 w-px bg-[var(--border-subtle)] md:block" />

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-accent uppercase tracking-wider transition-colors",
                  location.pathname === link.href
                    ? "bg-[var(--bg-elevated)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                )}
              >
                <link.icon size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
            {v2gActive && (
               <div className="flex items-center gap-2 bg-[var(--signal-blue)]/10 px-2 py-1 rounded text-[var(--signal-blue)]">
                 <Zap size={12} />
                 <span>V2G ACTIVE</span>
               </div>
            )}
            <div className="flex items-center gap-2 border border-[var(--border-subtle)] px-2 py-1 rounded">
              <StatusDot status="green" />
              <span>LIVE &middot; 1,247 SENSORS</span>
            </div>
          </div>
          
          <button 
            className="lg:hidden text-[var(--text-secondary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] p-4 flex flex-col gap-2">
           {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-accent uppercase tracking-wider transition-colors",
                  location.pathname === link.href
                    ? "bg-[var(--accent-dim)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                )}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
}
