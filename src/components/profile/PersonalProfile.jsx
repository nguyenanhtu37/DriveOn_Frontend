import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'; // Added useEffect for debugging

const PersonalProfile = ({
  profile,
  isEditing,
  onInputChange,
  onSubmit,
  onEdit,
  onCancel,
  loading,
  onChangePassword,
}) => {
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || '');
  const [about, setAbout] = useState(profile.about || '');

  // Debug avatar source
  useEffect(() => {
    console.log('Profile Avatar:', profile.avatar); // Debug the avatar URL
    console.log('Avatar Preview:', avatarPreview); // Debug the preview state
    if (!avatarPreview && !profile.avatar) {
      setAvatarPreview('https://via.placeholder.com/120?text=Upload+Photo'); // Ensure fallback
    }
  }, [profile.avatar, avatarPreview]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        onInputChange({ target: { name: 'avatar', value: file } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
    onInputChange({ target: { name: 'about', value: e.target.value } });
  };

  return (
    <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Gradient Header */}
      <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>

      {/* Avatar Section */}
      <div className="relative flex justify-center -mt-16 z-10">
        <div className="relative w-32 h-32">
          <img
            src={avatarPreview || 'https://via.placeholder.com/120?text=Upload+Photo'}
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => {
              // Fallback if the image fails to load
              e.target.src = 'https://via.placeholder.com/120?text=Upload+Photo';
            }}
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{profile.name}</h2>
        <p className="text-gray-500 mb-6">@{profile.username || 'username'}</p>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Personal Details */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email || ''}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{profile.email || 'Not set'}</p>
              )}
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone || ''}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{profile.phone || 'Not set'}</p>
              )}
            </div>
            <button
              onClick={onChangePassword}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Change Password
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 mt-2"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Right Column - Location and Membership */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Location</p>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profile.address || ''}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{profile.address || 'Not set'}</p>
              )}
            </div>
            <div>
              <p className="text-gray-600">Member Since</p>
              <p className="text-gray-800">{profile.memberSince || 'Not set'}</p>
            </div>
            {!isEditing && (
              <button
                onClick={onEdit}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* About Me Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">About Me</h3>
          {isEditing ? (
            <textarea
              name="about"
              value={about}
              onChange={handleAboutChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            />
          ) : (
            <p className="text-gray-600">{about || 'No information provided'}</p>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-6 flex justify-around text-center text-gray-700">
          <div>
            <p className="text-2xl font-bold">{profile.vehicles || 0}</p>
            <p className="text-sm">Vehicles</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{profile.services || '$5'}</p>
            <p className="text-sm">Services</p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6">
            <button
              type="submit"
              onClick={onSubmit}
              disabled={loading}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

PersonalProfile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    avatar: PropTypes.string,
    memberSince: PropTypes.string,
    about: PropTypes.string,
    vehicles: PropTypes.number,
    services: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

PersonalProfile.defaultProps = {
  onChangePassword: () => {},
};

export default PersonalProfile;