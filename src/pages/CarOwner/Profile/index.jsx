import { useState } from "react";
import { useProfile } from "../../../common/hooks/useProfile";
import PersonalProfile from "../../../components/profile/PersonalProfile";
import ChangePassword from "../../../components/profile/ChangePassword";
import { Link } from "react-router-dom";
import { Home, Car, LogOut, User, Menu, X } from "lucide-react";
import { useAuth } from "../../../common/hooks/useAuth";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [setIsChangingPassword] = useState(false); // Fixed typo
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile, setProfile, loading, updateProfile, refetchProfile, changePassword } = useProfile();
  const { handleLogout } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (updatedProfile) => {
    try {
      await updateProfile(updatedProfile);
      setIsEditing(false);
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

  const handleChangePasswordSubmit = async (oldPassword, newPassword) => {
    await changePassword(oldPassword, newPassword);
    setIsChangingPassword(false);
    setActiveTab("profile");
  };

  const handleCancelPassword = () => {
    setIsChangingPassword(false);
    setActiveTab("profile");
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen font-sans relative">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed z-0"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
      ></div>
      <div className="relative z-10 min-h-screen bg-white/90">
        {/* Top Navigation */}
        <header className="bg-white/95 shadow-md backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-2 text-xl font-bold text-blue-600">MyProfile</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 flex items-center"
                >
                  <Home className="h-4 w-4 mr-1" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/vehicle"
                  className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 flex items-center"
                >
                  <Car className="h-4 w-4 mr-1" />
                  <span>Vehicles</span>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="ml-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Logout</span>
                </button>
              </nav>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                >
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    <span>Home</span>
                  </div>
                </Link>
                <Link
                  to="/vehicle"
                  className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                >
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-2" />
                    <span>Vehicles</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left block px-3 py-2 rounded-md text-red-500 hover:bg-red-50"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white/95 rounded-lg shadow overflow-hidden backdrop-blur-sm">
              <div className="px-4 py-5 sm:p-6">
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`${
                        activeTab === "profile"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("security");
                        setIsChangingPassword(true);
                      }}
                      className={`${
                        activeTab === "security"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Security
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "profile" && (
                  <div>
                    <PersonalProfile
                      profile={profile}
                      isEditing={isEditing}
                      onInputChange={handleInputChange}
                      onSubmit={handleSubmit}
                      onCancel={handleCancel}
                      loading={loading}
                    />
                    {!isEditing && (
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={handleEditToggle}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Edit Profile
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "security" && (
                  <ChangePassword
                    onChangePassword={handleChangePasswordSubmit}
                    onCancel={handleCancelPassword}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/95 border-t border-gray-200 mt-12 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} MyProfile. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfilePage;