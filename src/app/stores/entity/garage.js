import { garageService } from "@/app/services";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRegisterGarage = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (garage) => {
      return garageService.registerGarage(garage);
    },
    onSuccess: () => {
      toast({
        title: "Garage registered successfully",
        duration: 2000, // Toast will close after 5 seconds
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Garage registered failed",
        duration: 2000, // Toast will close after 5 seconds
      });
    },
  });

  return mutation;
};

export const useGetGarages = () => {
  const query = useQuery({
    queryKey: ["garage"],
    queryFn: garageService.getGarages,
  });
  return {
    ...query,
    data: query.data?.data ?? [],
    meta: query.data?.meta ?? null,
  };
};

export const useGetRegisterGarages = () => {
  const query = useQuery({
    queryKey: ["registerGarage"],
    queryFn: garageService.viewRegisterGarage,
  });
  return {
    ...query,
    data: query.data ?? [],
    meta: query.data?.meta ?? null,
  };
};
export const useApproveGarage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (garageId) => garageService.approveGarage(garageId),
    onSuccess: (data) => {
      console.log("Garage approved successfully", data);
      queryClient.invalidateQueries(["registerGarage"]);
    },
    onError: (error) => {
      console.error("Error approving garage:", error.message);
    },
  });

  return mutation;
};
export const useRejectGarage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (garageId) => garageService.rejectGarage(garageId),
    onSuccess: (data) => {
      console.log("Garage reject successfully", data);
      queryClient.invalidateQueries(["garage"]);
    },
    onError: (error) => {
      console.error("Error rejecting garage:", error.message);
    },
  });

  return mutation;
};
