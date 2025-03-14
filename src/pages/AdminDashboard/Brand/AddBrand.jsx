import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBrands } from "@/common/hooks/useBrand";

const AddBrandPage = () => {
  const navigate = useNavigate();
  const { loading, error, addNewBrand } = useBrands();
  const [brandName, setBrandName] = useState("");
  const [logo, setLogo] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName || !logo) {
      setFormError("Brand name and logo are required.");
      return;
    }
    try {
      await addNewBrand({ brandName, logo });
      navigate("/adminDashboard/addCarBrand");
    } catch {
      setFormError("Failed to add brand");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add New Car Brand
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="brandName"
              className="block text-sm font-medium text-gray-700"
            >
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              placeholder="Enter brand name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Logo URL
            </label>
            <input
              type="url"
              id="logo"
              placeholder="Enter logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium transition-colors ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            } flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Adding Brand...
              </>
            ) : (
              "Add Brand"
            )}
          </button>

          {(formError || error) && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">
              {formError || error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBrandPage;