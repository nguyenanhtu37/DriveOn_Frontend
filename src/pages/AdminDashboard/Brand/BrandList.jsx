// src/components/Brand/BrandList.jsx
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brands List</h1>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          + Add BrandBrand
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
  );
};

export default BrandList;
