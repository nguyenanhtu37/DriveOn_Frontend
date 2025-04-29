import { useGetDashboardAdminOverview } from "@/app/stores/entity/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Settings, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardChart } from "../Chart/DashboardChart";

export const Dashboard = () => {
  const dashboardOverview = useGetDashboardAdminOverview();
  console.log(dashboardOverview.data);

  const stats = [
    {
      title: "Garages",
      value: dashboardOverview.data.totalGarages ?? 0,
      icon: Car,
      color: "bg-green-500",
      link: "/admin/viewExitsGarage",
      description: "Garages available in system",
    },
    {
      title: "Services",
      value: dashboardOverview.data.totalServices ?? 0,
      icon: Settings,
      color: "bg-orange-500",
      link: "/admin/viewServiceSystem",
      description: "Services available in garage",
    },
    {
      title: "Users",
      value: dashboardOverview.data.totalUsers ?? 0,
      icon: Users,
      color: "bg-blue-500",
      link: "/admin/userManagement",
      description: "Current number of users in system",
    },
    {
      title: "Brands",
      value: dashboardOverview.data.totalBrands ?? 0,
      icon: TrendingUp,
      color: "bg-purple-500",
      link: "/admin/brandList",
      description: "Brands available in system",
    },
  ];
  return (
    <div className=" w-full p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Welcome to the admin dashboard. Here you can manage all the
            functionalities of the application.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Link key={index} to={stat.link}>
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <div className={`${stat.color} p-2 rounded-md`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>

        <DashboardChart />

        <div className=" grid grid-cols-1 md:grid-cols-2"></div>
      </Card>
    </div>
  );
};
