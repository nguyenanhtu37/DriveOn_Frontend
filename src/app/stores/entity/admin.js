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

export const useGetGarageStatusCountByMonth = (year) => {
  const query = useQuery({
    queryKey: ["garageStatusCountByMonth", year],
    queryFn: () => adminService.getGarageStatusCountByMonth(year),
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export const useGetGarageStatusCountByQuarter = (year) => {
  const query = useQuery({
    queryKey: ["garageStatusCountByQuarter", year],
    queryFn: () => adminService.getGarageStatusCountByQuarter(year),
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export const useGetServiceUsageCounts = () => {
  const query = useQuery({
    queryKey: ["serviceUsageCounts"],
    queryFn: adminService.getServiceUsageCounts,
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};
