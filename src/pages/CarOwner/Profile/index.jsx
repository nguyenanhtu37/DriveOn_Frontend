import { useState } from "react";
import { useProfile } from "../../../common/hooks/useProfile";
import PersonalProfile from "../../../components/profile/PersonalProfile";
import { Link } from "react-router-dom";
import { Home, Car, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, setProfile, loading, error, updateProfile, refetchProfile, changePassword } = useProfile();

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

  if (loading && !profile.name)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-primary text-lg flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading profile...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-destructive text-lg bg-destructive/10 p-4 rounded-lg shadow-md">{error}</div>
      </div>
    );

  const displayProfile = {
    ...profile,
    username: profile.email?.split("@")[0] || "username",
    memberSince: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Not set",
    vehicles: profile.vehicles || 2
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
          <Link
            to="/logout"
            className="text-white bg-destructive hover:bg-destructive/90 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all duration-200 shadow-md flex items-center"
          >
            <LogOut className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Logout</span>
          </Link>
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
              profile={displayProfile}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onEdit={handleEditToggle}
              onCancel={handleCancel}
              onChangePassword={handleChangePassword}
              loading={loading}
            />
            {!isEditing && (
              <div className="mt-8 text-center">
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
