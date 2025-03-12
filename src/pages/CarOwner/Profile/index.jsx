import { useState } from 'react';
import { useProfile } from '../../../common/hooks/useProfile';
import PersonalProfile from '../../../components/profile/PersonalProfile';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { 
    profile, 
    loading, 
    error, 
    updateProfile, 
    refetchProfile 
  } = useProfile();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      setIsEditing(false);
      refetchProfile(); // Refresh profile after save
    } catch {
      // Error handled by useProfile hook
    }
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    refetchProfile(); // Reset to original data
  };

  const handleChangePassword = () => {
    // Implement navigation or modal for password change
    alert("Change Password functionality to be implemented");
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">MyProfile</div>
        <div className="space-x-4">
          <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
          <a href="/vehicle" className="text-gray-600 hover:text-gray-800">My Vehicle</a>
          <a href="/logout" className="text-gray-600 hover:text-gray-800">Logout</a>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4 pt-8">
        <PersonalProfile 
          profile={{
            ...profile,
            username: profile.email?.split('@')[0] || 'username',
            memberSince: profile.createdAt || 'January 2023',
            vehicles: profile.vehicles || 2,
            services: profile.services || '$5',
          }}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onEdit={handleEditToggle}
          onCancel={handleCancel}
          onChangePassword={handleChangePassword}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProfilePage;