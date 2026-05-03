import React, { createContext, useContext, useState, ReactNode } from "react";

export type Scenario = "normal" | "rush-hour" | "off-peak";

export interface SimulationContextProps {
  scenario: Scenario;
  setScenario: (scenario: Scenario) => void;
  speed: 0.5 | 1 | 2 | 4;
  setSpeed: (speed: 0.5 | 1 | 2 | 4) => void;
  isPeakHour: boolean;
  totalVehicles: number;
  setTotalVehicles: React.Dispatch<React.SetStateAction<number>>;
  parkingOccupancy: number; // 0-1
  setParkingOccupancy: React.Dispatch<React.SetStateAction<number>>;
  activeEVSessions: number;
  setActiveEVSessions: React.Dispatch<React.SetStateAction<number>>;
  v2gActive: boolean;
  setV2gActive: (v2g: boolean) => void;
}

const SimulationContext = createContext<SimulationContextProps | undefined>(
  undefined
);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [speed, setSpeed] = useState<0.5 | 1 | 2 | 4>(1);
  const [totalVehicles, setTotalVehicles] = useState(1240);
  const [parkingOccupancy, setParkingOccupancy] = useState(0.45);
  const [activeEVSessions, setActiveEVSessions] = useState(5);
  const [v2gActive, setV2gActive] = useState(false);

  const isPeakHour = scenario === "rush-hour";

  return (
    <SimulationContext.Provider
      value={{
        scenario,
        setScenario,
        speed,
        setSpeed,
        isPeakHour,
        totalVehicles,
        setTotalVehicles,
        parkingOccupancy,
        setParkingOccupancy,
        activeEVSessions,
        setActiveEVSessions,
        v2gActive,
        setV2gActive,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulationContext() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error(
      "useSimulationContext must be used within a SimulationProvider"
    );
  }
  return context;
}
