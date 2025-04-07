// src/components/Brand/BrandCard.jsx
import { Pencil, Trash } from "lucide-react";

const BrandCard = ({ brand, onEdit, onDelete }) => {
  return (
    <div className="border rounded-2xl shadow-md p-4 w-full max-w-xs flex flex-col items-center text-center">
      <img
        src={brand.logo}
        alt={brand.brandName}
        className="w-24 h-24 object-contain mb-3"
      />
      <h3 className="text-lg font-semibold mb-2">{brand.brandName}</h3>
      <div className="flex gap-3">
        <button onClick={() => onEdit(brand)} className="text-blue-600 hover:underline">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(brand._id)} className="text-red-600 hover:underline">
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default BrandCard;
