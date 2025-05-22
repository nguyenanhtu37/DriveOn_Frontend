import { useGeolocation } from "@/common/hooks/useGeolocation";
import { SidebarHome } from "@/common/layouts/components/SidebarHome";
import { Footer } from "@/components/Footer/Footer";
import NavbarMobile from "@/components/NavbarMobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { useSearchStore } from "@/app/stores/view/search";
import { useSearchWithFilter } from "@/app/stores/entity/search";
import SearchMap from "./components/SearchMap";
import { CardPro } from "@/components/Card/CardPro";
import CardSkeleton from "@/components/CardSkeleton";
import { BlurFade } from "@/components/magicui/blur-fade";
import Pagination from "@/components/Pagination/Pagination";

const SearchPage = () => {
  useGeolocation();

  const [open, setOpen] = useState(false);

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

  const [direction, setDirection] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [garages, setGarages] = useState([]);

  const handleClearDirection = () => {
    setDirection([]);
  };

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
    setIsFetched(true);
  }, []);

  useEffect(() => {
    if (searchData.isSuccess) {
      setIsFetched(false);
      setGarages(searchData.data.results);
    }
  }, [searchData.data.results, searchData.isSuccess, setIsFetched]);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <SidebarHome />
      <div className="flex flex-col w-full min-w-[378px] max-w-[1920px] mx-auto bg-white">
        <Header />

        {/* Main content area with fixed height calculation */}
        <div className="flex flex-col md:flex-row h-[85vh]">
          {/* Results panel - scrollable */}
          <div className="w-full md:w-1/2 lg:w-3/5 overflow-y-auto p-4 md:p-6 flex flex-col gap-y-4 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {searchData.isLoading ? (
                Array.from({ length: 9 }, (_, index) => (
                  <CardSkeleton key={index} />
                ))
              ) : searchData.isSuccess && garages.length === 0 ? (
                <div className="col-span-full flex items-center justify-center h-40">
                  <p className="text-gray-500">No results found</p>
                </div>
              ) : (
                garages.map((garage) => (
                  <BlurFade key={garage._id}>
                    <CardPro
                      key={garage._id}
                      garage={garage}
                      setDirection={setDirection}
                    />
                  </BlurFade>
                ))
              )}
            </div>

            {searchData.isSuccess && garages.length > 0 && (
              <Pagination
                totalPages={searchData.data.pagination.totalPages}
                page={currentPage}
                onPageChange={(page) => {
                  setIsFetched(true);
                  setCurrentPage(page);
                }}
              />
            )}
          </div>
          <div className="w-full md:w-1/2 lg:w-2/5 h-[50vh] md:h-full sticky top-0">
            <div className="h-full rounded-lg overflow-hidden">
              <SearchMap
                garages={garages}
                setDirection={setDirection}
                direction={direction}
                clearDirection={handleClearDirection}
              />
            </div>
          </div>
        </div>

        {/* Mobile navigation and footer */}
        <NavbarMobile />
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default SearchPage;
