"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getPhotographers } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    priceRange: [0, 20000],
    rating: 0,
    styles: [],
    city: "",
    sortBy: "rating",
  });

  const debouncedSearch = useDebounce(filters.search, 300);
  const debouncedPriceRange = useDebounce(filters.priceRange, 300);

  // Fetch photographers on initial load
  useEffect(() => {
    const fetchPhotographers = async () => {
      setLoading(true);
      try {
        const data = await getPhotographers();
        setPhotographers(data);
        setFilteredPhotographers(data);
      } catch (error) {
        console.error("Error fetching photographers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [
    debouncedSearch,
    debouncedPriceRange,
    filters.rating,
    filters.styles,
    filters.city,
    filters.sortBy,
    photographers,
  ]);

  const applyFilters = () => {
    let results = [...photographers];

    // Apply search
    if (debouncedSearch) {
      const searchTerm = debouncedSearch.toLowerCase();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.location.toLowerCase().includes(searchTerm) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply price range
    results = results.filter(
      (item) =>
        item.price >= debouncedPriceRange[0] &&
        item.price <= debouncedPriceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      results = results.filter((item) => item.rating >= filters.rating);
    }

    // Apply styles filter
    if (filters.styles.length > 0) {
      results = results.filter((item) =>
        item.styles.some((style) => filters.styles.includes(style))
      );
    }

    // Apply city filter
    if (filters.city) {
      results = results.filter((item) => item.location === filters.city);
    }

    // Apply sorting
    if (filters.sortBy === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "rating-desc") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "recent") {
      results.sort((a, b) => b.id - a.id);
    }

    setFilteredPhotographers(results);
  };

  // Get all unique cities from photographers
  const cities = [...new Set(photographers.map((p) => p.location))];

  // Get all unique styles from photographers
  const styles = [...new Set(photographers.flatMap((p) => p.styles))];

  // Update a specific filter
  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Reset all filters to default values
  const resetFilters = () => {
    setFilters({
      search: "",
      priceRange: [0, 20000],
      rating: 0,
      styles: [],
      city: "",
      sortBy: "rating",
    });
  };

  const value = {
    photographers,
    filteredPhotographers,
    loading,
    filters,
    updateFilter,
    resetFilters,
    cities,
    styles,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
