import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVehicles } from "@/common/hooks/useVehicle";
import { useBrands } from "@/common/hooks/useBrand";
import { vehicleSchema } from "@/schema/vehicleSchema"; // Import the Zod schema
import useUpload from "@/app/services/Cloudinary/upload"; // Import useUpload

const EditVehicleForm = ({ vehicleId, onClose }) => {
  const navigate = useNavigate();
  const { fetchVehicleById, updateVehicle, fetchVehicles } = useVehicles();
  const { brands, loading: brandsLoading } = useBrands();
  const { files, progressList, handleFileChange, handleUpload, handleRemove } = useUpload(); // Handle file uploads

  const [formData, setFormData] = useState({
    carBrand: "",
    carName: "",
    carYear: "",
    carColor: "",
    carPlate: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      vehicleSchema.parse(formData); // Will throw an error if validation fails
    } catch (err) {
      setError(err.errors[0].message);
      return;
    }

    setSubmitting(true);

    try {
      // Upload images to Cloudinary and get the URLs
      const uploadedUrls = await handleUpload();
      const updatedData = { ...formData, carImages: uploadedUrls };

      await updateVehicle(vehicleId, updatedData);
      await fetchVehicles();
      navigate("/vehicle");
    } catch (err) {
      setError(err.message || "Failed to update vehicle.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading vehicle...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-500 text-sm">Update your vehicle details.</p>

      {/* Brand, Model, Year, Color, License Plate Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Brand</label>
          {brandsLoading ? (
            <p className="text-gray-500">Loading brands...</p>
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

      {/* Year, Color, License Plate Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Year</label>
          <input
            type="text"
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

      {/* Image Upload Section */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">Car Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />
        {files.length > 0 && (
          <div className="mt-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(file)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {progressList && Object.keys(progressList).map((fileName, index) => (
          <div key={index}>
            {fileName}: {progressList[fileName]}%
          </div>
        ))}
      </div>

      {/* Error Display */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Submit and Cancel Buttons */}
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
