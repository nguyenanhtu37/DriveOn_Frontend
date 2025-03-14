"use client"

import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { Camera } from "lucide-react"
import ChangePassword from "./ChangePassword"

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
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || "")
  const [about, setAbout] = useState(profile.about || "")
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  useEffect(() => {
    setAvatarPreview(profile.avatar || "https://via.placeholder.com/120?text=Upload+Photo")
    setAbout(profile.about || "")
  }, [profile.avatar, profile.about])

  useEffect(() => {
    if (!isEditing) {
      setAvatarPreview(profile.avatar || "https://via.placeholder.com/120?text=Upload+Photo")
      setAbout(profile.about || "")
      setShowPasswordForm(false)
    }
  }, [isEditing, profile.avatar, profile.about])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
        onInputChange({ target: { name: "avatar", value: file } })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAboutChange = (e) => {
    setAbout(e.target.value)
    onInputChange({ target: { name: "about", value: e.target.value } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  const handlePasswordFormToggle = () => {
    setShowPasswordForm(!showPasswordForm)
  }

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
              e.target.src = "https://via.placeholder.com/120?text=Upload+Photo"
            }}
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition-colors">
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

      {/* Name and Username */}
      <div className="text-center">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={onInputChange}
            className="text-3xl font-bold text-heading w-full text-center border border-gray px-4 py-2
                       rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        ) : (
          <h2 className="text-3xl font-bold text-heading">{profile.name}</h2>
        )}
        <p className="text-body text-lg mt-1">@{profile.username}</p>
      </div>

      {/* Form information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-body font-medium">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email || ""}
                onChange={onInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            ) : (
              <p className="text-heading mt-1">{profile.email || "Not set"}</p>
            )}
          </div>
          {/* Phone */}
          <div>
            <label className="text-body font-medium">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profile.phone || ""}
                onChange={onInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            ) : (
              <p className="text-heading mt-1">{profile.phone || "Not set"}</p>
            )}
          </div>
          {/* Change Password Button */}
          {!isEditing && (
            <button
              type="button"
              onClick={handlePasswordFormToggle}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 
                       transition-all duration-200 shadow-md"
            >
              Change Password
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Address */}
          <div>
            <label className="text-body font-medium">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address || ""}
                onChange={onInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            ) : (
              <p className="text-heading mt-1">{profile.address || "Not set"}</p>
            )}
          </div>
          {/* Member Since */}
          <div>
            <label className="text-body font-medium">Member Since</label>
            <p className="text-heading mt-1">{profile.memberSince}</p>
          </div>
          {/* Edit Profile Button */}
          {!isEditing && (
            <button
              type="button"
              onClick={onEdit}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg 
                         hover:bg-primary/90 transition-all duration-200 shadow-md"
            >
              Edit Profile
            </button>
          )}
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
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                       resize-none h-28 transition-all"
          />
        ) : (
          <p className="text-body">{about || "No information provided"}</p>
        )}
      </div>

      {/* Vehicle Statistics */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-primary">{profile.vehicles}</p>
          <p className="text-sm text-body">Vehicles</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-primary">{profile.services}</p>
          <p className="text-sm text-body">Services</p>
        </div>
      </div>

      {/* Password Change Form */}
      {showPasswordForm && (
        <ChangePassword onChangePassword={onChangePassword} onCancel={handlePasswordFormToggle} loading={loading} />
      )}

      {/* Save / Cancel buttons when editing */}
      {isEditing && (
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90
                       transition-all duration-200 disabled:opacity-50 shadow-md"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg 
                       hover:bg-gray-600 transition-all duration-200 shadow-md"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  )
}

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
  onChangePassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default PersonalProfile

