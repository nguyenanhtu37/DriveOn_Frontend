import { subscriptionService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscription = () => {
  const query = useQuery({
    queryKey: ["subscription"],
    queryFn: () => subscriptionService.getSubscription(),
  });

  return {
    ...query,
    data: query.data ?? [],
  };
};
