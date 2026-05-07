import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(data ? data : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchInput.trim()) return;

    navigate(`/course-list?search=${searchInput}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden"
    >
      {/* Input */}
      <div className="flex items-center flex-1 px-4">
        <Search className="w-5 h-5 text-gray-400" />

        <input
          type="text"
          placeholder="Search for courses..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-3 py-4 text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 text-white font-medium px-6 md:px-8 py-4"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;