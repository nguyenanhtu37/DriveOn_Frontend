import { serviceDetailService } from "@/app/services";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const useGetService = (id) => {
  const query = useQuery({
    queryKey: ["serviceGarage", id],
    queryFn: () => serviceDetailService.viewServiceGarage(id),
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export const useAddServiceGarage = () => {
  const mutation = useMutation({
    mutationFn: async (service) =>
      serviceDetailService.addServiceGarage(service),
  });

  return mutation;
};
export const useUpdateServiceGarage = () => {
  const mutation = useMutation({
    mutationFn: async ({ id, service }) =>
      serviceDetailService.updateServiceGarage(id, service),
  });

  return mutation;
};
export const useRemoveServiceGarage = () => {
  const { garageId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (serviceId) =>
      serviceDetailService.deleteServiceGarage(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceGarage"]);
      navigate(`/garageManagement/${garageId}/services`);
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

export const useGetServiceDetailById = (id) => {
  const query = useQuery({
    queryKey: ["serviceDetail", id],
    queryFn: () => serviceDetailService.getServiceDetailById(id),
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};
