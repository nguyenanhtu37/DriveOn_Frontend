import { adminService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardAdminOverview = () => {
  const query = useQuery({
    queryKey: ["dashboardAdminOverview"],
    queryFn: adminService.getDashboardAdminOverview,
  });
  return {
    ...query,
    data: query.data ?? {},
  };
};

export const useGetGarageStatusCountByMonth = () => {
  const query = useQuery({
    queryKey: ["garageStatusCountByMonth"],
    queryFn: adminService.getGarageStatusCountByMonth,
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};
