import { userService } from "@/app/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const query = useQuery({
    queryKey: ["profileV2"],
    queryFn: userService.getProfile,
  });

  return {
    ...query,
    data: query.data || {},
  };
};

export const useUpdateProfile = () => {
  const mutation = useMutation({
    mutationKey: ["profileV2", "updateProfile"],
    mutationFn: userService.updateProfile,
  });

  return mutation;
};

export const useChangePassword = () => {
  const mutation = useMutation({
    mutationKey: ["profileV2", "changePassword"],
    mutationFn: userService.changePassword,
  });

  return mutation;
};

export const useGetALlUser = (page) => {
  const query = useQuery({
    queryKey: ["user", "all", page],
    queryFn: () => userService.getAllUser(page),
  });

  return {
    ...query,
    data: query.data || {},
  };
};

export const useEnableUser = () => {
  const mutation = useMutation({
    mutationFn: userService.enableUser,
  });

  return mutation;
};
export const useDisableUser = () => {
  const mutation = useMutation({
    mutationFn: userService.disableUser,
  });

  return mutation;
};
