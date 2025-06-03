import { useGetMyVehicles, useDeleteVehicle } from "@/app/stores/entity/vehicleV2";
import { Loading } from "@/components/Loading";
import { TabsContent } from "@/components/ui/tabs";
import { CreateVehicle } from "./CreateVehicle";
import { useState } from "react";
import { VehicleDetail } from "./Details";
import { EditVehicleDialog } from "./EditVehicle";
import VehicleCard from "./VehicleCard";
import { Car } from "lucide-react";
import { VehicleMaintenanceHistory } from "./VehicleMaintenanceHistory";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import DeleteVehicleModal from "@/components/vehicle/DeleteVehicleModal";

export const Vehicle = () => {
  const myVehicles = useGetMyVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editVehicle, setEditVehicle] = useState(null);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const deleteVehicle = useDeleteVehicle();
  const queryClient = useQueryClient();

  if (myVehicles.isLoading) return <Loading />;

  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleEditVehicle = (vehicle) => {
    setEditVehicle(vehicle);
  };

  const handleDeleteVehicle = (vehicle) => {
    setVehicleToDelete(vehicle);
  };

  const confirmDelete = () => {
    if (!vehicleToDelete?._id) return;
    deleteVehicle.mutate(vehicleToDelete._id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["myVehicleV2"]);
        toast({
          title: "Deleted",
          description: "Vehicle deleted successfully.",
        });
        setVehicleToDelete(null);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error?.message || "Something went wrong",
          variant: "destructive",
        });
        setVehicleToDelete(null);
      },
    });
  };

  return (
    <>
      <TabsContent value="vehicles" className="space-y-8 mt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Vehicles</h2>
            </div>
          </div>
          <CreateVehicle />
        </div>

        {/* Vehicles Grid */}
        {myVehicles.data && myVehicles.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {myVehicles.data.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onView={handleViewVehicle}
                onEdit={handleEditVehicle}
                onDelete={handleDeleteVehicle}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <Car className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No vehicles yet
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Get started by adding your first vehicle to keep track of your
              automotive assets.
            </p>
            <CreateVehicle />
          </div>
        )}

        {/* Modals */}
        {selectedVehicle && (
          <VehicleDetail
            vehicleId={selectedVehicle._id}
            open={true}
            onClose={() => setSelectedVehicle(null)}
          />
        )}

        {editVehicle && (
          <EditVehicleDialog
            vehicle={editVehicle}
            open={true}
            onClose={() => setEditVehicle(null)}
          />
        )}

        <VehicleMaintenanceHistory
          open={selectedVehicle !== null}
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      </TabsContent>

      {/* Delete Confirmation Modal */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-50">
          <DeleteVehicleModal
            vehicle={vehicleToDelete}
            onConfirm={confirmDelete}
            onCancel={() => setVehicleToDelete(null)}
          />
        </div>
      )}
    </>
  );
};
