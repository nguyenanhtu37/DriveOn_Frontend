import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVehicles, addVehicle, deleteVehicle, getVehicleById, updateVehicle } from '@/app/services/vehicleV2';

export const useVehicles = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  // Fetch all vehicles with React Query
  const { data: vehicles = [], isLoading: loading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    onError: (err) => setError(err.message)
  });

  // Add vehicle mutation
  const addVehicleMutation = useMutation({
    mutationFn: addVehicle,
    onSuccess: (newVehicle) => {
      queryClient.setQueryData(['vehicles'], (old) => [...(old || []), newVehicle]);
    },
    onError: (err) => setError(err.message)
  });

  // Update vehicle mutation
  const updateVehicleMutation = useMutation({
    mutationFn: updateVehicle,
    onSuccess: (updatedVehicle) => {
      queryClient.setQueryData(['vehicles'], (old) => 
        old?.map(v => v._id === updatedVehicle._id ? updatedVehicle : v)
      );
    },
    onError: (err) => setError(err.message)
  });

  // Delete vehicle mutation
  const deleteVehicleMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: (response, deletedId) => {
      // Cập nhật cache ngay lập tức
      queryClient.setQueryData(['vehicles'], (old) => 
        old?.filter(v => v._id !== deletedId)
      );
      // Sau đó mới invalidate để đảm bảo data đồng bộ
      queryClient.invalidateQueries(['vehicles']);
    },
    onError: (err) => {
      console.error('Delete mutation error:', err);
      setError(err.message);
    }
  });

  // Fetch vehicle by ID
  const fetchVehicleById = useCallback(async (id) => {
    try {
      const vehicle = await getVehicleById(id);
      return vehicle;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  return {
    vehicles,
    loading,
    error,
    addVehicle: addVehicleMutation.mutate,
    updateVehicle: updateVehicleMutation.mutate,
    deleteVehicle: deleteVehicleMutation.mutate,
    fetchVehicleById,
  };
};

export default useVehicles;
