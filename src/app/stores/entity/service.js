import { serviceService } from "@/app/services";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetService = () => {
  const query = useQuery({
    queryKey: ["serviceSystem"],
    queryFn: serviceService.getService,
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export const useAddService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (service) => serviceService.addService(service),
    onSuccess: () => {
      queryClient.invalidateQueries(["garage"]);
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

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id, service) =>
      serviceService.updateService(id, service),
    onSuccess: () => {
      queryClient.invalidateQueries(["garage"]);
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

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id) => serviceService.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceSystem"]);
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
