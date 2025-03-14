import { useState } from "react";
import { useProfile } from "../../../common/hooks/useProfile";
import PersonalProfile from "../../../components/profile/PersonalProfile";
import ChangePassword from "../../../components/profile/ChangePassword";
import { Link } from "react-router-dom";
import { Home, Car, LogOut } from "lucide-react";
import { useAuth } from "../../../common/hooks/useAuth";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { profile, setProfile, loading, updateProfile, refetchProfile, changePassword } = useProfile();
  const { handleLogout } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(profile);
      setIsEditing(false);
      await refetchProfile();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    refetchProfile();
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    await changePassword(oldPassword, newPassword);
  };

  const handleCancelPassword = () => {
    setIsChangingPassword(false);
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-archivo">
      {/* Navigation */}
      <nav className="bg-white shadow-lg p-4 md:p-6 flex justify-between items-center sticky top-0 z-10">
        <div className="text-xl md:text-2xl font-bold text-heading tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            MyProfile
          </span>
        </div>
        <div className="space-x-3 md:space-x-6 flex items-center">
          <Link
            to="/"
            className="text-body hover:text-primary font-medium transition-colors duration-200 flex items-center"
          >
            <Home className="h-4 w-4 md:h-5 md:w-5 mr-1" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            to="/vehicle"
            className="text-body hover:text-primary font-medium transition-colors duration-200 flex items-center"
          >
            <Car className="h-4 w-4 md:h-5 md:w-5 mr-1" />
            <span className="hidden md:inline">My Vehicle</span>
          </Link>
          <button
            onClick={handleLogoutClick}
            className="text-white bg-destructive hover:bg-destructive/90 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all duration-200 shadow-md flex items-center"
          >
            <LogOut className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300">
          <div className="h-32 md:h-40 bg-gradient-to-r from-primary via-primary/80 to-secondary relative">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
          <div className="relative -mt-20 px-4 md:px-8 pb-8">
            <PersonalProfile
              profile={profile}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
            />
            {/* Buttons when not editing */}
            {!isEditing && !isChangingPassword && (
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
                >
                  Change Password
                </button>
              </div>
            )}

            {/* Change Password Component */}
            {isChangingPassword && (
              <div className="mt-6">
                <ChangePassword
                  onChangePassword={handleChangePassword}
                  onCancel={handleCancelPassword}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p className="text-sm">© {new Date().getFullYear()} MyProfile. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
