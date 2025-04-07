import { useState } from "react";
import useUpload from "@/app/services/Cloudinary/upload";
import { useVehicles } from "@/common/hooks/useVehicle";

const VehicleForm = ({ initialData = {}, onSuccess, isEdit = false }) => {
  const [formData, setFormData] = useState({
    carBrand: initialData.carBrand || "",
    carName: initialData.carName || "",
    carYear: initialData.carYear || "",
    carColor: initialData.carColor || "",
    carPlate: initialData.carPlate || "",
  });

  const {
    files,
    progressList,
    handleFileChange,
    handleUpload,
    handleRemove,
  } = useUpload();

  const { addVehicle, updateVehicle } = useVehicles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedUrls = await handleUpload();

      const payload = {
        ...formData,
        carImages: uploadedUrls,
      };

      if (isEdit && initialData._id) {
        await updateVehicle(initialData._id, payload);
      } else {
        await addVehicle(payload);
      }

      alert("Vehicle saved successfully");
      onSuccess?.();
    } catch (error) {
      alert("Error saving vehicle: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="carName"
        placeholder="Car Name"
        value={formData.carName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="carYear"
        placeholder="Car Year"
        value={formData.carYear}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="carColor"
        placeholder="Car Color"
        value={formData.carColor}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="carPlate"
        placeholder="Car Plate"
        value={formData.carPlate}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="carBrand"
        placeholder="Car Brand ID"
        value={formData.carBrand}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <div className="border p-2 rounded">
        <label className="block mb-1 font-semibold">Upload Images</label>
        <input type="file" multiple onChange={handleFileChange} />
        <ul className="mt-2 space-y-1">
          {files.map((file) => (
            <li key={file.name} className="flex justify-between items-center">
              <span>{file.name}</span>
              <span>{progressList[file.name] || 0}%</span>
              <button type="button" onClick={() => handleRemove(file)} className="text-red-500 ml-2">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isEdit ? "Update Vehicle" : "Add Vehicle"}
      </button>
    </form>
  );
};

export default VehicleForm;