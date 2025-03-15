import { garageService } from "@/app/services";
import { toast, useToast } from "@/hooks/use-toast";
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
    onSuccess: () => {
      queryClient.invalidateQueries(["garage"]);
      toast({
        title: "Garage approved successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Garage approved failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};
export const useRejectGarage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (garageId) => garageService.rejectGarage(garageId),
    onSuccess: () => {
      queryClient.invalidateQueries(["garage"]);
      toast({
        title: "Garage rejected successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Garage rejected failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};

export const useGetRegisterGarageDetail = (id) => {
  const query = useQuery({
    queryKey: ["registerGarageDetail", id],
    queryFn: () => garageService.viewRegisterGarageDetail(id),
  });

  return {
    ...query,
    data: query.data ?? {},
  };
};

export const useGetGarageExits = () => {
  const query = useQuery({
    queryKey: ["garageExits"],
    queryFn: garageService.viewGarageExits,
  });
  return {
    ...query,
    data: query.data ?? [],
    meta: query.data?.meta ?? null,
  };
};

export const useEnableGarage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => garageService.enableGarage(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["garageExits"]);
      toast({
        title: "Garage enabled successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Garage enabled failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};

export const useDisableGarage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => garageService.disableGarage(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["garageExits"]);
      toast({
        title: "Garage disabled successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Garage disabled failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};

export const useGetGarageDetail = (id) => {
  const query = useQuery({
    queryKey: ["garageDetail", id],
    queryFn: () => garageService.getGarageDetail(id),
  });

  return {
    ...query,
    data: query.data ?? {},
  };
};
