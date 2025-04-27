import { useState } from "react";
import BrandCard from "@/components/Brand/BrandCard";
import BrandFormDialog from "@/components/Brand/BrandFormDialog";
import useBrands from "@/common/hooks/useBrand";
import { addBrand, updateBrand, deleteBrand } from "@/app/services/brand";

const BrandList = () => {
  const { brands, fetchBrands, loading } = useBrands();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const handleAdd = () => {
    setEditingBrand(null);
    setDialogOpen(true);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteBrand(id);
    fetchBrands();
  };

  const handleSubmit = async (formData) => {
    if (editingBrand) {
      await updateBrand(editingBrand._id, formData);
    } else {
      await addBrand(formData);
    }
    fetchBrands();
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

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-500 text-xl font-semibold animate-pulse">Loading...</span>
          </div>
        ) : brands.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <span className="text-gray-400 text-2xl font-semibold">No brands found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <BrandCard
                key={brand._id}
                brand={brand}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {dialogOpen && (
          <BrandFormDialog
            onSubmit={handleSubmit}
            onClose={() => setDialogOpen(false)}
            initialData={editingBrand}
          />
        )}
      </div>
    </div>
  );
};

export default BrandList;