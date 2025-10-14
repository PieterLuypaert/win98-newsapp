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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => setActiveCategory(categorySlug), [categorySlug]);

  const category = categoriesData.find((cat) => cat.slug === activeCategory);

  const searchArticles = (articles, term) => {
    if (!term) return articles;

    const lowerTerm = term.toLowerCase();
    return articles.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(lowerTerm);
      const introMatch = article.intro.toLowerCase().includes(lowerTerm);
      const tagsMatch = article.tags.some((tag) =>
        tag.title.toLowerCase().includes(lowerTerm)
      );

      return titleMatch || introMatch || tagsMatch;
    });
  };

  const filteredByCategory = newsData.filter(
    (article) =>
      !activeCategory ||
      article.categories.some((cat) => cat.slug === activeCategory)
  );

  const articles = searchArticles(filteredByCategory, searchTerm);

  if (activeCategory && !category) {
    return <div className="category-error">Category not found</div>;
  }

  const handleArticleClick = (slug) => {
    navigate(`/article/${slug}`);
  };

  const handleCategoryClick = (slug) => {
    navigate(slug ? `/category/${slug}` : "/news");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
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
        onSearch={handleSearch}
      />
      {searchTerm && !articles.length ? (
        <div className="category-empty">
          No articles found for "{searchTerm}" in this category.
        </div>
      ) : (
        <>
          {renderSection(
            searchTerm ? `Search Results (${headlines.length})` : "Featured",
            headlines,
            true
          )}
          {renderSection(
            searchTerm ? "Other Results" : "All Articles",
            regularNews
          )}
        </>
      )}
      {!searchTerm && !articles.length && (
        <div className="category-empty">
          No articles found in this category.
        </div>
      )}
    </div>
  );
};
