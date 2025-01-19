// import { cartServices } from '@app/services';

import { garageService } from "@/app/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRegisterGarage = () => {
  const mutation = useMutation({
    mutationFn: (garage) => {
      return garageService.registerGarage(garage);
    },
  });

  return mutation;
};

export const useGetGarage = () => {
  const query = useQuery({
    queryKey: "garage",
    queryFn: async () => {
      const data = await garageService.getGarage();
      return data;
    },
  });
  return {
    ...query,
    data: query.data?.data ?? [],
    meta: query.data?.meta ?? null,
  };
};
