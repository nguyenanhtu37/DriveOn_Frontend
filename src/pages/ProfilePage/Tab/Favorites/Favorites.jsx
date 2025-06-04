import { Heart, Trash2, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useGetMyFavorites, useRemoveFromFavorites } from "@/app/stores/entity/favoriteV2";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DeleteFavoriteGarageModal from "@/components/vehicle/DeleteFavoriteGarageModal";

export const Favorites = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const myFavorites = useGetMyFavorites();
  const removeFavorite = useRemoveFromFavorites();
  const [garageToDelete, setGarageToDelete] = useState(null);

  const handleRemoveFavorite = (garageId) => {
    removeFavorite.mutate(garageId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["myFavorites"]);
        toast({
          title: "Success",
          description: "Garage removed from favorites",
        });
        setGarageToDelete(null);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to remove garage from favorites",
          variant: "destructive",
        });
        setGarageToDelete(null);
      },
    });
  };

  if (myFavorites.isLoading) {
    return (
      <TabsContent value="favorites" className="space-y-6 mt-6">
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-red-500" />
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading your favorites...
          </p>
        </div>
      </TabsContent>
    );
  }

  if (myFavorites.isError) {
    return (
      <TabsContent value="favorites" className="space-y-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-xl font-semibold text-red-600">Oops!</p>
          <p className="mt-2 text-lg text-gray-700">Error loading favorites</p>
          <p className="mt-2 text-sm text-gray-500">
            Please try refreshing the page or check back later.
          </p>
        </div>
      </TabsContent>
    );
  }

  const safeFavorites = Array.isArray(myFavorites.data)
    ? myFavorites.data.filter(
        (garage) => garage && garage._id && garage.name && garage.address
      )
    : [];

  return (
    <TabsContent value="favorites" className="space-y-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900">My Favorites</h2>

      {safeFavorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Heart className="h-12 w-12 text-gray-400 mx-auto" />
          <p className="mt-4 text-xl font-semibold text-gray-700">
            No Favorite Garages Yet
          </p>
          <p className="mt-2 text-gray-500">
            Add some garages to your favorites to see them here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {safeFavorites.map((garage) => (
            <Card
              key={garage._id}
              className="w-full h-full mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-md rounded-lg border border-gray-200 cursor-pointer"
              onClick={() => navigate(`/garageDetail/${garage._id}`)}
            >
              <CardContent className="p-0">
                <div className="relative rounded-t-lg overflow-hidden">
                  <img
                    src={
                      garage.interiorImages && garage.interiorImages.length > 0
                        ? garage.interiorImages[0]
                        : "/placeholder.svg"
                    }
                    className="w-full h-40 object-cover"
                    alt="Garage"
                  />
                </div>
                <div className="px-4 py-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-base text-gray-800 line-clamp-1">
                      {garage.name}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setGarageToDelete(garage);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{garage.address}</span>
                    </div>
                    {garage.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="h-4 w-4" />
                        <span>{garage.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {garageToDelete && (
        <DeleteFavoriteGarageModal
          garage={garageToDelete}
          onConfirm={() => handleRemoveFavorite(garageToDelete._id)}
          onCancel={() => setGarageToDelete(null)}
        />
      )}
    </TabsContent>
  );
}; 