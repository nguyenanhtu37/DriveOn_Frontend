import { Sidebar } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { SidebarItem } from "./SidebarItem";

export const Dropdown = ({ children, listItem = [] }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className=" w-full flex flex-col gap-y-2">
      <div className="" onClick={toggleDropdown}>
        {children}
      </div>
      <div className=" w-full flex flex-col gap-y-1">
        {isOpen &&
          listItem.map((item, index) => (
            <SidebarItem key={index} title={item.content} link={item.href} />
          ))}
      </div>
    </div>
  );
};
Dropdown.propTypes = {
  children: PropTypes.node,
  listItem: PropTypes.array,
};
