import { brandServiceV2 } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetBrands = () => {
  const query = useQuery({
    queryKey: ["brands"],
    queryFn: brandServiceV2.getBrands,
  });

  return {
    ...query,
    data: query.data?.data || [],
  };
};
