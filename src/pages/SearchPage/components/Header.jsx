import { Search } from "@/pages/SearchPage/components/Search";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSearchHeader from "./Mobile/MobileSearchHeader";

export default function Header() {
  const isMobile = useIsMobile();
  return (
    <div className="sticky top-0 z-50 bg-[#fafafa]  flex flex-col  w-full border-b  border-[#eaeaea]  ">
      <Navbar />
      {isMobile ? <MobileSearchHeader /> : <Search />}
    </div>
  );
}
