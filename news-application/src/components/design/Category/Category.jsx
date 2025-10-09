import React from "react";
import "./Category.css";

export const Category = ({
  title,
  slug,
  articles = [],
  isNavigationMode = true,
}) => {
  const handleCategoryClick = () => {
    if (isNavigationMode && slug) {
    }
  };

  return (
    <div
      className={`news-category ${isNavigationMode ? "navigation-mode" : ""}`}
      onClick={handleCategoryClick}
    >
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
        <div className="category-divider"></div>
      </div>
    </div>
  );
};
