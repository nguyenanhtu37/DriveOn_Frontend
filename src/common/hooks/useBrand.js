// src/common/hooks/useBrand.js
import { useState, useEffect, useCallback } from "react";
import { getBrands } from "@/app/services/brand";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBrands();
      console.log("Fetched brands:", data); // Debug log
      setBrands(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch brands error:", err);
      setError(err.message);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return { brands, loading, error, fetchBrands };
};

export default useBrands;