import { cn } from "@/lib/utils";
import { Badge } from "react-daisyui";

export const ServiceItem = ({
  img,
  serviceName,
  price,
  description,
  wrranty,
  variant = "left-image",
}) => {
  const isLeftImage = variant === "left-image";
  return (
    <div className="w-full flex flex-col sm:flex-row rounded-lg bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div
        className={cn(
          "sm:w-[55%] relative",
          "order-1",
          !isLeftImage && "sm:order-2"
        )}
      >
        <img
          src={img || "/placeholder.svg?height=300&width=500"}
          alt={serviceName || "Service"}
          width={500}
          height={300}
          className="w-full h-[200px] sm:h-[250px] object-cover"
        />
      </div>
      <div
        className={cn(
          "sm:w-[45%] p-4 flex flex-col justify-between",
          "order-2",
          !isLeftImage && "sm:order-1"
        )}
      >
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {serviceName}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            Description: {description}
          </p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            Warranty: {wrranty}
          </p>
        </div>
        <div className="mt-auto">
          <p className="text-xl font-bold text-primary">Price: {price}</p>
        </div>
      </div>
    </div>
  );
};
