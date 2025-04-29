import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetVehicleById } from "@/app/stores/entity/vehicleV2";
import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";
import { getBrands } from '@/app/services/brand';

export const VehicleDetail = ({ vehicleId, open, onClose }) => {
  const { data, isLoading } = useGetVehicleById(vehicleId);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);

  useEffect(() => {
    const fetchBrandData = async () => {
      setLoadingBrands(true);
      try {
        const brandData = await getBrands();
        setBrands(brandData);
      } catch (err) {
        // handle error if needed
      } finally {
        setLoadingBrands(false);
      }
    };
    fetchBrandData();
  }, []);

  let brandName = "-";
  if (data && brands.length > 0) {
    const brandId = typeof data.carBrand === "object" ? data.carBrand._id : data.carBrand;
    const brand = brands.find((b) => b._id === brandId);
    brandName = brand ? brand.brandName : "-";
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loading />
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900 flex items-center gap-3">
              {data.carName}
              <span className="ml-2 px-4 py-1 bg-gray-100 text-lg rounded font-semibold text-gray-700">
                {data.carPlate}
              </span>
            </h2>
            <div className="flex flex-col md:flex-row gap-12 mt-6">
              <div className="flex-1">
                <div className="mb-6 flex items-center">
                  <span className="w-32 text-gray-500 font-medium">Year:</span>
                  <span className="font-semibold text-gray-800">{data.carYear}</span>
                </div>
                <div className="mb-6 flex items-center">
                  <span className="w-32 text-gray-500 font-medium">Color:</span>
                  <span className="font-semibold text-gray-800">{data.carColor}</span>
                </div>
                <div className="mb-6 flex items-center">
                  <span className="w-32 text-gray-500 font-medium">Brand:</span>
                  <span className="font-semibold text-gray-800">
                    {loadingBrands ? "Loading..." : brandName}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                {data.carImages && data.carImages.length > 0 ? (
                  <div className={`grid ${data.carImages.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-6 w-full`}>
                    {data.carImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`car-${index}`}
                        className="w-full max-h-[500px] object-contain rounded-2xl border bg-gray-100 shadow"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-2xl text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};