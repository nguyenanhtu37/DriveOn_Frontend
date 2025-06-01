import { emergencyService } from "@/app/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateRescueRequest = () => {
  const mutation = useMutation({
    mutationFn: emergencyService.createRescueRequest,
  });
  return mutation;
};

export const useRequestRescueGarage = ({ emergencyId }) => {
  const query = useQuery({
    queryKey: ["requestRescueGarage", emergencyId],
    queryFn: () => emergencyService.requestRescueGarage({ emergencyId }),
  });
  return query;
};

export const useCancelRescueRequest = () => {
  const mutation = useMutation({
    mutationFn: emergencyService.cancelRescueRequest,
  });
  return mutation;
};

export const useAcceptedRescueRequest = () => {
  const mutation = useMutation({
    mutationFn: emergencyService.acceptedRescueRequest,
  });
  return mutation;
};
