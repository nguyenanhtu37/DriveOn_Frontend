import { useUserStore } from "@/app/stores/view/user";
import { useAuth } from "@/common/hooks/useAuth";
import { DialogMyGarage } from "@/components/DialogMyGagrage/DialogMyGarage";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AbsoluteScreenPath } from "@/constants/screen";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { handleLogout, isLoading, isLoggedIn } = useAuth();
  const { user } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);

  const onLogout = async () => {
    await handleLogout();
  };
  return (
    <header className="sticky top-0 z-50 ">
      <div className="relative w-full flex flex-col items-center bg-white border-b border-[#DDDDDD]">
        <div className="relative w-full h-16 xl:h-20 px-4 md:px-10 flex justify-between items-center transition-all duration-100 ease-in-out">
          {/* Left */}
          <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center md:justify-start items-center z-30">
            <Link to={"/garages"} className="w-full max-w-[180px] h-8">
              <img
                src="/Screenshot 2025-01-16 232902_preview_rev_1.png"
                className="w-full h-full object-cover"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Center */}
          <div className="hidden xl:flex w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center items-center"></div>

          {/* Right */}
          <div className="hidden w-1/2 lg:w-1/3 md:flex justify-end items-center z-30">
            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={AbsoluteScreenPath.Login}
                    className="py-[9px] px-3 rounded-full bg-white text-[#222222] text-sm font-medium hover:bg-[#f4f4f4] hover:shadow-sm transition-all duration-100"
                  >
                    Login
                  </Link>
                  <Link
                    to={AbsoluteScreenPath.SignUp}
                    className="py-[9px] px-3 rounded-full bg-white text-[#222222] text-sm font-medium hover:bg-[#f4f4f4] hover:shadow-sm transition-all duration-100"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="py-1 px-2 rounded-full ml-2 border border-[#DDDDDD] flex items-center justify-center gap-[12px] cursor-pointer shadow-sm hover:shadow-md transition-all ease-in-out duration-100">
                      <div className="flex justify-center items-center">
                        <AlignJustify size={16} />
                      </div>
                      <img
                        className="w-[30px] aspect-square rounded-full object-cover"
                        src={user?.avatar ?? "/placeholder.svg"}
                        alt="User Avatar"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[220px] px-0 py-2"
                    align="end"
                    sideOffset={12}
                  >
                    <div className="grid gap-1s bg-white">
                      <Link
                        to={AbsoluteScreenPath.ProfilePage}
                        className="text-sm w-full px-4 py-[11px] text-[#222222] hover:bg-[#f7f6f6] ease-in-out font-roboto cursor-pointer"
                      >
                        Profile
                      </Link>
                      <Link
                        to={AbsoluteScreenPath.FavoriteGarages}
                        className="text-sm w-full px-4 py-[11px] text-[#222222] hover:bg-[#f7f6f6] ease-in-out font-roboto cursor-pointer"
                      >
                        Favorite Garages
                      </Link>
                      <button
                        className="text-sm w-full px-3 py-2 text-[#222222] ease-in-out hover:bg-[#f7f6f6] font-roboto cursor-pointer text-left disabled:opacity-50"
                        onClick={onLogout}
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging out..." : "Logout"}
                      </button>
                      <div className="text-sm w-full h-[1px] bg-[#DDDDDD]" />

                      <Button
                        className="text-sm w-full rounded-none px-4 py-[11px] text-red-400 hover:bg-[#f7f6f6] hover:text-red-500 ease-in-out font-roboto cursor-pointer"
                        variant="ghost"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        My Garages
                      </Button>
                      <DialogMyGarage open={isOpen} onOpenChange={setIsOpen} />
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
