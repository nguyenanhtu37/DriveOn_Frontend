// src/pages/CarOwner/VehiclePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleCard from '@/components/vehicle/VehicleCard';
import { MagnifyingGlassIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useVehicles } from '@/common/hooks/useVehicle';
import Modal from '@/components/vehicle/Modal';
import AddVehicleForm from '../Vehicle/AddVehicle';
import EditVehicleForm from '../Vehicle/EditVehicle';

const VehiclePage = () => {
  const navigate = useNavigate();
  const { vehicles, loading, error, fetchVehicles } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = 
      vehicle.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.carPlate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Maintenance' && vehicle.maintenanceHistory.length > 0) ||
      (statusFilter === 'Active' && vehicle.maintenanceHistory.length === 0);
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    fetchVehicles();
  };
  const openEditModal = (id) => {
    setSelectedVehicleId(id);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedVehicleId(null);
    setIsEditModalOpen(false);
    fetchVehicles();
  };

  if (loading) return <div className="p-6 text-center">Loading vehicles...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/profile')} className="mr-4">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">My Vehicles</h1>
        </div>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Vehicle
        </button>
      </div>

      <div className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center w-3/4">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name or license plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-gray-600"
            />
          </div>
          <div className="flex items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-none outline-none text-gray-600"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" />
          </div>
        </div>
      </div>

      {filteredVehicles.length === 0 ? (
        <div className="text-center text-gray-500">No vehicles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              onEdit={openEditModal}
            />
          ))}
        </div>
      )}

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add New Vehicle">
        <AddVehicleForm onClose={closeAddModal} />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Vehicle">
        <EditVehicleForm vehicleId={selectedVehicleId} onClose={closeEditModal} />
      </Modal>
    </div>
  );
};

export default VehiclePage;