import { Button } from "@/components/ui/button";
import { useDeleteVehicle } from "@/app/stores/entity/vehicleV2";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const DeleteVehicleButton = ({ vehicleId }) => {
  const deleteVehicle = useDeleteVehicle();
  const queryClient = useQueryClient(); 

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicle.mutate(vehicleId, {
        onSuccess: () => {
          // Invalidate cache để tự động refetch danh sách
          queryClient.invalidateQueries(["myVehicleV2"]);
          toast({
            title: "Deleted",
            description: "Vehicle deleted successfully.",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error?.message || "Something went wrong",
            variant: "destructive",
          });
        },
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="text-red-500 border border-red-200 mt-2 w-full"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};
