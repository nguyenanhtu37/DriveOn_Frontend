import PropTypes from "prop-types";
import { useState } from "react";
import { Lock } from "lucide-react";

const ChangePassword = ({ onChangePassword, onCancel, loading }) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError(null);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      await onChangePassword(passwordData.oldPassword, passwordData.newPassword);
      setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      setPasswordSuccess("Password changed successfully!");
      setTimeout(() => {
        onCancel();
      }, 2000);
    } catch (err) {
      setPasswordError(err.message || "Failed to change password");
    }
  };

  return (
    <div className="space-y-4 p-6 border border-gray rounded-lg bg-gray-50">
      <div className="flex items-center space-x-2 mb-2">
        <Lock className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold text-heading">Change Password</h3>
      </div>

      {passwordError && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {passwordError}
        </div>
      )}

      {passwordSuccess && (
        <div className="p-3 rounded-md bg-green-100 text-green-700 text-sm">
          {passwordSuccess}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="text-sm text-body font-medium">Current Password</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            placeholder="Enter your current password"
            className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all"
          />
        </div>

        <div>
          <label className="text-sm text-body font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter your new password"
            className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all"
          />
        </div>

        <div>
          <label className="text-sm text-body font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm your new password"
            className="w-full mt-1 px-4 py-2 border border-gray rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all"
          />
        </div>
      </div>

      <div className="flex space-x-4 pt-2">
        <button
          type="button"
          onClick={handlePasswordSubmit}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
        >
          {loading ? "Saving..." : "Save Password"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  onChangePassword: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ChangePassword;