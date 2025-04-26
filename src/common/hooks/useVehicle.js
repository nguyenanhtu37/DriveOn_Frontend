import { useState, useEffect, useCallback } from 'react';
import { getVehicles, addVehicle,  deleteVehicle, getVehicleById } from '@/app/services/vehicle';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all vehicles
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVehicles(); // Now returns populated carBrand
      setVehicles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch vehicle by ID
  const fetchVehicleById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const vehicle = await getVehicleById(id); // Now returns populated carBrand
      return vehicle;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new vehicle
  const addNewVehicle = async (vehicleData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addVehicle(vehicleData);
      const newVehicle = response.vehicle; // Populated carBrand
      setVehicles((prev) => [...prev, newVehicle]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing vehicle


  // Delete an existing vehicle
  const deleteExistingVehicle = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteVehicle(id);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    fetchVehicleById,  // Ensure fetchVehicleById is returned
    addVehicle: addNewVehicle,
    updateVehicle: updateExistingVehicle,
    deleteVehicle: deleteExistingVehicle,
  };
};

export default useVehicles;
