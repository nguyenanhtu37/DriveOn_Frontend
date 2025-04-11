import { vehicleService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetMyVehicles = () => {
  const query = useQuery({
    queryKey: ["myVehicle"],
    queryFn: () => vehicleService.getVehicles(),
  });

  return {
    ...query,
    data: query.data ?? [],
  };
};
