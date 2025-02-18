import React from "react";
import { Avatar } from "./Avatar";
import { Car, ChartPieIcon, ChevronRight, File } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { Title } from "./Title";
import { Dropdown } from "./Dropdown";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

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

export const SidebarLeft = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <div className=" p-5 w-full h-full flex  flex-col gap-y-4  bg-white border-r-[1px] border-black/40 ">
          <Avatar
            name="NgocTam"
            image="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <div className=" flex flex-col w-full gap-y-7 ">
            {/* <div className=" flex flex-col gap-y-2">
              <Title title="Dashboards" />
              <div className=" flex flex-col gap-y-1">
                <SidebarItem
                  icon={<ChartPieIcon />}
                  title="Overview"
                  link="overview"
                />
                <Dropdown listItem={dropdownList}>
                  <SidebarItem
                    isActive
                    icon={<ChartPieIcon />}
                    title="Overview"
                    link=""
                  />
                </Dropdown>
                <SidebarItem icon={<ChartPieIcon />} title="Garage" />
              </div>
            </div> */}

            <div className=" flex flex-col gap-y-2">
              <Title title="Garages" />
              <div className=" flex flex-col gap-y-2">
                <SidebarItem
                  icon={<File />}
                  title="Register Garage"
                  link={"viewRegisterGarage"}
                />
                <SidebarItem
                  icon={<Car />}
                  title="Exits Garage"
                  link={"viewExitsGarage"}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
