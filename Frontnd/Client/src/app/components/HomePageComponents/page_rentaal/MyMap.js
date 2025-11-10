// F' blassa bhal: components/MyMap.js

"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // L'IMPORT L'MOHIM DYAL CSS
import { Icon } from "leaflet"; // L'IMPORT DYAL L'ICON

// ===== START: L'7ell dyal L'Icons (Mochkil Me3rouf) =====
// Hada bach tkhdem l'icône dyal l'Marker, darori
const DefaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
// ===== END: L'7ell dyal L'Icons =====

export default function MyMap() {
  const position = [31.6295, -7.9811]; // L'Position (Ana dert Marrakesh)

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%", borderRadius: "10px" }}
    >
      {/* Hada howa l'API li fabor (OpenStreetMap) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Hna tqdar dir l'marker (l'punaise) */}
      <Marker position={position} icon={DefaultIcon}>
        <Popup>
          Hna fin bghiti. <br /> Tqdar tkteb ay 7aja.
        </Popup>
      </Marker>
    </MapContainer>
  );
}