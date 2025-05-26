import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  const [searchTerm, setSearchTerm] = useState(value);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onChange]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name, location, or tag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}
