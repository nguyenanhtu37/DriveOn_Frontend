import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useGetMyGarage } from "@/app/stores/entity/garage";
import { Link } from "react-router-dom";

const GarageItem = ({ id, name, address, image }) => (
  <Link asChild to={`/garageManagement/${id}`}>
    <div className="w-full flex gap-x-3 items-center justify-start p-3 rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700">
      <img
        src={image}
        alt={`${name} interior`}
        className="w-[50px] h-[50px] rounded-full bg-[#DDDDDD]"
      />
      <div className="flex flex-col gap-y-1">
        <span className="text-sm font-archivo font-medium cursor-pointer text-[#222222]">
          {name}
        </span>
        <span className="text-sm font-archivo font-normal cursor-pointer text-[#6A6A6A]">
          {address}
        </span>
      </div>
    </div>
  </Link>
);

const DialogMyGarage = () => {
  const myGarage = useGetMyGarage();

  if (myGarage.isLoading || !myGarage?.data?.length) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-sm w-full px-3 py-2 text-[#222222] ease-in-out hover:bg-[#f7f6f6] font-roboto cursor-pointer">
          Garage
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[600px] overflow-y-auto px-3">
        <DialogTitle>My garages</DialogTitle>
        <div className="w-full flex flex-col gap-y-5 mt-2">
          {myGarage.data.map((item) => (
            <GarageItem
              key={item._id}
              id={item._id}
              name={item.name}
              address={item.address}
              image={item.interiorImages[0]}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { DialogMyGarage };
