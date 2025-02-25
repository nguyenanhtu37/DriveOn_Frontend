import { staffService } from "@/app/services";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddStaff = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ garageId, newStaff }) => {
      return staffService.addStaff(garageId, newStaff);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      toast({
        title: "Add Staff successfully",
        duration: 2000, // Toast will close after 5 seconds
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Add Staff failed",
        duration: 2000, // Toast will close after 5 seconds
      });
    },
  });

  return mutation;
};

export const useGetStaffs = (id) => {
  const query = useQuery({
    queryKey: ["staff", id],
    queryFn: () => staffService.getStaffs(id),
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
