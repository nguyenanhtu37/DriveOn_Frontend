import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useGetService } from "@/app/stores/entity/service";
import CreateService from "../ViewServiceSystem/components/CreateService";
const TopBar = ({ setSearch, search }) => {
  const serviceData = useGetService();
  return (
    <div className="w-full bg-white p-3  border-b border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        {/* Left side - Stats and Add button */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-6 bg-gradient-to-r from-red-50 to-indigo-50 px-6 py-3 rounded-xl border border-red-100"
          >
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Services
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {serviceData.data.length}
                <span className="text-lg text-blue-400">+</span>
              </p>
            </div>
            <CreateService />
          </motion.div>
        </div>

        {/* Right side - Search and filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              value={search}
              onChange={setSearch}
              type="text"
              placeholder="Search services..."
              className="w-full sm:w-[300px] pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 rounded-xl text-sm transition-all duration-200 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
