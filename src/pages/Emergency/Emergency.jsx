import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { openGoogleMap } from "@/lib/openGoogleMap"
import { MapPin, Star } from "lucide-react";
import useEmergencyGarages from "@/common/hooks/useEmergency";

const EmergencyGarageScreen = () => {
  const { garages, loading, error } = useEmergencyGarages();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Emergency Garage Nearby</h1>

      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Enter your location (e.g., address, city, zip)"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button disabled>Find Garages</Button>
      </div>

      <p className="text-sm text-center text-muted-foreground mb-4">
        Enter your location to find the nearest emergency garages
      </p>

      <Tabs defaultValue="nearby" className="mb-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="nearby">Nearby Garages</TabsTrigger>
          <TabsTrigger value="services">Emergency Services</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="text-center">Loading garages...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          {garages.map((garage) => (
            <Card key={garage._id} className="rounded-xl shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {garage.distance?.toFixed(2)} km away
                  </div>
                  <div className="text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {garage.ratingAverage || "N/A"}
                  </div>
                </div>
                <h2 className="text-lg font-semibold mb-1">{garage.name}</h2>
                <p className="text-sm text-muted-foreground mb-1">{garage.address}</p>
                <p className="text-sm mb-2">{garage.hasEmergency ? "Open Now" : "Closed"}</p>
                <div className="flex flex-wrap gap-2 text-sm mb-2">
                  {(garage.services || ["Towing", "Battery Jump", "Tire Change"]).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 border rounded-md bg-muted text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => openGoogleMap([garage.lon, garage.lat])}
                >
                  📞 Call {garage.phone || "N/A"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencyGarageScreen;
