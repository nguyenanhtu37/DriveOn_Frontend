import { useEffect, useState, useRef } from "react";
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from "@/app/stores/view/user";
import { useGeolocation } from "@/common/hooks/useGeolocation";
import { fetchRescueGarages } from "@/app/services/emergency";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "@/pages/HomePage/GarageMap/leaflet.css";
import L from "leaflet";
import Loader from "@/components/Emergency/Loader";
import GarageCard from "@/components/Emergency/GarageCard";
import Navbar from "@/components/Emergency/Navbar";
import osm from "@/constants/osm-provider";
import PopupGarage from "@/components/PopupGarage";
// import { useGetEmergency } from "@/app/stores/entity/emergency";

const garageIcon = L.icon({
  iconUrl: "/garageMarker.png",
  iconSize: [30, 30],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const userIcon = L.icon({
  iconUrl: "/userMarker.png",
  iconSize: [30, 30],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const locationDanang = [16.047079, 108.20623];

// Fetch driving route from OSRM API
async function fetchRoute(from, to) {
  // from: [lat, lng], to: [lat, lng]
  const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.routes && data.routes.length > 0) {
    return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
  }
  return null;
}

const RescueGarages = () => {
  const { location } = useUserStore();
  const [geoError, setGeoError] = useState(null);
  const [directionCoords, setDirectionCoords] = useState(null);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const mapRef = useRef(null);
  useGeolocation();

  const isValidLocation =
    Array.isArray(location) &&
    location.length === 2 &&
    location.every((coord) => !isNaN(coord));

  const {
    data: garages = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['rescue-garages', location],
    queryFn: async () => {
      if (!isValidLocation) throw new Error('Invalid location');

      const [latitude, longitude] = location;
      const response = await fetchRescueGarages(latitude, longitude);

      let data = [];
      if (Array.isArray(response)) {
        data = response;
      } else if (response && Array.isArray(response.data)) {
        data = response.data;
      } else if (response && Array.isArray(response.garages)) {
        data = response.garages;
      } else {
        throw new Error('Invalid API response format');
      }

      return data.filter(
        (garage) =>
          garage &&
          typeof garage === 'object' &&
          garage._id &&
          garage.name &&
          garage.location &&
          Array.isArray(garage.location.coordinates) &&
          garage.location.coordinates.length === 2 &&
          typeof garage.location.coordinates[0] === 'number' &&
          typeof garage.location.coordinates[1] === 'number' &&
          !isNaN(garage.location.coordinates[0]) &&
          !isNaN(garage.location.coordinates[1])
      );
    },
    enabled: isValidLocation, // chỉ gọi khi location hợp lệ
    staleTime: 1000 * 60, // cache 1 phút (có thể điều chỉnh)
  });

  if (geoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{geoError}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!location && !isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg font-semibold">
          Waiting for location access...
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const [lat, lng] = location || locationDanang;

  return (
    <div className=" bg-gray-50 flex flex-col">

      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
        {/* Map Section */}
        <div className="w-full md:w-1/2 relative">
          <div className="sticky top-20 h-[350px] md:h-[calc(100vh-140px)] rounded-2xl shadow-lg overflow-hidden">
            <MapContainer
              ref={mapRef}
              center={[lat, lng]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
              className="z-0"
            >
              <TileLayer
                attribution={osm.maptiler.attribution}
                url={osm.maptiler.url}
              />
              {location && (
                <Marker position={[lat, lng]} icon={userIcon}>
                  <Popup>
                    <div className="text-center text-sm font-semibold text-gray-700 px-2 py-4">
                      Your Location
                    </div>
                  </Popup>
                </Marker>
              )}
              {garages.map((garage) => (
                <Marker
                  key={garage._id}
                  position={[
                    garage.location.coordinates[1],
                    garage.location.coordinates[0],
                  ]}
                  icon={garageIcon}
                  eventHandlers={{
                    click: async () => {
                      setSelectedGarage(garage);
                      const route = await fetchRoute(
                        [lat, lng],
                        [
                          garage.location.coordinates[1],
                          garage.location.coordinates[0],
                        ]
                      );
                      setDirectionCoords(
                        route || [
                          [lat, lng],
                          [
                            garage.location.coordinates[1],
                            garage.location.coordinates[0],
                          ],
                        ]
                      );
                    },
                  }}
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
              {directionCoords && (
                <Polyline
                  positions={directionCoords}
                  pathOptions={{ color: "#f43f5e", weight: 6, opacity: 0.85 }}
                  eventHandlers={{
                    click: () => {
                      setDirectionCoords(null);
                      setSelectedGarage(null);
                    },
                  }}
                />
              )}
            </MapContainer>

            {/* Clear Direction Button */}
            {directionCoords && (
              <button
                className="absolute top-4 right-4 z-20 bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 shadow hover:bg-red-500 hover:text-white transition"
                onClick={() => {
                  setDirectionCoords(null);
                  setSelectedGarage(null);
                }}
              >
                Clear Direction
              </button>
            )}
          </div>
        </div>

        {/* Garage List Section */}
        <div className="w-full md:w-1/2">
          <div className="h-[400px] md:h-[calc(100vh-140px)] overflow-y-auto pr-1 md:pr-2">
            {garages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {garages.map((garage) => (
                  <GarageCard
                    key={garage._id}
                    id={garage._id}
                    garageName={garage.name}
                    rating={garage.ratingAverage}
                    address={garage.address}
                    imgs={garage.interiorImages}
                    openTime={garage.openTime}
                    closeTime={garage.closeTime}
                    tag={garage.tag}
                    location={garage.location?.coordinates}
                    phone={garage.phone}
                    distance={garage.distance}
                    hasEmergency={garage.hasEmergency}
                    description={garage.description}
                    onGetDirections={async (garageLocation) => {
                      setSelectedGarage(garageLocation);
                      const route = await fetchRoute(
                        [lat, lng],
                        [garageLocation[1], garageLocation[0]]
                      );
                      setDirectionCoords(
                        route || [
                          [lat, lng],
                          [garageLocation[1], garageLocation[0]],
                        ]
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-2xl font-semibold text-gray-500 text-center">
                  No garages found within 50km
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default RescueGarages;