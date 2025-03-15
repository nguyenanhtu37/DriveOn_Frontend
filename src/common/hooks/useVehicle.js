// src/common/hooks/useVehicle.js
import { useState, useEffect, useCallback } from "react";
import { getVehicles, addVehicle, updateVehicle, deleteVehicle, getVehicleById } from "@/app/services/vehicle";

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVehicleById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const vehicle = await getVehicleById(id);
      return vehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addNewVehicle = async (vehicleData) => {
    setLoading(true);
    setError(null);
    try {
      const newVehicle = await addVehicle(vehicleData);
      setVehicles((prev) => [...prev, newVehicle]);
      return newVehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingVehicle = async (id, vehicleData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedVehicle = await updateVehicle(id, vehicleData);
      setVehicles((prev) =>
        prev.map((v) => (v._id === id ? updatedVehicle : v))
      );
      return updatedVehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    getVehicle: fetchVehicleById,
    addVehicle: addNewVehicle,
    updateVehicle: updateExistingVehicle,
    deleteVehicle: deleteExistingVehicle,
  };
};