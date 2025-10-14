import React from "react";
import categoriesData from "../../../data/categories.json";
import "./NewsNavigation.css";

export const NewsNavigation = ({ activeCategory, onCategoryClick }) => {
  return (
    <nav className="news-navigation">
      <button
        className={`news-nav-item ${!activeCategory ? "active" : ""}`}
        onClick={() => onCategoryClick(null)}
      >
        Home
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
    </nav>
  );
};
