import useFavorites from "@/common/hooks/useFavorites";
import FavoriteGarageCard from "./FavouriteCard";
import { Loader2, Heart } from "lucide-react";
import { useUserStore } from "@/app/stores/view/user";
import NavbarMobile from "@/components/NavbarMobile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/common/layouts/components/Navbar";

const FavoriteGarages = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const userId = user?._id;

  const { favorites, loading, error, removeFromFavorites } =
    useFavorites(userId);

  // Đảm bảo dữ liệu garage hợp lệ, tránh lỗi khi thiếu trường
  const safeFavorites = Array.isArray(favorites)
    ? favorites.filter(
        (garage) => garage && garage._id && garage.name && garage.address
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto py-8 px-2 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2" />
          Back
        </Button>
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center">
            Your Favorite Garages
          </h2>
        </div>
        {loading && (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Loading your favorites...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-xl font-semibold text-red-600">Oops!</p>
            <p className="mt-2 text-lg text-gray-700">Error: {error}</p>
            <p className="mt-2 text-sm text-gray-500">
              Please try refreshing the page or check back later.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            {safeFavorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  No Favorite Garages Yet
                </p>
                <p className="mt-2 text-gray-500">
                  Add some garages to your favorites to see them here!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {safeFavorites.map((garage) => (
                  <FavoriteGarageCard
                    key={garage._id}
                    id={garage._id}
                    garageName={garage.name}
                    address={garage.address}
                    phone={garage.phone}
                    imgs={
                      Array.isArray(garage.interiorImages)
                        ? garage.interiorImages
                        : []
                    }
                    rating={garage.ratingAverage || garage.rating || 0}
                    isFavorited={true}
                    onRemove={() => removeFromFavorites(garage._id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <NavbarMobile />
    </div>
  );
};

export default FavoriteGarages;
