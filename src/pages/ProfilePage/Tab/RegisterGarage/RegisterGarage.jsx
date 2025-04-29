import { TabsContent } from "@/components/ui/tabs";
import { Garage } from "./Garage";
import { useGetRegisterGarageCarOwner } from "@/app/stores/entity/garage";

export const RegisterGarage = () => {
  const garages = useGetRegisterGarageCarOwner();
  return (
    <TabsContent className="space-y-6 mt-6" value="register-garage">
      {garages.data.length === 0 ? (
        <div className="text-center text-gray-500">No garage registered</div>
      ) : (
        garages.data.map((garage) => {
          return <Garage key={garage._id} garageData={garage} />;
        })
      )}
    </TabsContent>
  );
};
