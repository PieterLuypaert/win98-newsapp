import React from "react";
import { NewsNavigation } from "../NewsNavigation/NewsNavigation";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import "./CategoryContent.css";
import LoadingDialog from "../LoadingDialog/LoadingDialog";
import { Link } from "react-router"; 

export const CategoryContent = ({
  isLoading = false,
  categories = [],
  activeCategory = null,
  onCategoryClick = () => {},
  headlines = [],
  regularNews = [],
  searchTerm = "",
  onSearch = () => {},
  onArticleClick = () => {},
}) => {
  if (isLoading) {
    return (
      <div className="category-content-wrapper">
        <NewsNavigation
          activeCategory={activeCategory}
          onCategoryClick={(slug) => onCategoryClick(slug)}
          onSearch={onSearch}
          categories={categories}
        />
        <div style={{ padding: 16 }}>
          <LoadingDialog message="Loading articles..." onCancel={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <div className="category-content-wrapper">
      <NewsNavigation
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
        onSearch={onSearch}
        categories={categories}
      />

      {searchTerm && headlines.length + regularNews.length === 0 ? (
        <div className="category-empty">
          No articles found for "{searchTerm}" in this category.
        </div>
      ) : (
        <>
          {headlines.length > 0 && (
            <section className="category-section">
              <h2 className="category-section-title">
                {searchTerm
                  ? `Search Results (${headlines.length})`
                  : "Featured"}
              </h2>
              {headlines.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="category-article-link"
                >
                  <ArticleCard
                    article={article}
                    isHeadline={true}
                    onCategoryClick={(slug) => onCategoryClick(slug)}
                  />
                </Link>
              ))}
            </section>
          )}

          {regularNews.length > 0 && (
            <section className="category-section">
              <h2 className="category-section-title">
                {searchTerm ? "Other Results" : "All Articles"}
              </h2>
              {regularNews.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="category-article-link"
                >
                  <ArticleCard
                    article={article}
                    onCategoryClick={(slug) => onCategoryClick(slug)}
                  />
                </Link>
              ))}
            </section>
          )}

          {!searchTerm && headlines.length + regularNews.length === 0 && (
            <div className="category-empty">
              No articles found in this category.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryContent;
