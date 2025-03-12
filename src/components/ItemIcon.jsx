import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

function ItemIcon(props) {
  const { image, isActive, title } = props;
  return (
    <div className=" flex flex-col items-center justify-center cursor-pointer group ">
      <div className="flex flex-col items-center justify-center  gap-y-2 ">
        <img
          className=" size-10 rounded-full right-1 object-cover"
          src={image}
        />
        <span
          className={cn(
            " text-sm text-[#717171] text-nowrap group-hover:text-[#222222] max-w-[80px] line-clamp-1 group ",
            isActive && "text-[#222222]"
          )}
        >
          <span className="block w-max group-hover:animate-[marquee_3s_linear_infinite]">
            {title}
          </span>
        </span>
      </div>
      <hr
        className={cn(
          " w-full h-[2px] group-hover:bg-[#DDDDDD] border-none rounded-full  transition-all ease-in-out origin-center",
          isActive && "bg-[#222222]"
        )}
      />
    </div>
  );
}
ItemIcon.propTypes = {
  imgage: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  title: PropTypes.string,
};

export default ItemIcon;
