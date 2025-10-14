import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ onSearch, placeholder = "Search news..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
      />
      {searchTerm && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={handleClear}
          title="Clear search"
        >
          ×
        </button>
      )}
      <button type="submit" className="search-bar-button">
        Search
      </button>
    </form>
  );
};
