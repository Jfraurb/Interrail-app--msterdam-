"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { stops } from "@/data/route";

export default function LeafletMap({ visited }: { visited: Set<string> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
    }).setView([stops[0].lat, stops[0].lng], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Route line connecting the stops in order
    const latlngs: [number, number][] = stops.map((s) => [s.lat, s.lng]);
    L.polyline(latlngs, {
      color: "#B33F32",
      weight: 3,
      dashArray: "1 8",
      lineCap: "round",
    }).addTo(map);

    stops.forEach((stop) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="
            width:28px;height:28px;border-radius:9999px;
            background:#123A45;color:#fff;border:2px solid #fff;
            display:flex;align-items:center;justify-content:center;
            font-family:var(--font-mono),monospace;font-size:11px;font-weight:600;
            box-shadow:0 2px 6px rgba(0,0,0,0.25);
          ">${String(stop.order).padStart(2, "0")}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
      marker.bindPopup(
        `<strong>${stop.name}</strong><br/><span style="font-size:12px">${stop.summary}</span><br/>` +
          `<a href="https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}" target="_blank" rel="noreferrer" style="font-size:12px;color:#B33F32">Abrir en Google Maps →</a>`
      );
      markersRef.current[stop.id] = marker;
    });

    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [30, 30] });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Reflect visited state on marker style
  useEffect(() => {
    stops.forEach((stop) => {
      const marker = markersRef.current[stop.id];
      if (!marker) return;
      const isVisited = visited.has(stop.id);
      const el = marker.getElement()?.querySelector("div") as HTMLDivElement | null;
      if (el) {
        el.style.background = isVisited ? "#B33F32" : "#123A45";
      }
    });
  }, [visited]);

  return <div ref={containerRef} className="leaflet-map-container" />;
}
