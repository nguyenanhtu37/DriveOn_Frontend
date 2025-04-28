import { transactionService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionForGarage = (garageId) => {
  const query = useQuery({
    queryKey: ["transaction", garageId],
    queryFn: () => transactionService.getTransactionForGarage(garageId),
  });

  return {
    ...query,
    data: query.data?.data,
  };
};
