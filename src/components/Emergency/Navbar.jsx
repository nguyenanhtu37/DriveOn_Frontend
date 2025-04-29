import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/common/hooks/useAuth";
import { useEffect, useState } from "react";
import { AbsoluteScreenPath } from "@/constants/screen";
import { useUserStore } from "@/app/stores/view/user";

function NavbarEmergency() {
  const { handleLogout, isLoading, error, isLoggedIn } = useAuth();
  const [logoutError, setLogoutError] = useState(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (error) {
      setLogoutError(error);
      const timer = setTimeout(() => setLogoutError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onLogout = async () => {
    await handleLogout();
  };

  return (
    <div className="relative w-full flex flex-col items-center bg-white border-b border-[#DDDDDD]">
      <div className="relative w-full h-20 px-4 md:px-10 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center md:justify-start items-center z-30">
          <Link
            to={AbsoluteScreenPath.Entry}
            className="w-full max-w-[180px] h-8"
          >
            <img
              src="/Screenshot 2025-01-16 232902_preview_rev_1.png"
              className="w-full h-full object-cover"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Center: Only Emergency */}
        <div className="hidden md:block w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex justify-center items-center gap-x-3">
            <span className="text-xl font-bold text-red-600 px-4 py-2 bg-transparent">
              Emergency
            </span>
          </div>
        </div>
        {/* Right: Auth & Language */}
        <div className="hidden w-1/2 lg:w-1/3 md:flex justify-end items-center z-30">
          <div className="flex items-center gap-2">
            <div className="flex items-center p-3 rounded-full bg-white cursor-pointer hover:bg-[#f4f4f4] hover:shadow-sm transition-all duration-100">
              <Globe size={16} />
            </div>
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
              <div className="py-1 px-2 rounded-full ml-2 border border-[#DDDDDD] flex items-center justify-center gap-[12px] cursor-pointer shadow-sm hover:shadow-md transition-all ease-in-out duration-100">
                <img
                  className="w-[30px] aspect-square rounded-full object-cover"
                  src={user.avatar ?? "/placeholder.svg"}
                  alt="User Avatar"
                />
                <button
                  className="text-sm px-2 py-1 text-[#222222] hover:bg-[#f7f6f6] rounded font-roboto"
                  onClick={onLogout}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng xuất..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {logoutError && (
        <div className="absolute top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-md z-50">
          <p className="text-sm">{logoutError}</p>
        </div>
      )}
    </div>
  );
}

export default NavbarEmergency;