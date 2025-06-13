"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const rawCategories = ["All", "men", "women", "kids", "shoes", "accessories"];

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const normalizedQuery = trimmedQuery.toLowerCase().replace(/s$/, ""); // singularize last 's'
      const categoryParam =
        selectedCategory !== "All"
          ? `&category=${encodeURIComponent(selectedCategory)}`
          : "";
      router.push(`/search?q=${encodeURIComponent(normalizedQuery)}${categoryParam}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full md:w-[500px] bg-gray-100 rounded-full overflow-hidden border border-gray-300"
    >
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="text-sm px-3 py-2 bg-white border-r border-gray-300 focus:outline-none"
      >
        {rawCategories.map((cat) => {
          const capitalized = capitalize(cat);
          return (
            <option key={capitalized} value={capitalized}>
              {capitalized}
            </option>
          );
        })}
      </select>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="What are your looking for?"
        className="flex-grow px-4 py-2 bg-gray-100 focus:outline-none text-sm"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900 transition"
      >
        Search
      </button>
    </form>
  );
}
