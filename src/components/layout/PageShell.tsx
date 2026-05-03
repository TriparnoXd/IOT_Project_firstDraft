import React from "react";
import { Navigation } from "./Navigation";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-body flex flex-col selection:bg-[var(--accent)] selection:text-black">
      <Navigation />
      <main className="flex-1 flex flex-col relative z-0">{children}</main>
    </div>
  );
}
