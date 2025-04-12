import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetVehicleById } from "@/app/stores/entity/vehicleV2";
import { Loading } from "@/components/Loading";

export const VehicleDetail = ({ vehicleId, open, onClose }) => {
  const { data, isLoading } = useGetVehicleById(vehicleId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{data.carName}</h2>
            <p><strong>Plate:</strong> {data.carPlate}</p>
            <p><strong>Year:</strong> {data.carYear}</p>
            <p><strong>Color:</strong> {data.carColor}</p>
            <div className="grid grid-cols-2 gap-2">
              {data.carImages?.map((img, index) => (
                <img key={index} src={img} alt={`car-${index}`} className="w-full h-auto rounded" />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
