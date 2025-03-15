// src/components/vehicle/DeleteVehicleModal.jsx
import PropTypes from "prop-types";

const DeleteVehicleModal = ({ vehicle, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-heading mb-4">Delete Vehicle</h2>
        <p className="text-body mb-4">
          Are you sure you want to delete this vehicle: 
          <span className="font-medium"> {vehicle?.carBrand?.brandName || "N/A"} {vehicle?.carName}</span>?
        </p>
        <p className="text-destructive text-sm mb-6">
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
DeleteVehicleModal.propTypes = {
  vehicle: PropTypes.shape({
    carBrand: PropTypes.shape({
      brandName: PropTypes.string,
    }),
    carName: PropTypes.string,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteVehicleModal;