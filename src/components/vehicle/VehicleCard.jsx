import { useState } from 'react'; 
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '@/common/hooks/useVehicle';
import {DeleteConfirmationModal} from '@/components/vehicle/DeleteConfirm'; 

const VehicleCard = ({ vehicle, onEdit }) => {
  const navigate = useNavigate();
  const { deleteVehicle, fetchVehicles } = useVehicles();
  const { _id, carBrand, carName, carYear, carPlate, carColor, maintenanceHistory } = vehicle;
  const status = maintenanceHistory.length > 0 ? 'Maintenance' : 'Active';

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // Now useState is available

  const handleView = () => navigate(`/car-owner/vehicles/${_id}`);
  const handleEdit = () => onEdit(_id);
  
  const handleDelete = async () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteVehicle(_id);
      await fetchVehicles();
      alert('Vehicle deleted successfully');
      setIsConfirmDeleteOpen(false);
      navigate(0); // This refreshes the current page
    } catch (err) {
      alert('Error deleting vehicle: ' + err.message);
      setIsConfirmDeleteOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Placeholder */}
      <div className="relative h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4-4m0 0l4 4m-4-4v8m8-12h-4m4 0h-4m4 0v8"
            ></path>
          </svg>
        </div>
        <span
          className={`absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded-full ${status === 'Maintenance' ? 'bg-yellow-500' : 'bg-green-500'}`}
        >
          {status}
        </span>
      </div>

      {/* Vehicle Info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{carName}</h3>
        <p className="text-gray-600">Brand: <span className="font-medium">{carBrand.brandName}</span></p>
        <p className="text-gray-600">Year: <span className="font-medium">{carYear}</span></p>
        <p className="text-gray-600">License Plate: <span className="font-medium">{carPlate}</span></p>
        <p className="text-gray-600">Color: <span className="font-medium">{carColor}</span></p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between">
        <button onClick={handleView} className="text-gray-500 hover:text-gray-700">
          <EyeIcon className="w-5 h-5 inline-block mr-1" />
          View
        </button>
        <button onClick={handleEdit} className="text-gray-500 hover:text-gray-700">
          <PencilIcon className="w-5 h-5 inline-block mr-1" />
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          <TrashIcon className="w-5 h-5 inline-block mr-1" />
          Delete
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default VehicleCard;
