import { drivingService } from "@/app/services";
import { useMutation } from "@tanstack/react-query";

export const useGetDriving = () => {
  const mutation = useMutation({
    mutationFn: drivingService.getDrivingDistance,
  });
  return mutation;
};
