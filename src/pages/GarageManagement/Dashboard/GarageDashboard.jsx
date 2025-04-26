import { DashboardCharts } from "./components/DashboadChart";

import { DashboardOverview } from "./components/DashboardOverview";

const GarageDashboard = () => {
  return (
    <div className=" h-full bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className=" space-y-6">
            {/* Stats Overview */}
            <DashboardOverview />

            {/* Charts */}
            <DashboardCharts />

            {/* Two Column Layout for Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              {/* <DashboardRecentActivity /> */}

              {/* Tasks */}
              {/* <DashboardTasks /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageDashboard;
