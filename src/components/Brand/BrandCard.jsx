// src/components/Brand/BrandCard.jsx
import { Pencil, Trash } from "lucide-react";

const BrandCard = ({ brand, onEdit, onDelete }) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 w-full max-w-xs flex flex-col items-center text-center">
      <div className="relative w-28 h-28 mb-4">
        <img
          src={brand.logo}
          alt={brand.brandName}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{brand.brandName}</h3>
      <div className="flex gap-4 mt-2">
        <button 
          onClick={() => onEdit(brand)} 
          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
          title="Edit brand"
        >
          <Pencil size={18} />
        </button>
        <button 
          onClick={() => onDelete(brand._id)} 
          className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
          title="Delete brand"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default BrandCard;
