import React from "react";
import { JunctionCard } from "../components/traffic/JunctionCard";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { Activity, MapPin } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const JUNCTIONS = [
  { id: "JCT-A", name: "North-South Corridor", lat: 51.505, lng: -0.09, initial: 78 },
  { id: "JCT-B", name: "Commercial District", lat: 51.51, lng: -0.1, initial: 45 },
  { id: "JCT-C", name: "Port Authority", lat: 51.515, lng: -0.095, initial: 110 },
  { id: "JCT-D", name: "Residential East", lat: 51.50, lng: -0.08, initial: 20 },
];

export default function Traffic() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Left Panel - Controls */}
      <div className="w-full md:w-1/3 xl:w-1/4 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] p-4 flex flex-col h-full overflow-y-auto">
        <div className="mb-6">
          <h1 className="font-accent text-2xl tracking-widest text-[var(--text-primary)] flex items-center gap-2 mb-2">
            <Activity className="text-[var(--accent)]" /> TRAFFIC_NET
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Density-based signal control active. Gaussian drift simulation applied to vehicle counts.
          </p>
        </div>

        <div className="space-y-4 flex-1">
          {JUNCTIONS.map((j) => (
            <JunctionCard key={j.id} id={j.id} name={j.name} initialCount={j.initial} />
          ))}
        </div>

        <Card variant="outline" className="mt-4 border-[var(--signal-purple)]/30 bg-[var(--signal-purple)]/5">
          <div className="flex items-center gap-2 mb-2">
            <Badge status="purple" variant="dot">AI PREDICTION</Badge>
            <span className="text-xs font-mono text-[var(--signal-purple)]">94% CONF</span>
          </div>
          <p className="text-sm font-mono text-[var(--text-primary)] p-2">
             Predicted congestion in 12 min at JCT-C. Rerouting suggested via JCT-A.
          </p>
        </Card>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 bg-[var(--bg-base)] relative">
        <MapContainer 
          center={[51.508, -0.09]} 
          zoom={13} 
          style={{ height: "100%", width: "100%", background: 'var(--bg-base)' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {JUNCTIONS.map((j) => (
            <CircleMarker 
              key={j.id}
              center={[j.lat, j.lng]}
              radius={12}
              pathOptions={{ 
                color: 'var(--accent)',
                fillColor: 'var(--accent)',
                fillOpacity: 0.2,
                weight: 2
              }}
            >
              <Popup className="custom-popup">
                <div className="font-mono text-xs p-1">
                  <strong>{j.id}</strong><br/>
                  {j.name}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        
        {/* Map Overlay Stats */}
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2 pointer-events-none">
          <Card className="bg-[var(--bg-elevated)]/90 backdrop-blur pointer-events-auto p-3">
             <div className="text-xs font-mono text-[var(--text-muted)] mb-1 flex items-center gap-1">
               <MapPin size={12}/> ACTIVE REGION
             </div>
             <div className="font-accent text-sm">SECTOR 7G</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
