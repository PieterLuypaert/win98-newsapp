import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { NewsNavigation } from "../NewsNavigation/NewsNavigation";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import newsData from "../../../data/news.json";
import categoriesData from "../../../data/categories.json";
import "./CategoryContent.css";

export const CategoryContent = ({ categorySlug }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(categorySlug);

  useEffect(() => setActiveCategory(categorySlug), [categorySlug]);

  const category = categoriesData.find((cat) => cat.slug === activeCategory);
  const articles = newsData.filter(
    (article) =>
      !activeCategory ||
      article.categories.some((cat) => cat.slug === activeCategory)
  );

  if (activeCategory && !category) {
    return <div className="category-error">Category not found</div>;
  }

  const handleArticleClick = (slug) => {
    navigate(`/article/${slug}`);
  };

  const handleCategoryClick = (slug) => {
    navigate(slug ? `/category/${slug}` : "/news");
  };

  const renderSection = (title, filtered, isHeadline = false) =>
    !!filtered.length && (
      <section className="category-section">
        <h2 className="category-section-title">{title}</h2>
        {filtered.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            isHeadline={isHeadline}
            onClick={() => handleArticleClick(article.slug)}
            onCategoryClick={handleCategoryClick}
          />
        ))}
      </section>
    );

  const headlines = articles.filter((a) => a.isHeadline);
  const regularNews = articles.filter((a) => !a.isHeadline);

  return (
    <div className="category-content-wrapper">
      <NewsNavigation
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      {renderSection("Featured", headlines, true)}
      {renderSection("All Articles", regularNews)}
      {!articles.length && (
        <div className="category-empty">
          No articles found in this category.
        </div>
      )}
    </div>
  );
};
