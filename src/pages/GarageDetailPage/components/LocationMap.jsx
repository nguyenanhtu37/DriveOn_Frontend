import React from "react";
import L from "leaflet";
import "../../HomePage/GarageMap/leaflet.css";
import osm from "@/constants/osm-provider";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
const garageIcon = L.icon({
  iconUrl: "/garageMarker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

export const LocationMap = ({ garage }) => {
  const mapRef = React.useRef(null);

  return (
    <div className="relative w-full h-full overflow-hidden z-0">
      <MapContainer
        ref={mapRef}
        center={[
          garage?.location.coordinates[1] ?? 0,
          garage?.location.coordinates[0] ?? 0,
        ]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution={osm.maptiler.attribution}
          url={osm.maptiler.url}
        />
        <Marker
          position={[
            garage?.location.coordinates[1] ?? 0,
            garage?.location.coordinates[0] ?? 0,
          ]}
          icon={garageIcon}
        >
          <Popup>
            <div className="text-center text-sm font-semibold text-gray-700 px-2 py-4">
              {garage?.name}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
