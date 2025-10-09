import React, { useState, useEffect } from "react";
import { Window } from "../window/window";
import { Category } from "../Category/Category";
import categoriesData from "../../../data/categories.json";
import "./news.css";

export const news = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  return (
    <Window
      title="The latest news"
      trigger={
        <div className="program">
          <img
            className="icon"
            alt="news icon"
            src="/assets/apps/newspaper.png"
          />
          <span className="name">News</span>
        </div>
      }
    >
      <div className="news-content">
        <input
          type="text"
          className="news-search"
          placeholder="Search articles..."
        />
        <div className="categories-navigation">
          {categories.map((category) => (
            <Category
              key={category.id}
              title={category.title}
              slug={category.slug}
            />
          ))}
        </div>
      </div>
    </Window>
  );
};
