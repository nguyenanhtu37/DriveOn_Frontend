import { distanceMatrixService } from "@/app/services";
import { useMutation } from "@tanstack/react-query";

export const useGetGeocode = () => {
  const mutation = useMutation({
    mutationFn: async (address) => distanceMatrixService.getGeocode(address),
  });
  return {
    ...mutation,
    data: mutation.data ?? {},
  };
};
