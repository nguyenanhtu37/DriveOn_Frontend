import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBrands } from "../../hooks/useBrands";

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
      navigate("/admin/brands");
    } catch {
      setFormError("Failed to add brand");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Logo URL"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding Brand..." : "Add Brand"}
        </button>
        {formError && <div>{formError}</div>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default AddBrandPage;
