import React from "react";
import PropTypes from "prop-types";

export default function ButtonIcon({ img, isActive, name, ...props }) {
  return (
    <div
      className={`mt-3 mb-[10px] py-1 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-b border-zinc-400 group ${
        isActive === true ? "text-black border-b border-black" : ""
      }`}
      {...props}
    >
      <img
        src={
          img ??
          "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        className="w-6 h-6 object-cover"
      />
      <span className="text-sm text-zinc-400 group-hover:text-black text-center text-nowrap">
        {name}
      </span>
    </div>
  );
}

// Định nghĩa kiểu dữ liệu của props
ButtonIcon.propTypes = {
  img: PropTypes.string,
  isActive: PropTypes.bool,
  name: PropTypes.string,
};
