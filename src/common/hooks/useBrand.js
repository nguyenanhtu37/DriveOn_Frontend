// src/app/hooks/useBrands.js
import { useState, useEffect, useCallback } from "react";
import { addBrand, getBrands } from "@/app/services/brand";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const brandList = await getBrands();
      setBrands(brandList.data || []); // Assuming getBrands returns { message, data }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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