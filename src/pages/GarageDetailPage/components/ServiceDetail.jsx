import { useGetFeedbackForServiceDetail } from "@/app/stores/entity/feedbackV2";
import {
  useDialogData,
  useDialogOpen,
  useSetDialogId,
} from "@/app/stores/view/dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils";
import FeedbackItem from "./FeedbackItem";

const ServiceDetail = () => {
  const isOpen = useDialogOpen("ServiceDetail");
  const setDialogId = useSetDialogId();

  const data = useDialogData("ServiceDetail");

  const handleClose = () => {
    if (isOpen) {
      setDialogId({ id: null, data: null });
    }
  };
  const feedbacks = useGetFeedbackForServiceDetail(data?._id);

  console.log(feedbacks.data);

  if (!data) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        hiddenClose={true}
        className="p-0 max-w-[1200px] min-h-[70vh] max-h-[90vh]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Service Information Side */}
          <div className="p-6 border-r">
            <ScrollArea className="h-full max-h-[80vh]">
              <div className="flex flex-col gap-y-4">
                <h2 className="text-xl font-semibold text-[#222222]">
                  {data.name}
                </h2>

                {/* Service Image */}
                <div className="w-full">
                  <img
                    src={data.images[0] || "/placeholder.svg"}
                    alt={data.name}
                    className="w-full h-[250px] object-cover rounded-xl"
                  />
                </div>

                {/* Service Details */}
                <div className="flex flex-col gap-y-4">
                  <div>
                    <span className="text-[#3c3c43] font-semibold block mb-2">
                      Description:
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {data.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#3c3c43] font-semibold block mb-1">
                        Duration:
                      </span>
                      <p className="text-sm">{data.duration} minutes</p>
                    </div>

                    <div>
                      <span className="text-[#3c3c43] font-semibold block mb-1">
                        Price:
                      </span>
                      <p className="text-sm font-medium text-green-600">
                        {formatCurrency(data.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Feedback Side */}
          <div className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <span className="text-sm text-muted-foreground">
                  {feedbacks.data.length} reviews
                </span>
              </div>

              <Separator className="mb-4" />

              <ScrollArea className="flex-1">
                <div className="space-y-6">
                  {feedbacks.data.length > 0 ? (
                    feedbacks.data.map((feedback) => (
                      <FeedbackItem
                        key={feedback._id}
                        avatar={feedback.user.avatar}
                        name={feedback.user.name}
                        content={feedback.content}
                        rating={feedback.rating}
                        services={
                          <>
                            <span className="font-semibold">
                              {feedback.serviceDetail.name},{" "}
                            </span>
                            {feedback.appointment.service
                              ?.filter(
                                (service) =>
                                  service.name !== feedback.serviceDetail.name
                              )
                              .map((service) => service.name)
                              .join(", ")}
                          </>
                        }
                        createdAt={feedback.createdAt}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No reviews yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetail;
