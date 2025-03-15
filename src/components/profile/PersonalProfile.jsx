import { useState, useEffect } from "react";
import { Camera, Mail, Phone, Clock, CheckCircle, User } from 'lucide-react';
import useUpload from "@/app/services/Cloudinary/upload";

const PersonalProfile = ({
  profile,
  isEditing,
  onInputChange,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const { files, progressList, handleFileChange, handleUpload, handleRemove } = useUpload();

  useEffect(() => {
    setAvatarPreview(profile.avatar);
  }, [profile.avatar]);

  const handleAvatarChange = (e) => {
    handleFileChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only proceed if there are files to upload
      if (files && files.length > 0) {
        const uploadedUrls = await handleUpload();
        if (uploadedUrls && uploadedUrls.length > 0) {
          // If upload is successful, update the avatar field
          onInputChange({ target: { name: "avatar", value: uploadedUrls[0] } });
        }
      }

      // Proceed with other form data and submit it
      onSubmit();
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
console.log(profile)
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="md:grid md:grid-cols-3 md:gap-8">
        {/* Profile Image Section */}
        <div className="md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="h-36 w-36 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <img
                  src={avatarPreview}
                  alt="Profile Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                  <Camera className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              )}
            </div>
            
            <div className="mt-6 text-center">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name || ""}
                  onChange={onInputChange}
                  className="text-center text-xl font-semibold w-full border-0 border-b-2 border-blue-300 focus:border-blue-500 focus:ring-0 px-2 py-1 bg-transparent"
                  placeholder="Your Name"
                  required
                />
              ) : (
                <h3 className="text-xl font-semibold text-gray-900">
                  {profile.name || "Your Name"}
                </h3>
              )}
              
              {/* Status Badge */}
              <div className="mt-3 flex justify-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  profile.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  <CheckCircle className="mr-1.5 h-4 w-4" />
                  {profile.status || "Status"}
                </span>
              </div>
              
              {/* Created At */}
              <div className="mt-3 flex justify-center items-center text-sm text-gray-500">
                <Clock className="mr-1.5 h-4 w-4" />
                Member since: {formatDate(profile.createdAt)}
              </div>
            </div>

            {/* Upload Progress */}
            {files.length > 0 && (
              <div className="mt-6 w-full bg-blue-50 p-4 rounded-xl shadow-inner">
                <h4 className="text-sm font-medium text-blue-700 mb-3">Uploading...</h4>
                {files.map((file) => (
                  <div key={file.name} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs truncate max-w-[180px] text-gray-600">{file.name}</span>
                      <span className="text-xs font-medium text-blue-600">{progressList[file.name] || 0}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressList[file.name] || 0}%` }}
                        ></div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(file)}
                        className="text-red-500 hover:text-red-600 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="mt-8 md:mt-0 md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Personal Information
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center group-hover:text-blue-600 transition-colors">
                      <Mail className="h-4 w-4 mr-1.5 text-blue-500" />
                      Email
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={profile.email || ""}
                          onChange={onInputChange}
                          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    ) : (
                      <p className="mt-1 text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                        {profile.email || "Not set"}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center group-hover:text-blue-600 transition-colors">
                      <Phone className="h-4 w-4 mr-1.5 text-blue-500" />
                      Phone
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={profile.phone || ""}
                          onChange={onInputChange}
                          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    ) : (
                      <p className="mt-1 text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                        {profile.phone || "Not set"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Save / Cancel buttons when editing */}
            {isEditing && (
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalProfile;
