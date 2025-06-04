import { brandServiceV2 } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetBrands = (page = 1, limit = 10) => {
  const query = useQuery({
    queryKey: ["brands", page, limit],
    queryFn: () => brandServiceV2.getBrands({ page, limit }),
  });

  return {
    ...query,
    data: query.data?.brands || [],
    pagination: {
      total: query.data?.total || 0,
      page: query.data?.currentPage || 1,
      limit: query.data?.perPage || limit,
      totalPages: query.data?.lastPage || 1
    }
  };
};
