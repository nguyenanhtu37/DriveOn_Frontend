import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import useUpload from "@/app/services/Cloudinary/upload";

const PersonalProfile = ({
  profile,
  isEditing,
  onInputChange,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar );
  const [about, setAbout] = useState(profile.about || "");

  const { files, progressList, handleFileChange, handleUpload, handleRemove } = useUpload();

  useEffect(() => {
    setAvatarPreview(profile.avatar);
    setAbout(profile.about || "");
  }, [profile.avatar, profile.about]);

  const handleAvatarChange = (e) => {
    handleFileChange(e);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
    onInputChange({ target: { name: "about", value: e.target.value } });
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
  

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Avatar */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <img
            src={avatarPreview || "/placeholder.svg"}
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            onError={(e) => {
              e.target.src = "";
            }}
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
                <Camera className="h-5 w-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Upload Progress */}
      {files.length > 0 && (
        <div>
          <h3 className="text-center text-primary">Uploading...</h3>
          {files.map((file) => (
            <div key={file.name} className="flex justify-between items-center">
              <span>{file.name}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${progressList[file.name] || 0}%` }}
                ></div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(file)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Form inputs */}
      <div className="text-center">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={onInputChange}
            className="text-3xl font-bold text-heading w-full text-center border border-gray px-4 py-2
                       rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            required
          />
        ) : (
          <h2 className="text-3xl font-bold text-heading">{profile.name}</h2>
        )}
        <p className="text-body text-lg mt-1">@{profile.username}</p>
      </div>

      {/* Form information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="text-body font-medium">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email || ""}
                onChange={onInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
              />
            ) : (
              <p className="text-heading mt-1">{profile.email || "Not set"}</p>
            )}
          </div>
          <div>
            <label className="text-body font-medium">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profile.phone || ""}
                onChange={onInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
              />
            ) : (
              <p className="text-heading mt-1">{profile.phone || "Not set"}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-body font-medium">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address || ""}
                onChange={onInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
              />
            ) : (
              <p className="text-heading mt-1">{profile.address || "Not set"}</p>
            )}
          </div>
          <div>
            <label className="text-body font-medium">Member Since</label>
            <p className="text-heading mt-1">{profile.memberSince}</p>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div>
        <h3 className="text-xl font-semibold text-heading mb-3">About Me</h3>
        {isEditing ? (
          <textarea
            name="about"
            value={about}
            onChange={handleAboutChange}
            className="w-full px-4 py-2 border border-gray rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                       resize-none h-28 transition-all"
          />
        ) : (
          <p className="text-body">{about || "No information provided"}</p>
        )}
      </div>

      {/* Save / Cancel buttons when editing */}
      {isEditing && (
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 shadow-md"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default PersonalProfile;
