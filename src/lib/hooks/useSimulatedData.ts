import { useState, useCallback } from "react";
import { useInterval } from "./useInterval";
import { clamp, gaussianNoise } from "../simulation/utils";
import { useSimulationContext } from "../../components/SimulationContext";

export function useSimulatedData<T>(
  initialState: T | (() => T),
  updateConfig: {
    intervalMs: number;
    updater: (prev: T, scenario: string) => T;
  }
) {
  const [data, setData] = useState<T>(initialState);
  const { speed, scenario } = useSimulationContext();

  useInterval(() => {
    setData((prev) => updateConfig.updater(prev, scenario));
  }, updateConfig.intervalMs / speed);

  return data;
}

export function useTrafficSensor(junctionId: string, initialCount: number) {
  return useSimulatedData(
    { vehicleCount: initialCount, timestamp: new Date() },
    {
      intervalMs: 1500,
      updater: (prev, scenario) => {
        let noiseMean = 0;
        let noiseStdev = 3;
        
        if (scenario === "rush-hour") {
          noiseMean = 1;
          noiseStdev = 5;
        } else if (scenario === "off-peak") {
          noiseMean = -1;
          noiseStdev = 2;
        }

        return {
          vehicleCount: Math.round(
            clamp(prev.vehicleCount + gaussianNoise(noiseMean, noiseStdev), 0, 200)
          ),
          timestamp: new Date(),
        };
      },
    }
  );
}

export function useCountUp(target: number, durationMs: number = 2000) {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((prev) => {
      const step = Math.max(1, Math.ceil(target / (durationMs / 50)));
      if (prev + step >= target) {
        return target;
      }
      return prev + step;
    });
  }, count === target ? null : 50);

  return count;
}
