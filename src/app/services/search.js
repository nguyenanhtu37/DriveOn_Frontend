import { axios } from "@/lib/axios";

export const searchByKeyword = async (keyword) => {
  const response = await axios.get("/search", {
    params: {
      keyword: keyword,
    },
  });
  return response.data;
};

export const searchWithFilter = async ({
  keyword,
  location,
  service,
  province,
  time,
  page,
  limit,
}) => {
  const params = {};
  if (keyword !== "") params.keyword = keyword;
  if (location && location.length > 0) params.location = location.join(",");
  if (service && service.length > 0) params.service = service.join(",");
  if (province !== "") params.province = province;
  if (time !== "") params.time = time;
  if (page !== undefined) params.page = page;
  if (limit !== undefined) params.limit = limit;

  const response = await axios.get("/search/filter", {
    params,
  });
  return response.data;
};
