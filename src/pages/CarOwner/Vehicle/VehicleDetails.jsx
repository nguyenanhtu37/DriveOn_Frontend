"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Edit, Trash2, Calendar, Clock, Gauge, FileText } from "lucide-react"
import DeleteVehicleModal from "../../../components/vehicle/DeleteVehicleModal"
import  useVehicles  from "../../../common/hooks/useVehicles"

const VehicleDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getVehicle, deleteVehicle, loading, error } = useVehicles()
  const [vehicle, setVehicle] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicle(id)
        setVehicle(data)
      } catch (err) {
        console.error("Failed to load vehicle:", err)
      }
    }

    fetchVehicle()
  }, [id, getVehicle])

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    await deleteVehicle(id)
    setShowDeleteModal(false)
    navigate("/vehicle")
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
  }

  if (loading || !vehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-primary text-lg flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading vehicle details...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-destructive text-lg bg-destructive/10 p-4 rounded-lg shadow-md">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-archivo">
      {/* Header */}
      <div className="bg-white shadow-md p-4 md:p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/vehicle")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-heading" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-heading">Vehicle Details</h1>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/vehicle/edit/${id}`}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-md"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDeleteClick}
                className="flex items-center px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-all duration-200 shadow-md"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Vehicle Image */}
          <div className="h-64 bg-gray-200 relative">
            <img
              src={vehicle.image || "/placeholder.svg?height=256&width=800"}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=256&width=800"
              }}
            />
            <div
              className={`absolute top-4 right-4 px-3 py-1 text-sm font-medium text-white rounded-full ${
                vehicle.status === "active"
                  ? "bg-green-500"
                  : vehicle.status === "inactive"
                    ? "bg-gray-500"
                    : "bg-yellow-500"
              }`}
            >
              {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-heading mb-4">
              {vehicle.make} {vehicle.model}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-heading border-b pb-2">Basic Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-body">Year</p>
                    <p className="font-medium text-heading">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">License Plate</p>
                    <p className="font-medium text-heading">{vehicle.licensePlate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Type</p>
                    <p className="font-medium text-heading">{vehicle.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Color</p>
                    <p className="font-medium text-heading">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">VIN</p>
                    <p className="font-medium text-heading">{vehicle.vin || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Status</p>
                    <p className="font-medium text-heading capitalize">{vehicle.status}</p>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-heading border-b pb-2">Technical Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-body">Fuel Type</p>
                    <p className="font-medium text-heading">{vehicle.fuelType || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Transmission</p>
                    <p className="font-medium text-heading">{vehicle.transmission || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Mileage</p>
                    <p className="font-medium text-heading">
                      {vehicle.mileage ? `${vehicle.mileage} km` : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-body">Engine</p>
                    <p className="font-medium text-heading">{vehicle.engine || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates and Service Information */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-heading border-b pb-2">Dates & Service Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-body">Purchase Date</p>
                    <p className="font-medium text-heading">{vehicle.purchaseDate || "Not recorded"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-body">Last Service Date</p>
                    <p className="font-medium text-heading">{vehicle.lastServiceDate || "Not recorded"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Gauge className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-body">Next Service Due</p>
                    <p className="font-medium text-heading">{vehicle.nextServiceDate || "Not scheduled"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {vehicle.notes && (
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-heading border-b pb-2">Notes</h3>
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-body">{vehicle.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteVehicleModal vehicle={vehicle} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </div>
  )
}

export default VehicleDetailsPage

