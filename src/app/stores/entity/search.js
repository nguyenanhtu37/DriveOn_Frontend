import { searchService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useSearchByKeyword = (keyword) => {
  const query = useQuery({
    queryKey: ["searchByKeyword", keyword],
    queryFn: () => searchService.searchByKeyword(keyword),
    enabled: !!keyword,
  });

  return {
    ...query,
    data: query.data ?? {},
  };
};

export const useSearchWithFilter = ({
  keyword,
  location,
  service,
  province,
  time,
  isFetched,
  page,
  limit,
}) => {
  const query = useQuery({
    queryKey: isFetched
      ? [
          "searchWithFilter",
          keyword,
          location,
          service,
          province,
          time,
          page,
          limit,
        ]
      : [],
    queryFn: () =>
      searchService.searchWithFilter({
        keyword,
        location,
        service,
        province,
        time,
        page,
        limit,
      }),
  });

  return {
    ...query,
    data: query.data ?? {},
  };
};
