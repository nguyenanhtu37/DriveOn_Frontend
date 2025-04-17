import { useGetMyGarage } from "@/app/stores/entity/garage";
import { GarageItem } from "@/components/DialogMyGagrage/DialogMyGarage";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export const MyGarage = () => {
  const myGarages = useGetMyGarage();
  if (myGarages.isLoading) {
    return null;
  }
  return (
    <TabsContent className="space-y-6 mt-6" value="myGarage">
      <Card className="flex flex-col gap-y-2 p-6">
        {myGarages.data.length === 0 ? (
          <div className="text-center text-gray-500">No garage registered</div>
        ) : (
          myGarages.data.map((item) => (
            <GarageItem
              key={item._id}
              id={item._id}
              name={item.name}
              address={item.address}
              image={item.interiorImages[0]}
              rating={item.ratingAverage}
            />
          ))
        )}
      </Card>
    </TabsContent>
  );
};
