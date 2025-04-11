import { vehicleServiceV2 } from "@/app/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMyVehicles = () => {
  const query = useQuery({
    queryKey: ["myVehicleV2"],
    queryFn: () => vehicleServiceV2.getVehicles(),
  });

  return {
    ...query,
    data: query.data ?? [],
  };
};
  
export const useGetVehicleById = (vehicleId) => {
  const query = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: () => vehicleServiceV2.getVehicleById(vehicleId),
  });

  return {
    ...query,
    data: query.data ?? {},
  };
};

export const useAddVehicle = () => {
  const mutation = useMutation({
    mutationKey: ["addVehicle"],
    mutationFn: vehicleServiceV2.addVehicle,
  });

  return mutation;
};

export const useUpdateVehicle = () => {
  const mutation = useMutation({
    mutationKey: ["updateVehicle"],
    mutationFn: vehicleServiceV2.updateVehicle,
  });

  return mutation;
};

export const useDeleteVehicle = () => {
  const mutation = useMutation({
    mutationKey: ["deleteVehicle"],
    mutationFn: vehicleServiceV2.deleteVehicle,
  });

  return mutation;
};
