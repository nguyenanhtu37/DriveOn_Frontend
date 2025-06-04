import { useState } from "react";
import BrandCard from "@/components/Brand/BrandCard";
import BrandFormDialog from "@/components/Brand/BrandFormDialog";
import { useGetBrands } from "@/app/stores/entity/brandV2";
import { addBrand, updateBrand, deleteBrand } from "@/app/services/brand";

const BrandList = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const { data: brands, pagination, isLoading, refetch } = useGetBrands(page, limit);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const handleAdd = () => {
    setEditingBrand(null);
    setDialogOpen(true);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setDialogOpen(true);
  };

  const handleDeleteClick = (brand) => {
    setBrandToDelete(brand);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (brandToDelete) {
      await deleteBrand(brandToDelete._id);
      refetch();
      setDeleteDialogOpen(false);
      setBrandToDelete(null);
    }
  };

  const handleSubmit = async (formData) => {
    if (editingBrand) {
      await updateBrand(editingBrand._id, formData);
    } else {
      await addBrand(formData);
    }
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="p-0 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200">
      <div className="max-w-6xl mx-auto py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow">
            <span className="text bg-clip-text bg-gradient-to-r from-black via-gray-400 to-gray-00 text-2xl md:text-2xl ">
              Brands List
            </span>
          </h1>
          <button
            onClick={handleAdd}
            className="bg-black text-white px-3 py-1 rounded-2xl font-bold shadow-lg hover:bg-gray-900 transition text-base flex items-center gap-2"
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5"/></svg>
            Add Brand
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-500 text-xl font-semibold animate-pulse">Loading...</span>
          </div>
        ) : brands.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <span className="text-gray-400 text-2xl font-semibold">No brands found.</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {brands.map((brand) => (
                <BrandCard
                  key={brand._id}
                  brand={brand}
                  onEdit={handleEdit}
                  onDelete={() => handleDeleteClick(brand)}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= pagination.totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        {dialogOpen && (
          <BrandFormDialog
            onSubmit={handleSubmit}
            onClose={() => setDialogOpen(false)}
            initialData={editingBrand}
          />
        )}

        {deleteDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {brandToDelete?.name}? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandList;