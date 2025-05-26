// page.js
"use client";

import { useState, useEffect } from "react";
import { getPhotographers } from "../services/api";
import PhotographerCard from "../components/CategoryListing/PhotographerCard";
import FilterSidebar from "../components/CategoryListing/FilterSidebar";
import SearchBar from "../components/CategoryListing/SearchBar";

export default function CategoryListingPage() {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    priceRange: [0, 20000],
    rating: 0,
    styles: [],
    city: "",
    sortBy: "rating-desc", // Default sort by rating high to low
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchPhotographers();
  }, []);

  const fetchPhotographers = async () => {
    setLoading(true);
    try {
      const data = await getPhotographers();
      // Sort the data by rating initially
      const sortedData = [...data].sort((a, b) => b.rating - a.rating);
      setPhotographers(data);
      setFilteredPhotographers(sortedData);
    } catch (error) {
      console.error("Error fetching photographers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, photographers]);

  const applyFilters = () => {
    let results = [...photographers];

    // Apply search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
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
        item.price >= filters.priceRange[0] &&
        item.price <= filters.priceRange[1]
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
    switch (filters.sortBy) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "rating-desc":
        results.sort((a, b) => {
          const ratingA = parseFloat(a.rating);
          const ratingB = parseFloat(b.rating);
          return ratingB - ratingA; // Sort by rating high to low
        });
        break;
      case "recent":
        results.sort((a, b) => b.id - a.id);
        break;
      default:
        // Default to rating high to low
        results.sort((a, b) => {
          const ratingA = parseFloat(a.rating);
          const ratingB = parseFloat(b.rating);
          return ratingB - ratingA;
        });
        break;
    }

    setFilteredPhotographers(results);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const displayedPhotographers = filteredPhotographers.slice(
    0,
    page * itemsPerPage
  );
  const cities = [...new Set(photographers.map((p) => p.location))];
  const allStyles = [...new Set(photographers.flatMap((p) => p.styles))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Maternity Photographers in Bengaluru
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          cities={cities}
          styles={allStyles}
        />

        <div className="flex-1">
          <SearchBar
            value={filters.search}
            onChange={(search) => setFilters({ ...filters, search })}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 h-72 rounded-lg"
                  ></div>
                ))
            ) : displayedPhotographers.length > 0 ? (
              displayedPhotographers.map((photographer) => (
                <PhotographerCard
                  key={photographer.id}
                  photographer={photographer}
                />
              ))
            ) : (
              <p className="col-span-full text-center py-10">
                No photographers found matching your criteria.
              </p>
            )}
          </div>

          {displayedPhotographers.length < filteredPhotographers.length && (
            <button
              onClick={loadMore}
              className="mt-8 w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
