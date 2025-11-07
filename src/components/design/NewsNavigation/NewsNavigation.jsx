import React from "react";
import "./NewsNavigation.css";
import { SearchBar } from "../Searchbar/Searchbar";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@core/modules/categories/category.api";

export const NewsNavigation = ({
  activeCategory,
  onCategoryClick,
  onSearch,
  categories: propCategories,
}) => {
  const { data: fetchedCategories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: !propCategories, // only fetch if no prop provided
  });

  const categories =
    Array.isArray(propCategories) && propCategories.length
      ? propCategories
      : fetchedCategories;

  return (
    <nav className="news-navigation">
      <div className="news-navigation-categories">
        <button
          className={`news-nav-item ${!activeCategory ? "active" : ""}`}
          onClick={() => onCategoryClick(null)}
        >
          All News
        </button>

        {isLoading && !propCategories ? (
          <div className="news-nav-loading" style={{ paddingLeft: 8 }}>
            Loading...
          </div>
        ) : (
          categories.map((category) => (
            <button
              key={category.slug}
              className={`news-nav-item ${
                activeCategory === category.slug ? "active" : ""
              }`}
              onClick={() => onCategoryClick(category.slug)}
            >
              {category.title}
            </button>
          ))
        )}
      </div>
      {onSearch && <SearchBar onSearch={onSearch} />}
    </nav>
  );
};
