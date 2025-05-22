import { locationService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetProvinces = () => {
  const query = useQuery({
    queryKey: ["provinces"],
    queryFn: locationService.getProvinces,
  });

  return {
    ...query,
    data: query.data?.data,
  };
};

export const useGetDistricts = (provinceId) => {
  const query = useQuery({
    queryKey: ["districts", provinceId],
    queryFn: () => locationService.getDistricts(provinceId),
    enabled: !!provinceId,
  });

  return {
    ...query,
    data: query.data?.data,
  };
};
