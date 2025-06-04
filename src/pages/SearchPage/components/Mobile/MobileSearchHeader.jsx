import { useState } from "react";
import { Search, MapPin, Wrench, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useSearchStore } from "@/app/stores/view/search";
import MobileSearchLocation from "./MobileSearchLocation";
import { MobileSearchService } from "./MobileSearchService";
import { MobileSearchTime } from "./MobileSearchTime";
import SearchKeyword from "@/common/layouts/components/SearchKeyword";

export default function MobileSearchHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("location");
  const { keyword, setKeyword } = useSearchStore();
  const { province, service, time } = useSearchStore();
  const handleChange = (event) => setKeyword(event.target.value);
  const getLocationText = () => {
    if (province) return province;
    return "Choose location";
  };

  const getServiceText = () => {
    if (service.length > 0)
      return `${service.length} service${service.length > 1 ? "s" : ""}`;
    return "Choose services";
  };

  const getTimeText = () => {
    if (time) {
      return time.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return "Choose date";
  };

  const handleSearch = () => {
    setIsOpen(false);
    // Add your search logic here
    console.log("Searching with:", { province, service, time });
  };

  const closeSheet = () => setIsOpen(false);

  return (
    <div className="w-full px-4 py-3 bg-white">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className=" mb-3">
          <SearchKeyword value={keyword} onChange={handleChange} />
        </div>
        <SheetTrigger asChild>
          <div className="space-y-3">
            {/* Main Search Button */}

            {/* Quick Preview */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full whitespace-nowrap">
                <MapPin size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  {getLocationText()}
                </span>
                {province && (
                  <Badge variant="secondary" className="h-4 text-xs">
                    ✓
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full whitespace-nowrap">
                <Wrench size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  {getServiceText()}
                </span>
                {service.length > 0 && (
                  <Badge variant="secondary" className="h-4 text-xs">
                    ✓
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full whitespace-nowrap">
                <Calendar size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700">{getTimeText()}</span>
                {time && (
                  <Badge variant="secondary" className="h-4 text-xs">
                    ✓
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="h-[85vh] px-0 py-0 rounded-t-3xl"
        >
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b bg-white">
              <TabButton
                active={activeTab === "location"}
                onClick={() => setActiveTab("location")}
                icon={<MapPin size={16} />}
                label="Location"
                hasValue={!!province}
              />
              <TabButton
                active={activeTab === "service"}
                onClick={() => setActiveTab("service")}
                icon={<Wrench size={16} />}
                label="Service"
                hasValue={service.length > 0}
              />
              <TabButton
                active={activeTab === "time"}
                onClick={() => setActiveTab("time")}
                icon={<Calendar size={16} />}
                label="Time"
                hasValue={!!time}
              />
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === "location" && (
                <MobileSearchLocation onClose={closeSheet} />
              )}
              {activeTab === "service" && (
                <MobileSearchService onClose={closeSheet} />
              )}
              {activeTab === "time" && (
                <MobileSearchTime onClose={closeSheet} />
              )}
            </div>

            {/* Search Button */}
            <div className="p-4 border-t bg-white">
              <Button
                className="w-full h-12 text-base font-semibold rounded-xl"
                size="lg"
                onClick={handleSearch}
                disabled={!province && service.length === 0 && !time}
              >
                <Search size={20} className="mr-2" />
                Search Garages
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, hasValue }) {
  return (
    <button
      className={`flex-1 py-4 px-2 text-center font-medium text-sm transition-colors relative ${
        active
          ? "text-red-400 border-b-2 border-red-500 bg-blue-50"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          {icon}
          {hasValue && (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          )}
        </div>
        <span>{label}</span>
      </div>
    </button>
  );
}
