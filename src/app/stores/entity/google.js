import { googleService } from "@/app/services";
import { useMutation } from "@tanstack/react-query";

export const useLoginWithGoogle = () => {
  const mutation = useMutation({
    mutationFn: googleService.loginWithGoogle,
  });
  return mutation;
};
