import { feedbackServiceV2 } from "@/app/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetFeedbackForGarage = (payload) => {
  const query = useQuery({
    queryKey: ["feedback", payload],
    queryFn: () => feedbackServiceV2.getFeedbackForGarage(payload),
    enabled: !!payload,
  });
  return {
    ...query,
    data: query.data || {},
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

export const useGetFeedbackForServiceDetail = (serviceId) => {
  const query = useQuery({
    queryKey: ["feedback", "service", serviceId],
    queryFn: () => feedbackServiceV2.getFeedbackForServiceDetail(serviceId),
    enabled: !!serviceId,
  });
  return {
    ...query,
    data: query.data || [],
  };
};

export const useGetFeedbackForGarageDetail = (garageId) => {
  const query = useQuery({
    queryKey: ["feedback", "garageDetail", garageId],
    queryFn: () => feedbackServiceV2.getFeedbackForGarageDetail(garageId),
    enabled: !!garageId,
  });
  return {
    ...query,
    data: query.data || [],
  };
};
