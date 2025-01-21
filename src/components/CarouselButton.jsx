import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

function CarouselButton(props) {
  const { type } = props;
  return (
    <div
      className={cn(
        " w-8 h-8 rounded-full bg-white shadow-md flex justify-center items-center border border-cyan-50 cursor-pointer hover:shadow-sm transition-all duration-100 hover:-translate-y-1"
      )}
      {...props}
    >
      {type === "prev" && <ChevronLeft size={12} />}
      {type === "next" && <ChevronRight size={12} />}
    </div>
  );
}
CarouselButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CarouselButton;
