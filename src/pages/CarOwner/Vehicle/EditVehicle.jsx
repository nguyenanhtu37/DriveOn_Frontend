import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import { useVehicles } from "@/common/hooks/useVehicle";
import { useBrands } from "@/common/hooks/useBrand";

const EditVehicleForm = ({ vehicleId, onClose }) => {
  const navigate = useNavigate(); // Initialize navigate hook
  const { fetchVehicleById, updateVehicle, fetchVehicles, error: vehicleError } = useVehicles();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();
  const [formData, setFormData] = useState({
    carBrand: "",
    carName: "",
    carYear: "",
    carColor: "",
    carPlate: "",
  });
  const [error, setError] = useState(null); // Error state for form submission
  const [loading, setLoading] = useState(true); // Loading state for fetching vehicle data
  const [submitting, setSubmitting] = useState(false); // Submitting state for form submission

  // Fetch the vehicle details on mount
  useEffect(() => {
    const loadVehicle = async () => {
      setLoading(true);
      try {
        const vehicle = await fetchVehicleById(vehicleId);
        if (vehicle) {
          setFormData({
            carBrand: vehicle.carBrand?._id || vehicle.carBrand || "",
            carName: vehicle.carName || "",
            carYear: vehicle.carYear || "",
            carColor: vehicle.carColor || "",
            carPlate: vehicle.carPlate || "",
          });
        } else {
          setError("Vehicle not found.");
        }
      } catch (err) {
        setError(err.message || "Failed to load vehicle data.");
      } finally {
        setLoading(false);
      }
    };
    loadVehicle();
  }, [vehicleId, fetchVehicleById]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on each submit attempt

    // Basic form validation
    if (!formData.carBrand) {
      setError("Please select a brand.");
      return;
    }
    if (!formData.carName.trim()) {
      setError("Please enter a model name.");
      return;
    }
    if (!formData.carYear || isNaN(formData.carYear) || formData.carYear < 1900 || formData.carYear > new Date().getFullYear() + 1) {
      setError("Please enter a valid year (1900 - next year).");
      return;
    }

    // Set submitting state to true
    setSubmitting(true);
    try {
      // Update the vehicle with the current form data
      await updateVehicle(vehicleId, formData);
      // Refresh the vehicle list after update
      await fetchVehicles();
      // Navigate to the vehicle list page after successful update
      navigate("/vehicle");  // Change this path to your vehicle list route
    } catch (err) {
      setError(err.message || "Failed to update vehicle.");
    } finally {
      setSubmitting(false); // Reset submitting state after completion
    }
  };

  // Display loading or error state
  if (loading) return <div className="p-4 text-center">Loading vehicle...</div>;
  if (vehicleError) return <div className="p-4 text-center text-red-500">Error: {vehicleError}</div>;

  // Form JSX
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-500 text-sm">Update your vehicle details.</p>

      {/* Error Display */}
      {error && <div className="text-red-500 text-sm" role="alert">{error}</div>}

      {/* Brand and Model */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Brand</label>
          {brandsLoading ? (
            <p className="text-gray-500">Loading brands...</p>
          ) : brandsError ? (
            <p className="text-red-500 text-sm">Error: {brandsError}</p>
          ) : brands.length === 0 ? (
            <p className="text-gray-500">No brands available</p>
          ) : (
            <select
              value={formData.carBrand}
              onChange={(e) => setFormData({ ...formData, carBrand: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Model</label>
          <input
            type="text"
            value={formData.carName}
            onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
            placeholder="e.g. Camry"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={submitting}
          />
        </div>
      </div>

      {/* Year and Color */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Year</label>
          <input
            type="number"
            value={formData.carYear}
            onChange={(e) => setFormData({ ...formData, carYear: e.target.value })}
            placeholder="e.g. 2020"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Color</label>
          <input
            type="text"
            value={formData.carColor}
            onChange={(e) => setFormData({ ...formData, carColor: e.target.value })}
            placeholder="e.g. Silver"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={submitting}
          />
        </div>
      </div>

      {/* License Plate */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">License Plate</label>
        <input
          type="text"
          value={formData.carPlate}
          onChange={(e) => setFormData({ ...formData, carPlate: e.target.value })}
          placeholder="e.g. ABC-123"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={submitting}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
          disabled={brandsLoading || submitting}
        >
          {submitting ? "Updating..." : "Update Vehicle"}
        </button>
      </div>
    </form>
  );
};

export default EditVehicleForm;
