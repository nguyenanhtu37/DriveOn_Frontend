import { useDeleteService } from "@/app/stores/entity/service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export const DeleteService = ({ serviceId }) => {
  const deleteService = useDeleteService();
  const onClick = async () => {
    deleteService.mutate(serviceId);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium text-red-600 transition-colors flex items-center">
          <Trash2 size={16} className="mr-2" />
          Remove
        </button>
      </DialogTrigger>
      <DialogContent className=" min-w-[378px] max-w-[600px] w-full">
        <DialogHeader>
          <DialogTitle>Confirm remove service</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DialogDescription>
            Are you sure you want to delete this service?
          </DialogDescription>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            className="bg-red-200 hover:bg-red-300 transition-colors duration-100 ease-in-out"
            onClick={onClick}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
