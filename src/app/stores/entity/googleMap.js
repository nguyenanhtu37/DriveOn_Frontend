import { googleMapService } from "@/app/services";
import { useMutation } from "@tanstack/react-query";

export const useGetCoordinates = () => {
  const mutation = useMutation({
    mutationFn: async (address) => googleMapService.getCoordinates(address),
  });

  return mutation;
};
