import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { useGetMyGarage } from "@/app/stores/entity/garage";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

export const GarageItem = ({ id, name, address, image, rating, isPro }) => (
  <Link to={`/garageManagement/${id}`}>
    <div className="relative w-full p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="flex items-start gap-4">
        {/* Image with gradient overlay */}
        <div className="relative min-w-[80px] h-[80px] rounded-lg overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={`${name} interior`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                {rating}
              </span>
            </div>
          </div>

          {/* Address with icon */}
          <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs">{address}</span>
          </div>
        </div>
      </div>
      {isPro && (
        <div className="absolute top-2 left-2 z-50">
          <Badge className="bg-red-500 text-white border-none px-2 py-1 text-xs font-medium">
            PRO
          </Badge>
        </div>
      )}
    </div>
  </Link>
);

const DialogMyGarage = ({ open, onOpenChange }) => {
  const myGarage = useGetMyGarage();

  if (myGarage.isLoading) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-auto px-3">
        <DialogTitle>My garages</DialogTitle>
        <div className="w-full flex flex-col gap-y-5 mt-2">
          {myGarage.data && myGarage.data.length > 0 ? (
            myGarage.data.map((item) => (
              <GarageItem
                key={item._id}
                id={item._id}
                name={item.name}
                address={item.address}
                image={item.interiorImages[0]}
                rating={item.ratingAverage}
                isPro={item.tag === "pro"}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              You don't have any garages yet.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { DialogMyGarage };