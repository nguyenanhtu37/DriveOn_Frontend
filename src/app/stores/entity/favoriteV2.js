import { favoriteService } from "@/app/services";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetMyFavorites = () => {
  const query = useQuery({
    queryKey: ["getMyFavorites"],
    queryFn: favoriteService.getMyFavorites,
    enabled: !!localStorage.getItem("token"),
  });
  return {
    ...query,
    data: query.data || [],
  };
};

const useAddToFavorites = () => {
  const mutation = useMutation({
    mutationFn: favoriteService.addToFavorites,
  });
  return mutation;
};

const useRemoveFromFavorites = () => {
  const mutation = useMutation({
    mutationFn: favoriteService.removeFromFavorites,
  });
  return mutation;
};

export { useGetMyFavorites, useAddToFavorites, useRemoveFromFavorites };
