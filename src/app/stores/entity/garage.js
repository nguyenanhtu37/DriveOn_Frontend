import { garageService } from "@/app/services";
import { toast, useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFilterStore } from "@/app/stores/view/filter";
import { useDebounce } from "react-haiku";
import { getLocation } from "../view/user";
import { useNavigate } from "react-router-dom";
import { AdminScreenPath } from "@/constants/screen";

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
  const {
    serviceSystem,
    location,
    rating,
    tagPro,
    distance,
    openTime,
    closeTime,
    operating_days,
    setLocation,
  } = useFilterStore();

  const debouncedServiceSystem = useDebounce(serviceSystem, 500);
  const debouncedLocation = useDebounce(location, 500);
  const debouncedRating = useDebounce(rating, 500);
  const debouncedTagPro = useDebounce(tagPro, 500);
  const debouncedDistance = useDebounce(distance, 500);
  const debouncedOpenTime = useDebounce(openTime, 500);
  const debouncedCloseTime = useDebounce(closeTime, 500);
  const debouncedOperatingDays = useDebounce(operating_days, 500);
  const currentLocation = getLocation();

  const params = new URLSearchParams();
  const services = debouncedServiceSystem.join(",");

  const query = useQuery({
    queryKey: [
      "garage",
      services,
      debouncedLocation,
      debouncedCloseTime,
      debouncedOpenTime,
      debouncedRating,
      debouncedTagPro,
      debouncedOperatingDays,
      debouncedDistance,
    ],
    queryFn: () => {
      if (services) {
        params.append("services", services);
      }
      if (
        debouncedLocation.province?.name &&
        debouncedLocation.district?.name
      ) {
        params.append("province", debouncedLocation.province.name);
        params.append("district", debouncedLocation.district.name);
      }
      if (debouncedRating) {
        params.append("rating", debouncedRating);
      }
      if (debouncedTagPro) {
        params.append("tag", "pro");
      }
      if (debouncedDistance) {
        params.append("distance", debouncedDistance);
        params.append("currentLocation", currentLocation);
        setLocation({
          province: null,
          district: null,
        });
      }
      if (debouncedOpenTime) {
        params.append("openTime", debouncedOpenTime);
      }
      if (debouncedCloseTime) {
        params.append("closeTime", debouncedCloseTime);
      }
      if (debouncedOperatingDays.length > 0) {
        params.append("operating_days", debouncedOperatingDays.join(","));
      }
      return garageService.getGarages(params);
    },
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (garageId) => garageService.approveGarage(garageId),
    onSuccess: () => {
      navigate(AdminScreenPath.ViewRegisterGarage);
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

export const useGetMyGarage = () => {
  const query = useQuery({
    queryKey: ["myGarage"],
    queryFn: garageService.getMyGarage,
  });
  return {
    ...query,
    data: query.data ?? {},
  };
};

export const useGetRegisterGarageCarOwner = () => {
  const query = useQuery({
    queryKey: ["registerGarageCarOwner"],
    queryFn: garageService.getRegisterGarageCarOwner,
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export const useUpdateRegisterGarage = () => {
  const mutation = useMutation({
    mutationFn: async ({ id, garage }) =>
      garageService.updateGarageRegister(id, garage),
  });
  return mutation;
};
