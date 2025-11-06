import React, { useEffect, useRef } from "react";
import { NewsNavigation } from "../NewsNavigation/NewsNavigation";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import playSound from "@/core/utils/playSound";
import "./CategoryContent.css";
import LoadingDialog from "../LoadingDialog/LoadingDialog";

export const CategoryContent = ({
  isLoading = false,
  categories = [],
  activeCategory = null,
  onCategoryClick = () => {},
  articles = [],
  searchTerm = "",
  onSearch = () => {},
  onArticleClick = () => {},
}) => {
  const prevSearchTerm = useRef(searchTerm);

  const renderSection = (title, filtered, isHeadline = false) =>
    !!filtered.length && (
      <section className="category-section">
        <h2 className="category-section-title">{title}</h2>
        {filtered.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            isHeadline={isHeadline}
            onClick={() => onArticleClick(article.slug)}
            onCategoryClick={(slug) => onCategoryClick(slug)}
          />
        ))}
      </section>
    );

  const filteredByCategory = articles.filter(
    (article) =>
      !activeCategory ||
      article.categories.some((cat) => cat.slug === activeCategory)
  );

  const lowerTerm = searchTerm ? searchTerm.toLowerCase() : "";
  const searchArticles = (items) => {
    if (!lowerTerm) return items;
    return items.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(lowerTerm);
      const introMatch = article.intro.toLowerCase().includes(lowerTerm);
      const tagsMatch = article.tags.some((tag) =>
        tag.title.toLowerCase().includes(lowerTerm)
      );
      return titleMatch || introMatch || tagsMatch;
    });
  };

  const articlesFiltered = searchArticles(filteredByCategory);

  useEffect(() => {
    if (
      searchTerm &&
      prevSearchTerm.current !== searchTerm &&
      articlesFiltered.length === 0
    ) {
      playSound("/assets/sounds/error.wav");
    }
    prevSearchTerm.current = searchTerm;
  }, [searchTerm, articlesFiltered.length]);

  if (isLoading) {
    return (
      <div className="category-content-wrapper">
        <NewsNavigation
          activeCategory={activeCategory}
          onCategoryClick={(slug) => onCategoryClick(slug)}
        />
        <div style={{ padding: 16 }}>
          <LoadingDialog message="Loading articles..." onCancel={() => {}} />
        </div>
      </div>
    );
  }

  const headlines = articlesFiltered.filter((a) => a.isHeadline);
  const regularNews = articlesFiltered.filter((a) => !a.isHeadline);

  const category = categories.find((c) => c.slug === activeCategory);

  if (activeCategory && !category) {
    return <div className="category-error">Category not found</div>;
  }

  return (
    <div className="category-content-wrapper">
      <NewsNavigation
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
        onSearch={onSearch}
        categories={categories}
      />
      {searchTerm && !articlesFiltered.length ? (
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
      {!searchTerm && !articlesFiltered.length && (
        <div className="category-empty">
          No articles found in this category.
        </div>
      )}
    </div>
  );
};

export default CategoryContent;
