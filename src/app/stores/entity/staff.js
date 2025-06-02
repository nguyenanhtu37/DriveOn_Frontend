import { staffService } from "@/app/services";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddStaff = () => {
  const mutation = useMutation({
    mutationFn: ({ garageId, newStaff }) => {
      return staffService.addStaff(garageId, newStaff);
    },
  });

  return mutation;
};

export const useGetStaffs = (payload) => {
  const query = useQuery({
    queryKey: ["staff", payload],
    queryFn: () => staffService.getStaffs(payload),
  });

  return {
    ...query,
    data: query.data ?? {},
  };
};

export const useEnableStaff = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ garageId, staffId }) => {
      return staffService.enableStaff(garageId, staffId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      toast({
        title: "Enabled Staff successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Enabled Staff failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};

export const useDisableStaff = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ garageId, staffId }) => {
      return staffService.disableStaff(garageId, staffId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      toast({
        title: "Disabled Staff successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Disabled Staff failed",
        duration: 2000,
      });
    },
  });

  return mutation;
};
