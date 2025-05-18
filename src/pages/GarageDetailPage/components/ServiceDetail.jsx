import {
  useDialogData,
  useDialogOpen,
  useSetDialogId,
} from "@/app/stores/view/dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatCurrency } from "@/utils";

const ServiceDetail = () => {
  const isOpen = useDialogOpen("ServiceDetail");
  const setDialogId = useSetDialogId();

  const data = useDialogData("ServiceDetail");

  const handleClose = () => {
    if (isOpen) {
      setDialogId({ id: null, data: null });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className=" p-6  max-w-[680px] ">
        <div className=" w-full flex flex-col items-start gap-y-4 max-h-[800px] overflow-y-auto">
          <span className=" text-lg font-semibold text-[#22222]">
            {data?.name}
          </span>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            <div className=" w-full flex flex-col items-start gap-y-4">
              <img
                src={data?.images[0]}
                alt=""
                className=" w-full h-[200px] object-cover rounded-xl"
              />
            </div>
            <div className=" w-full flex flex-col col-span-2 items-start gap-y-2 ">
              <p className="text-sm line-clamp-3">
                <span className=" text-[#3c3c43] font-semibold mb-1 ">
                  Description:
                </span>{" "}
                {data?.description}
              </p>
              <p className="text-sm ">
                <span className=" text-[#3c3c43] font-semibold mb-1">
                  Duration:
                </span>{" "}
                {data?.duration} minutes
              </p>
              <p className="text-sm ">
                <span className=" text-[#3c3c43] font-semibold">Price:</span>{" "}
                {formatCurrency(data?.price)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetail;
