import { useEffect, useState } from "react";
import { useGeolocation } from "@/common/hooks/useGeolocation";
import { SidebarHome } from "@/common/layouts/components/SidebarHome";
import { Footer } from "@/components/Footer/Footer";
import NavbarMobile from "@/components/NavbarMobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "./components/Header";
import { useSearchStore } from "@/app/stores/view/search";
import { useSearchWithFilter } from "@/app/stores/entity/search";
import SearchMap from "./components/SearchMap";
import { CardPro } from "@/components/Card/CardPro";
import CardSkeleton from "@/components/CardSkeleton";
import Pagination from "@/components/Pagination/Pagination";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { List, MapPin, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSetDialogId } from "@/app/stores/view/dialog";

const SearchPage = () => {
  useGeolocation();

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState();
  const [garages, setGarages] = useState([]);

  const setDialog = useSetDialogId();

  const handleClickRecuse = () => {
    setDialog({ id: "DialogRecuse" });
  };

  const {
    keyword,
    location,
    service,
    province,
    isFetched,
    time,
    setIsFetched,
  } = useSearchStore();

  const isMobile = useIsMobile();

  const searchData = useSearchWithFilter({
    keyword,
    location,
    service,
    province,
    time,
    isFetched,
    limit: 9,
    page: currentPage,
  });

  useEffect(() => {
    setCurrentPage(1);
    setDirection();
  }, [keyword, location, service, province, time]);

  useEffect(() => {
    setIsFetched(true);
  }, []);

  useEffect(() => {
    if (searchData.isSuccess) {
      setGarages(searchData.data.results);
      setIsFetched(false);
    }
  }, [searchData.data.results, searchData.isSuccess, setIsFetched]);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
      setDrawerOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleClearDirection = () => {
    setDirection();
  };

  const renderContent = () => {
    if (searchData.isLoading) {
      return Array.from({ length: 9 }, (_, index) => (
        <CardSkeleton key={index} />
      ));
    }

    if (searchData.isSuccess && garages.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center h-40 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-500 text-lg font-medium">
            No matching results found
          </p>
          <p className="text-gray-400 text-sm">
            Try adjusting your search criteria
          </p>
        </div>
      );
    }

    return garages.map((garage) => (
      <CardPro key={garage._id} garage={garage} setDirection={setDirection} />
    ));
  };

  const GarageListContent = () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {renderContent()}
      </div>

      {searchData.isSuccess && garages.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            totalPages={searchData.data.pagination.totalPages}
            page={currentPage}
            onPageChange={(page) => {
              setIsFetched(true);
              setCurrentPage(page);
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <SidebarHome />

      <div className="flex flex-col w-full min-w-[378px] max-w-[1920px] mx-auto bg-white">
        {/* Fixed header height */}

        <Header />

        {/* Main content area */}
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-160px)]">
          {/* Desktop: Result panel */}
          {!isMobile && (
            <div className="w-full md:w-1/2 lg:w-3/5 overflow-y-auto p-4 md:p-6 flex flex-col gap-y-4 items-center">
              <div className="w-full mb-4">
                <div className="flex items-center justify-between">
                  {searchData.isSuccess && garages.length > 0 && (
                    <Badge variant="secondary" className="text-sm">
                      Page {currentPage} of{" "}
                      {searchData.data.pagination.totalPages}
                    </Badge>
                  )}
                </div>
              </div>
              <GarageListContent />
            </div>
          )}

          {/* Map panel */}
          <div
            className={`w-full h-full ${
              !isMobile ? "md:w-1/2 lg:w-2/5" : ""
            } relative`}
          >
            <div className="h-full p-4 md:p-6">
              <div className="h-full rounded-lg overflow-hidden">
                <SearchMap
                  garages={garages}
                  setDirection={setDirection}
                  direction={direction}
                  clearDirection={handleClearDirection}
                />
              </div>
            </div>

            {/* Mobile: Floating drawer trigger */}
            {isMobile && (
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button
                    className="absolute top-28 left-6 transform shadow-lg hover:shadow-xl transition-all duration-200 z-10 flex flex-col items-center space-y-1"
                    variant="secondary"
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[85vh]">
                  <DrawerHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {searchData.isSuccess && garages.length > 0 && (
                          <Badge variant="secondary" className="text-sm">
                            Page {currentPage} of{" "}
                            {searchData.data.pagination.totalPages}
                          </Badge>
                        )}
                        <DrawerClose asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </DrawerClose>
                      </div>
                    </div>
                  </DrawerHeader>
                  <div className="overflow-y-auto p-4">
                    <GarageListContent />
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="fixed right-16 bottom-16 z-50 group hidden md:flex cursor-pointer"
                  onClick={handleClickRecuse}
                >
                  {/* Animated rim: zoom in/out and color shift */}
                  <span
                    className="absolute inset-0 w-full h-full rounded-full pointer-events-none z-[-1]"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(239,68,68,0.3) 40%, rgba(251,146,60,0.2) 70%, transparent 100%)",
                      transition: "all 0.3s ease-in-out",
                      animation:
                        "emergencyPulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                  {/* Circle Button */}
                  <span className="relative flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-orange-400 group-hover:from-red-700 group-hover:via-red-600 group-hover:to-orange-500 text-white font-bold w-20 h-20 rounded-full shadow-xl text-2xl transition-all duration-300 ring-2 ring-red-200/40 group-hover:ring-orange-200/40 hover:shadow-2xl hover:shadow-red-500/30 emergency-button">
                    {/* Bigger Emergency Phone Icon, more visible */}
                    <svg
                      width="40"
                      height="40"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="transform transition-transform duration-300 emergency-icon"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="11"
                        fill="#fff"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17.707 15.293l-2.387-2.387a1 1 0 0 0-1.414 0l-.793.793a8.001 8.001 0 0 1-3.172-3.172l.793-.793a1 1 0 0 0 0-1.414l-2.387-2.387a1 1 0 0 0-1.414 0l-.586.586c-.781.781-.781 2.047 0 2.828 2.343 2.343 5.515 5.515 7.858 7.858.781.781 2.047.781 2.828 0l.586-.586a1 1 0 0 0 0-1.414z"
                        fill="#ef4444"
                        stroke="#ef4444"
                        strokeWidth="1.2"
                      />
                      <rect
                        x="10.5"
                        y="6.5"
                        width="3"
                        height="2"
                        rx="1"
                        fill="#ef4444"
                      />
                    </svg>
                    <span className="absolute inset-0 rounded-full emergency-border-beam"></span>
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Emergency Assistance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Footer and mobile nav */}
        <NavbarMobile />
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default SearchPage;
