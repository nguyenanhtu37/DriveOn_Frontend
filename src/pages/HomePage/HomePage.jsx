import GarageList from "@/pages/HomePage/GarageList/GarageList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import GarageMap from "./GarageMap/GarageMap";

function HomePage() {
  return (
    <Tabs defaultValue="list">
      <TabsList className="fixed z-10  left-1/2 -translate-x-1/2 w-fit bottom-16 grid grid-cols-2 bg-slate-950 text-white">
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
  );
}

export default HomePage;
