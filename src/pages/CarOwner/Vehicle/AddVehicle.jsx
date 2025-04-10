import { useState, useEffect } from "react";
import { useVehicles } from "@/common/hooks/useVehicle";
import { useBrands } from "@/common/hooks/useBrand";
import { vehicleSchema } from "@/schema/vehicleSchema";
import useUpload from "@/app/services/Cloudinary/upload"; // Import useUpload

const AddVehicleForm = ({ onClose }) => {
  const { addVehicle, fetchVehicles } = useVehicles();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();
  const { files, progressList, handleFileChange, handleUpload, handleRemove } = useUpload(); // Handle file uploads

  const [formData, setFormData] = useState({
    carBrand: "",
    carName: "",
    carYear: "",
    carColor: "",
    carPlate: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log("Brands received in form:", brands); // Debug log
  }, [brands]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate the form data using Zod schema
    try {
      vehicleSchema.parse(formData); // Will throw an error if validation fails
    } catch (err) {
      setError(err.errors[0].message); // Get the first error message from Zod
      return;
    }

    setSubmitting(true);

    try {
      // Upload images to Cloudinary and get the URLs
      const uploadedUrls = await handleUpload();
      const vehicleData = { ...formData, carImages: uploadedUrls };

      // Ensure the brand exists and submit the vehicle data
      if (!vehicleData.carBrand) {
        throw new Error("Please select a brand");
      }

      await addVehicle(vehicleData);
      await fetchVehicles();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-500 text-sm">Enter your vehicle details to add it to your account.</p>

      {/* Brand, Model, Year, Color, License Plate Fields */}
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
          className="px-4 py-2 border rounded hover:bg-gray-100"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
          disabled={brandsLoading || submitting}
        >
          {submitting ? "Adding..." : "Add Vehicle"}
        </button>
      </div>
    </form>
  );
};

export default AddVehicleForm;
