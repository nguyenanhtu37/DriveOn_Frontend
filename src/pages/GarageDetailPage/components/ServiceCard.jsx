import { useSetDialogId } from "@/app/stores/view/dialog";
import { formatCurrency } from "@/utils";

const ServiceCard = ({ service }) => {
  const setDialogId = useSetDialogId();

  const handleClick = () => {
    setDialogId({ id: "ServiceDetail", data: service });
  };

  return (
    <div
      className=" w-full px-6 py-4 rounded-xl bg-white cursor-pointer hover:shadow-xl transition-shadow ease-in-out duration-100 flex justify-start items-start gap-x-4 border border-1 border-[#e5e5e5] hover:shadow-block"
      onClick={handleClick}
    >
      <div className=" w-[100px] h-full rounded-xl overflow-hidden">
        <img
          src={service.images[0]}
          alt={service.name}
          className="size-full object-cover"
        />
      </div>
      <div className=" flex-1 flex flex-col ">
        <p className=" text-md text-black font-semibold mb-[6px]">
          {service.name}
        </p>
        <p className=" text-sm text-[#3c3c43] line-clamp-2 mb-1">
          {service.description}
        </p>
        <p className="text-sm ">
          <span className=" text-[#3c3c43] font-semibold mb-1">Duration:</span>{" "}
          {service.duration} minutes
        </p>
        <p className="text-sm ">
          <span className=" text-[#3c3c43] font-semibold">Price:</span>{" "}
          {formatCurrency(service.price)}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
