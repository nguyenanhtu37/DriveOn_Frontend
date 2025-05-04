import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useGetServiceDetailByKeyword } from "@/app/stores/entity/service-detail";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "react-haiku";
import { useUserStore } from "@/app/stores/view/user";

const ServiceItem = ({ service, setClose }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setClose();
    navigate(`/garageDetail/${service.garage._id}`);
  };
  return (
    <div
      className=" w-full h-[80px] rounded-lg border bg-white hover:bg-[#eeeeee] transition-all duration-100 ease-in-out flex items-center overflow-hidden"
      onClick={handleClick}
    >
      <div className=" w-full h-full flex gap-x-2 items-start">
        <div className=" h-full w-1/4 rounded-lg">
          <img
            src={service.images[0]}
            className="size-full object-cover"
            alt=""
          />
        </div>
        <div className=" flex-1 flex flex-col items-start py-1">
          <div className="text-xs font-semibold text-[#222222] line-clamp-1">
            {service.name}
          </div>
          <div className="text-xs text-[#222222] line-clamp-1">
            🛠️Garage:{" "}
            <span className="font-semibold">{service.garage.name}</span>
          </div>
          <div className="text-xs text-[#222222] line-clamp-2 ">
            📌Address: {service.garage.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SearchServicesByKeyword = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [nearbyServices, setNearByServices] = useState([]);
  const [farServices, setFarServices] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const search = useGetServiceDetailByKeyword();
  const location = useUserStore((state) => state.location);

  const ref = useRef(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
    setShowResults(false);
  });

  const handleClick = () => {
    if (keyword.length > 0) {
      handleSearch();
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim() === "") return;
    search.mutate(
      { keyword, location },
      {
        onSuccess: (data) => {
          setNearByServices(data.nearbyServices);
          setFarServices(data.farServices);
          setShowResults(true);
        },
      }
    );
  };

  useEffect(() => {
    if (!isOpen) {
      setShowResults(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && showResults) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, showResults]);

  return (
    <div
      ref={ref}
      className={twMerge(
        "relative p-2 rounded-full  flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md hover:border hover:border-[#DDDDDD] transition-all ease-in-out duration-100",
        isOpen
          ? " border border-[#DDDDDD] bg-white hover:shadow-none"
          : "border-none bg-transparent"
      )}
    >
      <input
        className={twMerge(
          "px-2  border-none shadow-none outline-none focus-visible:ring-0 focus-visible:outline-none placeholder:text-xs placeholder:text-[#898989] flex-1 bg-transparent text-xs origin-right transition-all duration-100 ease-in-out",
          isOpen ? "w-[250px]" : "w-0 p-0"
        )}
        placeholder="Search service..."
        value={keyword}
        onChange={handleKeywordChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          } else if (e.key === "Escape") {
            setShowResults(false);
          }
        }}
        {...props}
      />
      <div className="flex items-center rounded-full p-1" onClick={handleClick}>
        <Search size={16} />
      </div>

      {showResults && (
        <div className="absolute right-0 top-full w-full max-w-[450px] rounded-xl bg-white mt-2 p-4 shadow-md z-50 border ">
          <div className="max-h-[300px] overflow-y-auto">
            {!search.isPending ? (
              <div className="flex flex-col gap-y-3 w-full">
                <span className="text-xs font-semibold text-[#222222]">
                  Nearby Services (5km)
                </span>
                {nearbyServices.length > 0 ? (
                  nearbyServices.map((service) => (
                    <ServiceItem
                      key={service._id}
                      service={service}
                      setClose={() => setShowResults(false)}
                    />
                  ))
                ) : (
                  <div className="p-2 text-xs text-center text-gray-500">
                    No results found
                  </div>
                )}
                {farServices.length > 0 && (
                  <>
                    <div className="w-full h-px bg-[#cfcfcf] rounded-full my-4" />
                    <span className="text-xs font-semibold text-[#222222] ">
                      Far Services (5km+)
                    </span>
                    {farServices.map((service) => (
                      <ServiceItem
                        key={service._id}
                        service={service}
                        setClose={() => setShowResults(false)}
                      />
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className=" w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full size-5 border-t-4 border-b-4 border-red-500"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
