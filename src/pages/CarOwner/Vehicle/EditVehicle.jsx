// src/pages/CarOwner/Vehicle/EditVehicleForm.jsx
import { useState, useEffect } from 'react';
import { useVehicles } from '@/common/hooks/useVehicle';

const EditVehicleForm = ({ vehicleId, onClose }) => {
  const { fetchVehicleById, updateVehicle, error: vehicleError } = useVehicles();
  const [formData, setFormData] = useState({
    carBrand: '',
    carName: '',
    carYear: '',
    carColor: '',
    carPlate: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicle = async () => {
      setLoading(true);
      const vehicle = await fetchVehicleById(vehicleId);
      if (vehicle) {
        setFormData({
          carBrand: vehicle.carBrand._id || '',
          carName: vehicle.carName,
          carYear: vehicle.carYear,
          carColor: vehicle.carColor,
          carPlate: vehicle.carPlate,
        });
      }
      setLoading(false);
    };
    loadVehicle();
  }, [vehicleId, fetchVehicleById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await updateVehicle(vehicleId, formData);
      alert('Vehicle updated successfully');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading vehicle...</div>;
  if (vehicleError) return <div className="p-4 text-center text-red-500">Error: {vehicleError}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-500 text-sm">Update your vehicle details.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Brand</label>
          <input
            type="text"
            value={formData.carBrand}
            onChange={(e) => setFormData({ ...formData, carBrand: e.target.value })}
            placeholder="e.g. Toyota"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Model</label>
          <input
            type="text"
            value={formData.carName}
            onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
            placeholder="e.g. Camry"
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Year</label>
          <input
            type="text"
            value={formData.carYear}
            onChange={(e) => setFormData({ ...formData, carYear: e.target.value })}
            placeholder="e.g. 2020"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Color</label>
          <input
            type="text"
            value={formData.carColor}
            onChange={(e) => setFormData({ ...formData, carColor: e.target.value })}
            placeholder="e.g. Silver"
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">License Plate</label>
        <input
          type="text"
          value={formData.carPlate}
          onChange={(e) => setFormData({ ...formData, carPlate: e.target.value })}
          placeholder="e.g. ABC-123"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Update Vehicle
        </button>
      </div>
    </form>
  );
};

export default EditVehicleForm;