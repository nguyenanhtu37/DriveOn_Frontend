import { useGetMyVehicles } from "@/app/stores/entity/vehicleV2";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { CreateVehicle } from "./CreateVehicle";
import { useState, useEffect } from "react";
import { VehicleDetail } from "./Details";
import { EditVehicleDialog } from "./EditVehicle";
import { DeleteVehicleButton } from "./DeleteButton";
import { getBrands } from '@/app/services/brand';

export const Vehicle = () => {
  const myVehicles = useGetMyVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editVehicle, setEditVehicle] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);

  useEffect(() => {
    const fetchBrandData = async () => {
      setLoadingBrands(true);
      try {
        const brandData = await getBrands();
        setBrands(brandData);
      } catch (err) {
        console.error('Error fetching brands:', err);
      } finally {
        setLoadingBrands(false);
      }
    };
    fetchBrandData();
  }, []);

  if (myVehicles.isLoading) return <Loading />;

  return (
    <TabsContent value="vehicles" className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">My Vehicles</h2>
        <CreateVehicle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myVehicles.data.length > 0 ? (
          myVehicles.data.map((vehicle) => {
            const brandId = typeof vehicle.carBrand === 'object' ? vehicle.carBrand._id : vehicle.carBrand;
            const brand = brands.find((b) => b._id === brandId);
            const brandName = brand ? brand.brandName : 'Unknown';

            return (
              <Card key={vehicle._id} className="border border-gray-100">
                <CardHeader className="pb-2 border-l-4 border-l-red-500">
                  <div className="flex justify-between items-start">
                    <CardTitle>{vehicle.carName}</CardTitle>
                  </div>
                  <CardDescription>License: {vehicle.carPlate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Year of manufacture:</span>
                      <span className="font-medium">{vehicle.carYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Color:</span>
                      <span className="font-medium">{vehicle.carColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Brand:</span>
                      <span className="font-medium">{loadingBrands ? 'Loading...' : brandName}</span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2 bg-white text-red-500 hover:bg-red-50 border border-red-200"
                      onClick={() => setSelectedVehicle(vehicle)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="w-full mt-2 bg-gray-100 text-gray-800 border border-gray-200"
                      onClick={() => setEditVehicle(vehicle)}
                    >
                      Edit
                    </Button>
                    <DeleteVehicleButton vehicleId={vehicle._id} />
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          "No vehicles yet"
        )}
      </div>

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
    </TabsContent>
  );
};
