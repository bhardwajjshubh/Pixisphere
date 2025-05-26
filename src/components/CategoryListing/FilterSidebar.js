// FilterSidebar.js
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function FilterSidebar({ filters, setFilters, cities, styles }) {
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ ...filters, priceRange });
    }, 300);

    return () => clearTimeout(timer);
  }, [priceRange]);

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, rating });
  };

  const handleStyleChange = (style) => {
    const updatedStyles = filters.styles.includes(style)
      ? filters.styles.filter((s) => s !== style)
      : [...filters.styles, style];

    setFilters({ ...filters, styles: updatedStyles });
  };

  const handleCityChange = (e) => {
    setFilters({ ...filters, city: e.target.value });
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  return (
    <div className="w-full md:w-72 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          range
          min={0}
          max={20000}
          value={priceRange}
          onChange={handlePriceChange}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="mr-2"
              />
              {rating === 0 ? "All Ratings" : `${rating}+ Stars`}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Styles</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {styles.map((style) => (
            <label key={style} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.styles.includes(style)}
                onChange={() => handleStyleChange(style)}
                className="mr-2"
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">City</h3>
        <select
          value={filters.city}
          onChange={handleCityChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="rating-desc">Rating: High to Low</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>

      <button
        onClick={() =>
          setFilters({
            search: "",
            priceRange: [0, 20000],
            rating: 0,
            styles: [],
            city: "",
            sortBy: "rating-desc", // Changed to match the dropdown value
          })
        }
        className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
      >
        Reset Filters
      </button>
    </div>
  );
}
