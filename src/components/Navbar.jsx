import { AlignJustify, Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" w-full h-20 px-4 md:px-10 flex justify-between items-center bg-white border-b border-[#DDDDDD]">
      <div className=" w-full md:w-1/2 lg:w-1/3 flex justify-center md:justify-start items-center">
        <Link to={"/d"} className=" w-full max-w-[180px] h-8 ">
          <img
            src="/public/Screenshot 2025-01-16 232902_preview_rev_1.png"
            className=" w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className=" hidden w-1/2 lg:w-1/3 md:flex justify-end items-center">
        <div className="flex items-center gap-2">
          <div className=" py-[9px] px-3 rounded-full bg-white flex items-center gap-2 cursor-pointer hover:bg-[#f4f4f4] hover:shadow-sm transition-all duration-100">
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
  );
}

export default Navbar;
