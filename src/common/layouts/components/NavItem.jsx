import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ ...props }) => {
  return (
    <NavLink {...props}>
      {({ isActive }) => (
        <div
          className={` flex items-center gap-x-1 px-4 py-2 text-muted-foreground rounded-full bg-transparent hover:bg-box-hover transition-all duration-100 cursor-pointer z-10 ${
            isActive ? "bg-white text-primary" : ""
          }`}
        >
          {props.children}
        </div>
      )}
    </NavLink>
  );
};

export default NavItem;
