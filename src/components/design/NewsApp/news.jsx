import React, { useState, useEffect } from "react";
import { Window } from "../window/window";
import { Category } from "../Category/Category";
import categoriesData from "../../../data/categories.json";
import Searchbar from "../Searchbar/Searchbar";
import "./news.css";

export const news = ({ isOpen = false }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  return (
    <Window
      title="The latest news"
      isOpen={isOpen}
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
      <Searchbar />
      <div className="categories-navigation">
        {categories.map((category) => (
          <Category
            key={category.id}
            title={category.title}
            slug={category.slug}
          />
        ))}
      </div>
    </Window>
  );
};
