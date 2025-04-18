import { vehicleService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../view/user";

export const useGetMyVehicles = () => {
  const user = useUserStore((state) => state.user);
  const query = useQuery({
    queryKey: ["myVehicle"],
    queryFn: () => vehicleService.getVehicles(),
    enabled: !!user,
  });

  return {
    ...query,
    data: query.data ?? [],
  };
};
