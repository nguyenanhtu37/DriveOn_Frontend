import { appointmentService } from "@/app/services";
import { useMutation } from "@tanstack/react-query";

export const useCreateAppointment = () => {
  const mutation = useMutation({
    mutationFn: async (data) => appointmentService.createAppointment(data),
  });

  return mutation;
};
