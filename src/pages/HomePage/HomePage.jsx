import GarageList from "@/pages/HomePage/GarageList/GarageList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

import GarageMap from "./GarageMap/GarageMap";

function HomePage() {
  return (
    <div className="relative">
      <Tabs defaultValue="list">
        <TabsList className="fixed z-10 left-1/2 -translate-x-1/2 w-fit bottom-16 grid grid-cols-2 bg-slate-950 text-white">
          <TabsTrigger value="map">Show map</TabsTrigger>
          <TabsTrigger value="list">Show list</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-0" value="list">
          <GarageList />
        </TabsContent>
        <TabsContent className="mt-0" value="map">
          <GarageMap />
        </TabsContent>
      </Tabs>
      {/* New Emergency Button - Right Bottom Corner */}
      <Link
        to="/emergency"
        className="fixed right-12 bottom-12 z-50 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg text-lg transition-all duration-200"
      >
        Emergency
      </Link>
    </div>
  );
}

export default HomePage;
