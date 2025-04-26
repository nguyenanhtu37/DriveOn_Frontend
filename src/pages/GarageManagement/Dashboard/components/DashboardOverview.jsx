import { Users, Activity, Settings, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardOverview } from "@/app/stores/entity/garage";
import { Link, useParams } from "react-router-dom";

export function DashboardOverview() {
  const { garageId } = useParams();
  const overview = useGetDashboardOverview(garageId);

  if (overview.isLoading) return null;
  if (overview.isError) return null;

  const stats = [
    {
      title: "Services",
      value: overview.data.totalServices,
      icon: Settings,
      color: "bg-green-500",
      link: "/services",
      description: "Services available in garage",
    },
    {
      title: "Appointment",
      value: overview.data.totalAppointments,
      icon: CalendarDays,
      color: "bg-orange-500",
      link: "/appointments",
      description: "Customer Appointment Schedule",
    },
    {
      title: "Staff",
      value: overview.data.totalStaff,
      icon: Users,
      color: "bg-blue-500",
      link: "/staff",
      description: "Current number of employees",
    },
    {
      title: "Feedbacks",
      value: overview.data.totalFeedbacks,
      icon: Activity,
      color: "bg-purple-500",
      link: "/feedback",
      description: "Customer Feedback",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Garage Overview
        </h2>
        <p className="text-muted-foreground text-sm">
          Overview of current garage performance indicators. Click on each item
          to view details.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={index} to={`/garageManagement/${garageId}${stat.link}`}>
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
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
