import GarageList from "@/pages/HomePage/GarageList/GarageList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { AbsoluteScreenPath } from "@/constants/screen";
import GarageMap from "./GarageMap/GarageMap";
import { useTabStore } from "@/app/stores/view/tab";

function HomePage() {
  const { garageView, setGarageView } = useTabStore();
  return (
    <div className="relative min-h-[calc(100vh-4rem)] ">
      <Tabs value={garageView} onValueChange={setGarageView}>
        <TabsList className="fixed z-10 left-1/2 -translate-x-1/2 w-fit bottom-16 grid grid-cols-2 bg-slate-950 text-white">
          <TabsTrigger value="map">Show map</TabsTrigger>
          <TabsTrigger value="list">Show list</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-0" value="list">
          <GarageList />
        </TabsContent>
        <TabsContent className="mt-0" value="map">
          <div className="w-full h-screen">
            <GarageMap />
          </div>
        </TabsContent>
      </Tabs>
      {/* New Emergency Button - Right Bottom Corner */}
      <Link
        to={AbsoluteScreenPath.Emergency}
        className="fixed right-16 bottom-16 z-50 group hidden md:flex"
      >
        {/* Animated rim: zoom in/out and color shift */}
        <span
          className="absolute inset-0 w-full h-full rounded-full pointer-events-none z-[-1] animate-emergency-zoom"
          style={{
            background:
              "radial-gradient(circle, rgba(239,68,68,0.22) 40%, rgba(251,146,60,0.13) 70%, transparent 100%)",
            transition: "filter 0.3s",
          }}
        />
        {/* Circle Button */}
        <span className="relative flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-orange-400 group-hover:from-red-700 group-hover:via-red-600 group-hover:to-orange-500 text-white font-bold w-20 h-20 rounded-full shadow-xl text-2xl transition-all duration-300 ring-2 ring-red-200/40 group-hover:ring-orange-200/40">
          {/* Bigger Emergency Phone Icon, more visible */}
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
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
            <rect x="10.5" y="6.5" width="3" height="2" rx="1" fill="#ef4444" />
          </svg>
        </span>
      </Link>
      {/* Garage Pro Button - Between Search and Dropdown */}
      <Link
        to={AbsoluteScreenPath.GaragePro}
        className="fixed right-32 bottom-16 z-50 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        Garage Pro
      </Link>
    </div>
  );
}

export default HomePage;
