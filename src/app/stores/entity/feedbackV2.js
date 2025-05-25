import { feedbackServiceV2 } from "@/app/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetFeedbackForGarage = (garageId) => {
  const query = useQuery({
    queryKey: ["feedback", garageId],
    queryFn: () => feedbackServiceV2.getFeedbackForGarage(garageId),
    enabled: !!garageId,
  });
  return {
    ...query,
    data: query.data || [],
  };
};

export const useAddFeedback = () => {
  const mutation = useMutation({
    mutationFn: feedbackServiceV2.addFeedback,
  });
  return mutation;
};

export const useUpdateFeedback = () => {
  const mutation = useMutation({
    mutationFn: feedbackServiceV2.updateFeedback,
  });
  return mutation;
};

export const useDeleteFeedback = () => {
  const mutation = useMutation({
    mutationFn: feedbackServiceV2.deleteFeedback,
  });
  return mutation;
};

export const useGetFeedbackByAppointmentId = (appointmentId) => {
  const query = useQuery({
    queryKey: ["feedback", "appointment", appointmentId],
    queryFn: () => feedbackServiceV2.getFeedbackByAppointmentId(appointmentId),
    enabled: !!appointmentId,
  });
  return {
    ...query,
    data: query.data || [],
  };
};
