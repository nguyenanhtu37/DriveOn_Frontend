import { payService } from "@/app/services";
import { useMutation } from "@tanstack/react-query";

export const useCreatePaymentLink = () => {
  const mutation = useMutation({
    mutationFn: payService.createPayment,
  });

  return mutation;
};
