import { useGetGarages } from "@/app/stores/entity/garage";
import osm from "@/constants/osm-provider";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./leaflet.css";

import PopupGarage from "@/components/PopupGarage";
import { getLocation } from "@/app/stores/view/user";
import ScrollToTop from "@/components/ScrollToTop";

const locationDanang = [16.047079, 108.20623];

const garageIcon = L.icon({
  iconUrl: "/garageMarker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const userIcon = L.icon({
  iconUrl: "./userMarker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});
const GarageMap = () => {
  const mapRef = React.useRef(null);
  const garages = useGetGarages();
  const location = getLocation();

  const [lat, lng] = location || locationDanang;
  return (
    <div className="relative w-full h-[calc(100vh-168px)] overflow-hidden z-0">
      <ScrollToTop />
      <MapContainer
        ref={mapRef}
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution={osm.maptiler.attribution}
          url={osm.maptiler.url}
        />
        {location && (
          <Marker position={[lat, lng]} icon={userIcon}>
            <Popup>
              <div className="text-center text-sm font-semibold text-gray-700 px-2 py-4">
                Vị trí của bạn
              </div>
            </Popup>
          </Marker>
        )}

        {garages.data.map((garage) => (
          <Marker
            key={garage._id}
            position={[
              garage.location.coordinates[1] ?? 0,
              garage.location.coordinates[0] ?? 0,
            ]}
            icon={garageIcon}
          >
            <Popup>
              <PopupGarage
                id={garage._id}
                garageName={garage.name}
                address={garage.address}
                openDays={garage.operating_days}
                imgs={garage.interiorImages}
                phone={garage.phone}
                location={garage.location.coordinates}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GarageMap;
