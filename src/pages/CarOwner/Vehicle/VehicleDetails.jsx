"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Gauge } from "lucide-react";
import DeleteVehicleModal from "../../../components/vehicle/DeleteVehicleModal";
import { useVehicles } from "../../../common/hooks/useVehicle";
import { getBrands } from "@/app/services/brand"; // Fetch brands
import AbsoluteScreenPath from "@/app/routes/Route";

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchVehicleById, deleteVehicle, loading, error } = useVehicles();
  const [vehicle, setVehicle] = useState(null);
  const [brands, setBrands] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ setDeleting] = useState(false);

  // Fetch vehicle details and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleData = await fetchVehicleById(id);
        console.log('VehicleDetailsPage - Fetched vehicle:', vehicleData);
        setVehicle(vehicleData);

        const brandData = await getBrands();
        console.log('Fetched brands:', brandData);
        setBrands(brandData);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    };
    fetchData();
  }, [id, fetchVehicleById]);

  // Map carBrand ObjectId to brandName and logo
  const brand = brands.find((b) => b._id.toString() === vehicle?.carBrand?.toString());
  const brandName = brand ? brand.brandName : "N/A";
  const brandLogo = brand ? brand.logo : null;

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteVehicle(id);
      setShowDeleteModal(false);
      navigate(AbsoluteScreenPath.VehicleList, { replace: true });
    } catch (err) {
      console.error("Failed to delete vehicle:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => setShowDeleteModal(false);

  if (loading || !vehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-primary text-lg flex items-center space-x-2">
          <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading vehicle details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-destructive text-lg bg-destructive/10 p-4 rounded-lg shadow-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-heading" />
          </button>
          <h1 className="text-2xl font-semibold text-heading">Vehicle Details</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-64 bg-gray-200">
            <img
              src={vehicle.carImages }
              alt={`${vehicle.carName}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load:', vehicle.carImages);
                e.target.src = "/placeholder.svg?height=256&width=800";
              }}
            />
            <div
              className={`absolute top-4 right-4 px-3 py-1 text-sm font-medium text-white rounded-full ${
                vehicle.maintenanceHistory?.length > 0 ? "bg-yellow-500" : "bg-green-500"
              }`}
            >
              {vehicle.maintenanceHistory?.length > 0 ? "Maintenance" : "Active"}
            </div>
          </div>

          <div className="p-8">
            {/* Vehicle Name as Title */}
            <h2 className="text-3xl font-bold text-heading mb-4">{vehicle.carName}</h2>

            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-heading border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-body">Brand</p>
                    <p className="font-medium text-heading">{brandName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Year</p>
                    <p className="font-medium text-heading">{vehicle.carYear || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">License Plate</p>
                    <p className="font-medium text-heading">{vehicle.carPlate || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Color</p>
                    <p className="font-medium text-heading">{vehicle.carColor || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Status</p>
                    <p className="font-medium text-heading capitalize">
                      {vehicle.maintenanceHistory?.length > 0 ? "Maintenance" : "Active"}
                    </p>
                  </div>
                </div>

                {/* Display car brand logo if available */}
                {brandLogo && (
                  <div className="mt-4">
                    <p className="text-sm text-body">Brand Logo</p>
                    <img
                      src={brandLogo}
                      alt={`${brandName} logo`}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Dates & Service Information Section */}
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-semibold text-heading border-b pb-2">Dates & Service Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-body">Created</p>
                    <p className="font-medium text-heading">
                      {vehicle.createdAt ? new Date(vehicle.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-body">Last Updated</p>
                    <p className="font-medium text-heading">
                      {vehicle.updatedAt ? new Date(vehicle.updatedAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Gauge className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-body">Maintenance Records</p>
                    <p className="font-medium text-heading">{vehicle.maintenanceHistory?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteVehicleModal vehicle={vehicle} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </div>
  );
};

export default VehicleDetailsPage;