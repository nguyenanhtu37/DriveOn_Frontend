// src/app/hooks/useBrands.js
import { useState, useEffect, useCallback } from "react";
import { addBrand } from "@/app/services/brand";

export const useBrands = () => {
  const [brands, setBrands] = useState([]); // Mảng rỗng vì không có getBrands
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBrands = useCallback(async () => {
    // Không gọi API vì không có getBrands
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const addNewBrand = async (brandData) => {
    try {
      const newBrand = await addBrand(brandData);
      setBrands((prev) => [...prev, newBrand]);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    brands,
    loading,
    error,
    fetchBrands,
    addNewBrand,
  };
};