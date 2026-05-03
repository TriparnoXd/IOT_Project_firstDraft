export const THRESHOLDS = {
  parking: {
    occupied: 15, // cm — slot occupied if distance < 15cm
    available: 15, // cm — slot free if distance > 15cm
  },
  traffic: {
    low: { maxVehicles: 40, signal: "green", duration: 30 }, // seconds
    medium: { maxVehicles: 80, signal: "yellow", duration: 20 },
    high: { maxVehicles: 999, signal: "red", duration: 10 },
  },
};
