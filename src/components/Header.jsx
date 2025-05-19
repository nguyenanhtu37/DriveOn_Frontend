import Filter from "./Filter/Filter";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <Navbar />
      <Filter />
    </div>
  );
}
