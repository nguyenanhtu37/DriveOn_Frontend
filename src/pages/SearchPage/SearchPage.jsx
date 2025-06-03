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

const SearchPage = () => {
  useGeolocation();

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState();
  const [garages, setGarages] = useState([]);

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
        <div className="h-[160px]">
          <Header />
        </div>

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
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 shadow-lg hover:shadow-xl transition-all duration-200 z-10 flex items-center"
                    size="lg"
                  >
                    List view
                    <List className="w-5 h-5 mr-2" />
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
        </div>

        {/* Footer and mobile nav */}
        <NavbarMobile />
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default SearchPage;
