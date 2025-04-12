import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Star,
  Search,
  Car,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data
const nearbyGarages = [
  {
    id: 1,
    name: "Quick Fix Auto",
    distance: 1.2,
    rating: 4.8,
    address: "123 Main St, Anytown",
    availableUntil: "10:00 PM",
    services: ["Towing", "Battery Jump", "Tire Change"],
    availability: "Open Now",
    phone: "555-123-4567",
  },
  {
    id: 2,
    name: "Emergency Auto Care",
    distance: 2.5,
    rating: 4.6,
    address: "456 Oak Ave, Anytown",
    availableUntil: "11:00 PM",
    services: ["Towing", "Oil Change"],
    availability: "Open Now",
    phone: "555-987-6543",
  },
];

export default function EmergencyGaragePage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // mock loading
  };

  const handleCallGarage = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-archivo px-4 sm:px-6 py-8 max-w-5xl mx-auto space-y-6">
  {/* Back button */}
  <div className="flex items-center text-sm font-medium">
    <Link to="/" className="flex items-center text-foreground hover:underline">
      <ArrowLeft className="w-4 h-4 mr-1" />
      Back
    </Link>
  </div>

  {/* Title */}
  <h1 className="text-3xl font-bold text-center text-foreground">
    Emergency Garage Finder
  </h1>

  {/* Emergency alert */}
  <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg px-4 py-3 flex items-start gap-3 shadow-sm">
    <AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-600" />
    <div className="text-sm leading-relaxed">
      <strong className="block font-semibold mb-1">Emergency Services</strong>
      If this is a life-threatening emergency, please call <strong>911</strong> immediately.
    </div>
  </div>

  {/* Search form */}
  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-stretch">
    <Input
      type="text"
      placeholder="Enter your location (e.g., address, city, zip)"
      value={searchLocation}
      onChange={(e) => setSearchLocation(e.target.value)}
      className="flex-1"
    />
    <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
      <Search className="w-4 h-4 mr-2" />
      Find Garages
    </Button>
  </form>
  <p className="text-xs text-muted-foreground text-center">
    Enter your location to find the nearest emergency garages
  </p>

  {/* Tabs */}
  <Tabs defaultValue="nearby" className="w-full">
    <TabsList className="grid grid-cols-2 bg-muted rounded-md mb-4 overflow-hidden">
      <TabsTrigger value="nearby">Nearby Garages</TabsTrigger>
      <TabsTrigger value="services">Emergency Services</TabsTrigger>
    </TabsList>

    {/* Nearby Garages */}
    <TabsContent value="nearby">
      <div className="space-y-5">
        {nearbyGarages.map((garage) => (
          <Card key={garage.id} className="shadow-md border">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-lg font-semibold">{garage.name}</CardTitle>
              <Badge variant="success" className="text-xs">
                {garage.availability}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {garage.distance} miles away
                </span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                  {garage.rating}
                </span>
              </div>
              <p className="text-sm">{garage.address}</p>
              <p className="text-sm flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                Available until {garage.availableUntil}
              </p>
              <div className="flex flex-wrap gap-2">
                {garage.services.map((service, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs px-2 py-1 rounded-full">
                    {service}
                  </Badge>
                ))}
              </div>
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={() => handleCallGarage(garage.phone)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call {garage.phone}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>

    {/* Emergency Services */}
    <TabsContent value="services">
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle className="text-lg">Available Emergency Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              icon: <Car className="w-5 h-5 text-primary" />,
              title: "Towing Service",
              desc: "For vehicles that cannot be driven due to accidents or mechanical failures",
            },
            {
              icon: <Wrench className="w-5 h-5 text-primary" />,
              title: "Roadside Repairs",
              desc: "Quick fixes for common issues like flat tires, battery problems, or minor repairs",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">{item.icon}</div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>
  );
}
