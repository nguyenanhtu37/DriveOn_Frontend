import { Card, CardContent } from "@/components/ui/card";
import { FaStar, FaPhone } from "react-icons/fa";

const FavoriteGarageCard = ({
  id,
  garageName,
  address,
  phone,
  imgs,
  rating,
  isFavorited,
  onRemove,
}) => {
  return (
    <Card className="w-full h-full mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-md rounded-lg border border-gray-200">
      <CardContent className="p-0">
        <div className="relative rounded-t-lg overflow-hidden">
          <img
            src={imgs && imgs.length > 0 ? imgs[0] : "/placeholder.svg"}
            className="w-full h-40 object-cover"
            alt="Garage"
          />
        </div>
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base text-gray-800 line-clamp-1">
              {garageName}
            </h3>
            {typeof rating === "number" && (
              <div className="flex items-center gap-1 text-sm">
                <FaStar className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-700">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-2 line-clamp-1">{address}</p>
          <div className="flex items-center gap-2 mt-2">
            <FaPhone className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-700">{phone || "No phone"}</span>
            <button
              className="ml-auto text-xs text-red-500 hover:underline"
              onClick={onRemove}
              title="Remove from favorites"
            >
              Remove
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteGarageCard;