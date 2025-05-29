import { Search } from "@/pages/SearchPage/components/Search";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-[#fafafa]  flex flex-col  w-full h-[160px]  border-b  border-[#eaeaea]  ">
      <Navbar />
      <Search />
    </div>
  );
}
