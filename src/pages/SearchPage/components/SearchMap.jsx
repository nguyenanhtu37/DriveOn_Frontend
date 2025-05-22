import osm from "@/constants/osm-provider";
import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import "./leaflet.css";

import PopupGarage from "@/components/PopupGarage";
import { getLocation } from "@/app/stores/view/user";
import ScrollToTop from "@/components/ScrollToTop";
import { useGetDriving } from "@/app/stores/entity/driving";
import { X } from "lucide-react";

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
const SearchMap = ({ garages, direction, setDirection, clearDirection }) => {
  const mapRef = React.useRef(null);

  const location = getLocation();
  const getDriving = useGetDriving();
  const handleDirectionClick = (garage) => {
    const origin = {
      lat: location[0],
      lon: location[1],
    };
    const destination = {
      lat: garage[1],
      lon: garage[0],
    };
    getDriving.mutate(
      {
        origin,
        destination,
      },
      {
        onSuccess: (data) => {
          const route = data.routes[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
          setDirection(route);
        },
      }
    );
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([location[0], location[1]], 13, {
        animate: true,
        duration: 2,
      });
    }
  }, [location, direction]);

  const [lat, lng] = location || locationDanang;
  return (
    <div className=" relative h-full">
      {direction && (
        <div
          className=" absolute right-4 top-4 bg-white p-2 cursor-pointer rounded-full shadow-md z-40 hover:shadow-lg transition-all duration-300"
          onClick={clearDirection}
        >
          <X size={16} />
        </div>
      )}
      <div className="relative w-full h-full overflow-hidden z-0">
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
                  Your location
                </div>
              </Popup>
            </Marker>
          )}
          {direction && (
            <>
              {/* Outline layer (background line) */}
              <Polyline
                positions={direction}
                pathOptions={{
                  color: "#ffffff",
                  weight: 10,
                  opacity: 1,
                }}
              />

              {/* Main colored line (foreground line) */}
              <Polyline
                positions={direction}
                pathOptions={{
                  color: "#4285F4",
                  weight: 6,
                  opacity: 1,
                }}
              />
            </>
          )}

          {garages?.map((garage) => (
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
                  handleDirectionClick={() =>
                    handleDirectionClick(garage.location.coordinates)
                  }
                />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SearchMap;
