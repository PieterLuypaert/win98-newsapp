import React from "react";
import { SearchBar } from "../Searchbar/Searchbar";
import categoriesData from "../../../data/categories.json";
import "./NewsNavigation.css";

export const NewsNavigation = ({
  activeCategory,
  onCategoryClick,
  onSearch,
}) => {
  return (
    <nav className="news-navigation">
      <div className="news-navigation-categories">
        <button
          className={`news-nav-item ${!activeCategory ? "active" : ""}`}
          onClick={() => onCategoryClick(null)}
        >
          All News
        </button>
        {categoriesData.map((category) => (
          <button
            key={category.slug}
            className={`news-nav-item ${
              activeCategory === category.slug ? "active" : ""
            }`}
            onClick={() => onCategoryClick(category.slug)}
          >
            {category.title}
          </button>
        ))}
      </div>
      {onSearch && <SearchBar onSearch={onSearch} />}
    </nav>
  );
};
