import { serviceDetailService } from "@/app/services";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetService = () => {
  const query = useQuery({
    queryKey: ["serviceGarage"],
    queryFn: serviceDetailService.viewServiceGarage,
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export const useAddServiceGarage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (service) =>
      serviceDetailService.addServiceGarage(service),
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceGarage"]);
      toast({
        title: "Create service successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Create service failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};
export const useUpdateServiceGarage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id, service }) =>
      serviceDetailService.updateServiceGarage(id, service),
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceGarage"]);
      toast({
        title: "Update service successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Update service failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};
export const useRemoveServiceGarage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }) => serviceDetailService.deleteServiceGarage(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceGarage"]);
      toast({
        title: "Delete service successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Delete service failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};
