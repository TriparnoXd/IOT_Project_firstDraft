import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageShell } from "./components/layout/PageShell";
import { SimulationProvider } from "./components/SimulationContext";

// Placeholders for routes
import Home from "./pages/Home";
import Traffic from "./pages/Traffic";
import Parking from "./pages/Parking";
import EvCharging from "./pages/EvCharging";
import Demo from "./pages/Demo";
import Future from "./pages/Future";

export default function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <PageShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/traffic" element={<Traffic />} />
            <Route path="/parking" element={<Parking />} />
            <Route path="/ev-charging" element={<EvCharging />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/future" element={<Future />} />
          </Routes>
        </PageShell>
      </BrowserRouter>
    </SimulationProvider>
  );
}
