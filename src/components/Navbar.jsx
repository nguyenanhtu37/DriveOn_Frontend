import { AlignJustify, Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link, NavLink } from "react-router-dom";
import { useScrollPosition } from "react-haiku";
import { cn } from "@/lib/utils";

function Navbar() {
  const [scroll] = useScrollPosition();
  console.log(scroll);
  return (
    <div className=" relative w-full flex flex-col items-center  bg-white border-b border-[#DDDDDD]">
      <div className=" relative w-full h-20 px-4 md:px-10 flex justify-between items-center">
        {/* left */}
        <div className=" w-full md:w-1/2 lg:w-1/3 flex justify-center md:justify-start items-center z-30">
          <Link to={"/"} className=" w-full max-w-[180px] h-8 ">
            <img
              src="/public/Screenshot 2025-01-16 232902_preview_rev_1.png"
              className=" w-full h-full object-cover"
            />
          </Link>
        </div>
        {/* center */}
        <div className="hidden md:block w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {/* Component đầu tiên */}
          <div
            className={cn(
              "flex justify-center items-center gap-x-3 transition-all duration-300 ease-in-out",
              scroll.y === 0
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <div className="flex items-center justify-center p-2 rounded-full hover:bg-[#f4f4f4]">
              <NavLink className="text-[#222222] text-md font-medium cursor-pointer">
                Garage
              </NavLink>
            </div>
            <div className="flex items-center justify-center p-2 rounded-full hover:bg-[#f4f4f4]">
              <NavLink className="text-[#6A6A6A] text-md font-medium cursor-pointer">
                Supports
              </NavLink>
            </div>
          </div>

          {/* Component thứ hai */}
          <div
            className={cn(
              " absolute left-[50%] translate-x-[-50%] top-0  py-[13px] px-2 bg-white rounded-full border-[1px] border-[#DDDDDD] transition-all duration-300 ease-in-out",
              scroll.y === 0
                ? "opacity-0 translate-y-4  pointer-events-none"
                : "opacity-100 translate-y-0 pointer-events-auto"
            )}
          >
            <div className="flex justify-center items-center gap-x-4">
              <div className="px-4">
                <span className="text-sm font-archivo font-medium cursor-pointer">
                  Any where
                </span>
              </div>
              <div className="w-[1px] h-6 bg-[#DDDDDD]" />
              <div className="px-4">
                <span className="text-sm font-archivo font-medium cursor-pointer">
                  Any time
                </span>
              </div>
              <div className="w-[1px] h-6 bg-[#DDDDDD]" />
              <div className="px-4">
                <span className="text-sm font-archivo font-medium cursor-pointer">
                  Any where
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className=" hidden w-1/2 lg:w-1/3 md:flex justify-end items-center z-30">
          <div className="flex items-center gap-2">
            <div className=" hidden xl:flex py-[9px] px-3 rounded-full bg-white  items-center gap-2 cursor-pointer hover:bg-[#f4f4f4] hover:shadow-sm transition-all duration-100">
              <Link
                to={"/garageRegistration"}
                className=" text-[#222222] text-sm font-bold"
              >
                Garage Register
              </Link>
            </div>
            <div className=" flex items-center p-3 rounded-full bg-white  cursor-pointer hover:bg-[#f4f4f4] hover:shadow-sm transition-all duration-100 ">
              <Globe size={16} />
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <div className=" py-1 px-2 rounded-full ml-2 border border-[#DDDDDD] flex items-center justify-center gap-[12px] cursor-pointer shadow-sm hover:shadow-md transition-all ease-in-out duration-100">
                <AlignJustify size={16} />
                <img
                  className=" w-[30px] aspect-square rounded-full object-cover"
                  src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[220px] px-0 py-2 "
              align="end"
              sideOffset={12}
            >
              <div className="grid gap-4 bg-white  ">
                <div className=" text-sm w-full px-4 py-[11px] text-[#222222] hover:bg-[#f7f6f6] ease-in-out font-roboto cursor-pointer ">
                  Login
                </div>
                <div className=" text-sm w-full px-3 py-2 text-[#222222] ease-in-out hover:bg-[#f7f6f6] font-roboto cursor-pointer ">
                  Log out
                </div>
                <div className=" text-sm w-full px-3 py-2 text-[#222222] ease-in-out  hover:bg-[#f7f6f6] font-roboto cursor-pointer ">
                  Profile
                </div>
                <div className=" text-sm w-full h-[1px] bg-[#DDDDDD]"></div>
                <div className=" text-sm w-full px-3 py-2 text-[#222222] ease-in-out hover:bg-[#f7f6f6] font-roboto cursor-pointer ">
                  Garage
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div
        className={` hidden md:flex justify-center items-center w-full transition-all ease-in-out duration-300 overflow-hidden ${
          scroll.y === 0 ? "h-[88px]" : "h-0"
        }`}
      >
        <div className="flex w-1/2 justify-center items-center gap-x-4 rounded-full bg-white shadow-md border-[1px]   border-[#DDDDDD]">
          <div className="px-4 py-2 w-1/3 flex flex-col items-start gap-y-[2px] cursor-pointer rounded-full hover:bg-[#f4f4f4]">
            <span className="text-sm font-archivo font-medium ">Location</span>
            <span className="text-sm font-archivo ">Search Location</span>
          </div>
          <div className="w-[1px] h-6 bg-[#DDDDDD]" />
          <div className=" flex-1 flex flex-col px-4 py-2 cursor-pointer rounded-full hover:bg-[#f4f4f4] ">
            <span className="text-sm font-archivo font-medium cursor-pointer">
              Any time
            </span>
            <span className="text-sm font-archivo ">Chooe time</span>
          </div>
          <div className="w-[1px] h-6 bg-[#DDDDDD]" />
          <div className="px-4 py-2 w-1/3 flex flex-col items-start gap-y-[2px] cursor-pointer rounded-full hover:bg-[#f4f4f4]">
            <span className="text-sm font-archivo font-medium ">Location</span>
            <span className="text-sm font-archivo ">Search Location</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
