import useFavorites from "@/common/hooks/useFavorites";
import { GarageCard } from "@/components/Card";
import { Loader2, Heart } from "lucide-react";
import { useUserStore } from "@/app/stores/view/user";

const FavoriteGarages = () => {
  const user = useUserStore((state) => state.user);
  const userId = user?._id;

  const { favorites, loading, error, removeFromFavorites } = useFavorites(userId);

  console.log("Favorites:", favorites); // Debug

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Your Favorite Garages
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Manage your favorite garages with ease.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            {favorites.length === 0 ? (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((garage) => (
                  <GarageCard
                    key={garage._id}
                    id={garage._id}
                    garageName={garage.name}
                    rating={garage.ratingAverage}
                    address={garage.address}
                    openTime={garage.openTime}
                    closeTime={garage.closeTime}
                    imgs={Array.isArray(garage.imgs) ? garage.imgs : []}
                    isFavorited={true}
                    onRemove={() => removeFromFavorites(garage._id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteGarages;