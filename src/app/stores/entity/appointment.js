import { appointmentService } from "@/app/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateAppointment = () => {
  const mutation = useMutation({
    mutationFn: async (data) => appointmentService.createAppointment(data),
  });

  return mutation;
};

export const useGetAppointmentByGarageId = (garageId) => {
  const query = useQuery({
    queryKey: ["appointment", "garage", garageId],
    queryFn: async () => appointmentService.getAppointmentByGarageId(garageId),
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export const useGetAppointmentDetails = (appointmentId) => {
  const query = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () =>
      appointmentService.getAppointmentDetails(appointmentId),
  });
  return {
    ...query,
    data: query.data ?? {},
  };
};

export const useConfirmAppointment = () => {
  const mutation = useMutation({
    mutationFn: async (appointmentId) =>
      appointmentService.confirmAppointment(appointmentId),
  });
  return mutation;
};

export const useDenyAppointment = () => {
  const mutation = useMutation({
    mutationFn: async (appointmentId) =>
      appointmentService.denyAppointment(appointmentId),
  });
  return mutation;
};

export const useCompleteAppointment = () => {
  const mutation = useMutation({
    mutationFn: appointmentService.completeAppointment,
  });
  return mutation;
};

export const useGetAppointmentById = (appointmentId) => {
  const query = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => appointmentService.getAppointmentById(appointmentId),
  });
  return {
    ...query,
    data: query.data ?? {},
  };
};

export const useGetAppointmentByUserId = () => {
  const query = useQuery({
    queryKey: ["appointment", "user"],
    queryFn: async () => appointmentService.getAppointmentByUserId(),
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export const useCancelAppointment = () => {
  const mutation = useMutation({
    mutationFn: async (appointmentId) =>
      appointmentService.cancelAppointment(appointmentId),
  });
  return mutation;
};
