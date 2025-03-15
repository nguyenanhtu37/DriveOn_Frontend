import { vehicleService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetMyVehicles = () => {
  const query = useQuery({
    queryKey: ["myVehicle"],
    queryFn: () => vehicleService.getMyVehicles(),
  });

  return {
    ...query,
    data: query.data ?? [],
  };
};
