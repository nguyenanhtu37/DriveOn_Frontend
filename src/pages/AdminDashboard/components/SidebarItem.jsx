import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const SidebarItem = ({ isActive, icon, title, link, props }) => {
  return (
    <Link aschild to={link}>
      <div
        className={cn(
          " relative w-full h-9 rounded-md px-2 flex gap-x-1 items-center cursor-pointer group ",
          isActive &&
            "bg-[#1C1C1C] bg-opacity-5 before:w-1 before:h-4 before:bg-[#1C1C1C] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:rounded-md"
        )}
        {...props}
      >
        <div className=" w-4 h-4">
          {link === undefined && (
            <ChevronRight size={16} color="#1C1C1C" className=" opacity-20" />
          )}
        </div>
        <div className=" flex items-center justify-start gap-x-2">
          <div className=" w-4 h-4">
            {icon && (
              <icon.type
                size={16}
                color="#1C1C1C"
                className=" group-hover:opacity-20"
              />
            )}
          </div>
          <span className=" text-sm text-start text-black group-hover:opacity-20 ">
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
};

SidebarItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  props: PropTypes.object,
};
