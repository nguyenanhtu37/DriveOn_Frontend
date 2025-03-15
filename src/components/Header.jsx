import Navbar from "@/components/Navbar";
import Filter from "./Filter/Filter";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <Navbar />
      <Filter />
    </div>
  );
}
