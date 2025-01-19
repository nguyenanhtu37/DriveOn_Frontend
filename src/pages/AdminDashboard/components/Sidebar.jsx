import React from "react";
import { Avatar } from "./Avatar";
import { ChartPieIcon, ChevronRight } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { Title } from "./Title";
import { Dropdown } from "./Dropdown";

const dropdownList = [
  {
    content: "Overview",
    href: "/overview",
  },
  {
    content: "Garage",
    href: "/garage",
  },
];

export const Sidebar = () => {
  return (
    <div className=" p-5 w-[212px] h-screen flex  flex-col gap-y-4  bg-white">
      <Avatar
        name="NgocTam"
        image="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <div className=" flex flex-col w-full gap-y-7 ">
        <div className=" flex flex-col gap-y-2">
          <Title title="Dashboards" />
          <div className=" flex flex-col gap-y-1">
            <SidebarItem icon={<ChartPieIcon />} title="Overview" />
            <Dropdown listItem={dropdownList}>
              <SidebarItem isActive icon={<ChartPieIcon />} title="Overview" />
            </Dropdown>
            <SidebarItem icon={<ChartPieIcon />} title="Garage" />
          </div>
        </div>
        <div className=" flex flex-col gap-y-2">
          <Title title="Pages" />
          <div className=" flex flex-col gap-y-1">
            <SidebarItem icon={<ChartPieIcon />} title="Overview" />
            <Dropdown listItem={dropdownList}>
              <SidebarItem isActive icon={<ChartPieIcon />} title="Overview" />
            </Dropdown>
            <SidebarItem icon={<ChartPieIcon />} title="Garage" />
          </div>
        </div>
        <div className=" flex flex-col gap-y-2">
          <Title title="Dashboards" />
          <div className=" flex flex-col gap-y-1">
            <SidebarItem icon={<ChartPieIcon />} title="Overview" />
            <Dropdown listItem={dropdownList}>
              <SidebarItem isActive icon={<ChartPieIcon />} title="Overview" />
            </Dropdown>
            <SidebarItem icon={<ChartPieIcon />} title="Garage" />
          </div>
        </div>
      </div>
    </div>
  );
};
