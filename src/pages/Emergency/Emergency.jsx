import { useEffect, useState, useRef } from "react";
import { useUserStore } from "@/app/stores/view/user";
import { useGeolocation } from "@/common/hooks/useGeolocation";
import { fetchRescueGarages } from "@/app/services/emergency";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "@/pages/HomePage/GarageMap/leaflet.css";
import L from "leaflet";
import Loader from "@/components/Emergency/Loader";
import GarageCard from "@/components/Emergency/GarageCard";
import Navbar from "@/components/Navbar";
import osm from "@/constants/osm-provider";
import PopupGarage from "@/components/PopupGarage";

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

const RescueGarages = () => {
  const { location } = useUserStore();
  const [geoError, setGeoError] = useState(null);
  const [garages, setGarages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useGeolocation();

  useEffect(() => {
    const fetchData = async () => {
      if (Array.isArray(location) && location.length === 2 && location.every(coord => !isNaN(coord))) {
        const [latitude, longitude] = location;
        try {
          setIsLoading(true);
          setError(null);
          const response = await fetchRescueGarages(latitude, longitude);

          let data = [];
          if (Array.isArray(response)) {
            data = response;
          } else if (response && Array.isArray(response.data)) {
            data = response.data;
          } else if (response && Array.isArray(response.garages)) {
            data = response.garages;
          } else {
            throw new Error("Invalid API response format");
          }

          // Only keep garages with valid coordinates
          const validGarages = data.filter(
            garage =>
              garage &&
              typeof garage === "object" &&
              garage._id &&
              garage.name &&
              garage.location &&
              Array.isArray(garage.location.coordinates) &&
              garage.location.coordinates.length === 2 &&
              typeof garage.location.coordinates[0] === "number" &&
              typeof garage.location.coordinates[1] === "number" &&
              !isNaN(garage.location.coordinates[0]) &&
              !isNaN(garage.location.coordinates[1])
          );
          setGarages(validGarages);
        } catch (err) {
          setError(err.message || "Failed to fetch garages");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [location]);

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
        <p className="text-gray-500 text-lg font-semibold">Waiting for location access...</p>
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
    <div>
      <Navbar />
      <div className="px-2 md:px-10 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Map Section */}
          <div className="sticky top-24 z-10 h-[350px] md:h-[500px] lg:h-[calc(100vh-140px)] w-full">
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
                    click: () => setSelectedGarage(garage),
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
            </MapContainer>
          </div>

          {/* Garage List Section */}
          <div className="overflow-y-auto h-[350px] md:h-[500px] lg:h-[calc(100vh-140px)]">
            {garages.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
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
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-semibold text-gray-500">
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