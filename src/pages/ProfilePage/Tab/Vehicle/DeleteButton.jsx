import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDeleteVehicle } from "@/app/stores/entity/vehicleV2";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const DeleteVehicleButton = ({ vehicleId }) => {
  const deleteVehicle = useDeleteVehicle();
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteVehicle.mutate(vehicleId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["myVehicleV2"]);
        toast({
          title: "Deleted",
          description: "Vehicle deleted successfully.",
        });
        setShowConfirm(false);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error?.message || "Something went wrong",
          variant: "destructive",
        });
        setShowConfirm(false);
      },
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className="text-red-500 border border-red-200 mt-2 w-full"
        onClick={() => setShowConfirm(true)}
      >
        Delete
      </Button>
      {showConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-80 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2 text-red-600">Are you sure?</h2>
      <p className="mb-4 text-gray-700">Do you really want to delete this vehicle? This action cannot be undone.</p>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          className="border-gray-300"
          onClick={() => setShowConfirm(false)}
        >
          Cancel
        </Button>
        <Button
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={handleDelete}
        >
          Yes, Delete
        </Button>
      </div>
    </div>
  </div>
)}
    </>
  );
};